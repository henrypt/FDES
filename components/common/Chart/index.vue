<template>
  <div id="chartParent">
    <div id="main" ref="main" :style="`height: ${height}px;`" />
  </div>
</template>

<script>
import echarts from 'echarts'

const CHART_TYPE = 'line'
let CHART_VALUE = 'measured_value'
let CHART_ERROR = false // 屏蔽异常数据是否打开

const COLORS = ['#5793f3', '#d14a61', '#675bba']
const OPTION = {
  datetime: '',
  line: {
    // 调色盘颜色列表。如果系列没有设置颜色，则会依次循环从该列表中取颜色作为系列颜色, 以下是其默认值
    color: [
      '#c23531',
      '#2f4554',
      '#61a0a8',
      '#d48265',
      '#91c7ae',
      '#749f83',
      '#ca8622',
      '#bda29a',
      '#6e7074',
      '#546570',
      '#c4ccd3'
    ],
    // 图标题
    title: {
      show: true,
      id: 'chart_title',
      text: '',
      subtext: '',
      textStyle: {
        color: '#6a7985',
        fontSize: 18,
        height: 18,
        lineHeight: 18
      },
      subtextStyle: {
        fontSize: 20,
        color: '#6a7985'
      },
      textAlign: 'left',
      textVerticalAlign: 'top',
      padding: 0,
      left: '100px',
      top: '0%',
      bottom: 0
    },
    // 鼠标提示信息
    tooltip: {
      id: 'chart_tooltip',
      trigger: 'axis', // trigger: 'item' 数据项图形触发. 'axis' 坐标轴触发
      formatter (params, ticket, cb) {
        const v = params.map((p) => {
          return (
            '[' +
            p.seriesName +
            '-' +
            p.data.name +
            '] ' +
            p.data.value +
            '<br/>'
          )
        })
        return v
        // formatter(params: Object|Array, ticket: string, callback: (ticket: string, html: string)) => string
      },
      axisPointer: {
        type: 'cross'
      },
      backgroundColor: 'rgba(155,155,155,0.6)'
    },
    // 图例
    legend: {
      id: 'chart_legend',
      data: [],
      type: 'scroll',
      show: true,
      orient: 'horizontal', // vertical
      align: 'auto',
      bottom: 0,
      backgroundColor: 'rgba(0,42,91,0.01)',
      selectedMode: 'single', // 'single' 或者 'multiple' 使用单选或者多选模式
      inactiveColor: '#666',
      icon: 'pin',
      padding: [5, 30],
      selected: {},
      tooltip: {
        show: false
      },
      formatter (name) {
        return name
      },
      selector: [
        // {
        //   type: 'all',
        //   title: '全选'
        // }
        // {
        //   type: 'inverse',
        //   title: '反选'
        // }
      ]
    },
    // 图标工具
    toolbox: {
      itemSize: 20, // 图标大小
      itemGap: 30, // 图标间隔距离
      // left: 'center',
      right: '10%',
      top: 0,
      // orient: 'vertical',
      showTitle: true,
      iconStyle: {
        shadowColor: 'rgba(10, 0, 0, 0.3)',
        shadowBlur: 10
      },
      feature: {
        restore: { show: true }, // 配置项还原
        dataView: { show: false },
        dataZoom: { show: false },
        saveAsImage: { show: true }, // 图保存为图片文件
        myError: {
          show: true,
          title: '屏蔽异常数据',
          iconStyle: { shadowColor: '#fff' },
          icon:
            'path://M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z M607.776 306.24h0.192l-1.44 12.224c-0.096 0.608-0.096 1.216-0.224 1.792l-30.336 255.68h-2.944c1.824 5.056 2.976 10.4 2.976 16.064a48 48 0 0 1-96 0c0-5.664 1.152-11.008 2.944-16.064H480l-30.368-255.776-0.064-0.544-1.6-13.376h0.256c-0.032-0.768-0.224-1.504-0.224-2.272a80 80 0 0 1 160 0c0 0.768-0.224 1.504-0.224 2.272zM528 704a48 48 0 1 1 0 96 48 48 0 0 1 0-96z',
          onclick (e) {
            switchChartError(e)
          }
        },
        myConvert: {
          show: true,
          title: '折算',
          iconStyle: { shadowColor: '#fff' },
          // icon: 'image://http://www.bjvag.com/uploadimg/yidacms_logo/2013219178530.png',
          icon:
            // 'path://M778.24 832c-10.24-5.12-23.04-5.12-33.28 0s-17.92 17.92-17.92 30.72 7.68 23.04 17.92 30.72c10.24 5.12 23.04 5.12 33.28 0s17.92-17.92 17.92-30.72-7.68-23.04-17.92-30.72z M514.56 48.64c-158.72 0-307.2 81.92-391.68 215.04-10.24 15.36-5.12 38.4 10.24 48.64 17.92 10.24 38.4 5.12 48.64-10.24 71.68-115.2 197.12-181.76 332.8-181.76 217.6 0 394.24 176.64 394.24 394.24 0 97.28-35.84 192-102.4 263.68-12.8 15.36-12.8 38.4 2.56 51.2 7.68 5.12 15.36 10.24 23.04 10.24 10.24 0 20.48-5.12 25.6-12.8 76.8-84.48 120.32-197.12 120.32-312.32 0-256-207.36-465.92-463.36-465.92z M665.6 878.08c-48.64 20.48-99.84 30.72-151.04 30.72-212.48 0-384-168.96-391.68-378.88h140.8l46.08 99.84c5.12 10.24 15.36 17.92 28.16 17.92 12.8 0 23.04-7.68 28.16-17.92l89.6-186.88 5.12 7.68c7.68 15.36 25.6 23.04 40.96 15.36 15.36-7.68 23.04-25.6 15.36-40.96L483.84 358.4c-5.12-10.24-15.36-17.92-28.16-17.92-12.8 0-23.04 7.68-28.16 17.92l-92.16 186.88L307.2 486.4c-5.12-10.24-15.36-17.92-28.16-17.92H122.88c0-5.12 2.56-12.8 2.56-17.92 2.56-7.68 2.56-15.36 5.12-23.04 5.12-20.48-7.68-38.4-28.16-43.52-20.48-5.12-38.4 7.68-43.52 28.16-2.56 10.24-5.12 17.92-5.12 28.16-5.12 25.6-5.12 51.2-5.12 76.8 0 256 207.36 465.92 465.92 465.92 61.44 0 122.88-12.8 179.2-35.84 17.92-7.68 25.6-28.16 20.48-46.08-10.24-23.04-30.72-30.72-48.64-23.04z M529.92 486.4c-7.68-5.12-20.48-5.12-28.16 0-7.68 5.12-15.36 15.36-15.36 25.6s5.12 20.48 15.36 25.6c7.68 5.12 20.48 5.12 28.16 0 7.68-5.12 15.36-15.36 15.36-25.6s-5.12-20.48-15.36-25.6zM522.24 591.36l40.96 92.16c5.12 10.24 15.36 17.92 25.6 17.92h2.56c10.24 0 20.48-5.12 25.6-15.36l89.6-148.48h107.52c17.92 0 30.72-12.8 30.72-30.72s-12.8-30.72-30.72-30.72h-125.44c-10.24 0-20.48 5.12-25.6 15.36l-66.56 112.64-17.92-38.4c-7.68-15.36-25.6-23.04-40.96-15.36-15.36 7.68-23.04 25.6-15.36 40.96z',
            // 'path://M90.584615 578.953846l358.4-106.338461 141.784616 196.923077 330.830769-319.015385V866.461538H90.584615z M929.476923 886.153846c-11.815385 0-19.692308-7.876923-19.692308-19.692308V252.061538L689.230769 157.538462 307.2 389.907692c-7.876923 3.938462-11.815385 3.938462-19.692308 3.938462L98.461538 322.953846V866.461538c0 11.815385-7.876923 19.692308-19.692307 19.692308s-19.692308-7.876923-19.692308-19.692308V295.384615c0-7.876923 3.938462-11.815385 7.876923-15.753846 3.938462-3.938462 11.815385-3.938462 19.692308-3.938461l208.738461 74.830769L681.353846 118.153846h15.753846l240.246154 102.4c7.876923 3.938462 11.815385 11.815385 11.815385 19.692308V866.461538c0 11.815385-7.876923 19.692308-19.692308 19.692308z M929.476923 866.461538c-11.815385 0-19.692308-7.876923-19.692308-19.692307V378.092308l-315.076923 326.892307c-3.938462 3.938462-11.815385 7.876923-15.753846 7.876923-7.876923 0-11.815385-3.938462-15.753846-7.876923L433.230769 492.307692l-338.707692 82.707693v275.692307c3.938462 7.876923-3.938462 15.753846-15.753846 15.753846s-19.692308-7.876923-19.692308-19.692307v-287.507693c0-7.876923 7.876923-15.753846 15.753846-19.692307l370.215385-90.584616c7.876923-3.938462 15.753846 0 19.692308 7.876923l122.092307 204.8 330.830769-342.646153c3.938462-3.938462 15.753846-7.876923 19.692308-3.938462 7.876923 0 11.815385 7.876923 11.815385 15.753846v515.938462c0 11.815385-7.876923 19.692308-19.692308 19.692307z M957.046154 894.030769h-905.846154c-11.815385 0-19.692308-7.876923-19.692308-19.692307s7.876923-19.692308 19.692308-19.692308h905.846154c11.815385 0 19.692308 7.876923 19.692308 19.692308s-7.876923 19.692308-19.692308 19.692307z',
            'path://M470.791621 216.202867 470.791621 149.027563c-172.171996 0-316.683572 120.238148-353.375965 281.120176L19.192944 430.14774l128.141125 163.140022 128.705623-163.140022L186.284454 430.14774C221.84785 306.522602 335.876516 216.202867 470.791621 216.202867z M1027.951488 593.287762l-128.705623-163.140022-128.141125 163.140022 87.497244 0c-35.563396 123.625138-149.592062 214.509372-285.071665 214.509372L573.53032 874.972437c172.171996 0 316.683572-120.238148 353.940463-281.684675L1027.951488 593.287762z M477.001103 628.286659 204.9129 628.286659c-8.467475 0-15.241455 6.77398-15.241455 15.241455l0 272.088203c0 8.467475 6.77398 15.241455 15.241455 15.241455l272.088203 0c8.467475 0 15.241455-6.77398 15.241455-15.241455L492.242558 643.528115C492.242558 635.060639 485.468578 628.286659 477.001103 628.286659zM429.583241 859.730981c0 5.080485-3.951488 9.031974-9.031974 9.031974L260.798236 868.762955c-5.080485 0-9.031974-3.951488-9.031974-9.031974L251.766262 699.977949c0-5.080485 3.951488-9.031974 9.031974-9.031974l159.753032 0c5.080485 0 9.031974 3.951488 9.031974 9.031974L429.583241 859.730981 429.583241 859.730981z M845.054024 90.319735l-272.088203 0c-8.467475 0-15.241455 6.77398-15.241455 15.241455L557.724366 378.213892c0 8.467475 6.77398 15.241455 15.241455 15.241455l272.088203 0c8.467475 0 15.241455-6.77398 15.241455-15.241455L860.29548 106.125689C860.29548 97.658214 853.521499 90.319735 845.054024 90.319735zM797.636163 321.764057c0 5.080485-3.951488 9.031974-9.031974 9.031974l-159.753032 0c-5.080485 0-9.031974-3.951488-9.031974-9.031974L619.819184 162.011025c0-5.080485 3.951488-9.031974 9.031974-9.031974l159.753032 0c5.080485 0 9.031974 3.951488 9.031974 9.031974L797.636163 321.764057z',
          onclick (e) {
            switchChartValue(e)
          }
        }
      },
      tooltip: {
        // 和 optionLine.tooltip 的配置项相同
        show: false,
        formatter (param) {
          return '<div>' + param.title + '</div>' // 自定义的 DOM 结构
        },
        backgroundColor: 'rgba(100,100,100,0.6)',
        textStyle: {
          fontSize: 12
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
      }
    },
    // 网格属性 包括图控件的定位
    grid: {
      id: 'chart_grid',
      show: true,
      top: '65',
      right: '60',
      bottom: '40',
      left: '20',
      containLabel: true,
      backgroundColor: '#fff',
      tooltip: {
        show: true, // 控制坐标鼠标提示
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
      }
    },
    // 数据缩放 & 图放大后的拖动范围
    dataZoom: [
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: -20,
        endValue: 20
      },
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: -20,
        endValue: 20
      },
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [1],
        startValue: -20,
        endValue: 20
      }
    ],
    // x 横轴
    xAxis: [
      {
        id: 'chart_xAxis',
        name: '(x轴)',
        // scale: true,
        // min: '2014-01-04',
        // max: '2014-02-17',
        // splitNumber: 1, // 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
        minInterval: 1, // 自动计算的坐标轴最小间隔大小。例如可以设置成1保证坐标轴分割刻度显示成整数。
        maxInterval: 3600 * 24 * 1000, // 1天。 自动计算的坐标轴最大间隔大小。例如，在时间轴（（type: 'time'））可以设置成 3600 * 24 * 1000 保证坐标轴分割刻度最大为一天。
        // interval: this.$moment.timeStamp('2014-01-01'), // 强制设置坐标轴分割间隔。因为 splitNumber 是预估的值，实际根据策略计算出来的刻度可能无法达到想要的效果，这时候可以使用 interval 配合 min、max 强制设定刻度划分，一般不建议使用。无法在类目轴中使用。在时间轴（type: 'time'）中需要传时间戳，在对数轴（type: 'log'）中需要传指数值。
        type: 'category',
        nameLocation: 'end',
        nameTextStyle: {
          color: COLORS[0],
          fontSize: 14,
          padding: [0, 0, 0, 0]
        },
        nameGap: 30, // 坐标轴名称与轴线之间的距离
        nameRotate: 45, // 坐标轴名字旋转，角度值
        show: true,
        gridIndex: 0,
        position: 'bottom', // top
        axisTick: {
          alignWithLabel: true,
          show: true,
          interval: 0 // 设置成 0 强制显示所有标签 默认'auto'会采用标签不重叠的策略间隔显示标签
        },
        axisLabel: {
          interval: 0,
          rotate: 50,
          color (value, index) {
            return value.includes('|') ? '#ff9800' : '#000'
          },
          fontStyle: 'normal',
          fontSize: 10,
          formatter (value, index) {
            if (value.includes('|')) {
              return (
                value.split('|')[0] + '\n' + '[' + value.split('|')[1] + ']'
              )
            } else {
              return value // texts.join('-');
            }
          }
        },
        triggerEvent: true,
        splitLine: { show: false }, // 参考标线
        boundaryGap: false,

        data: []
      }
    ],
    // y 纵轴
    yAxis: [
      {
        type: 'value',
        name: '',
        position: 'left', // 左轴
        axisLine: {
          lineStyle: {
            color: COLORS[0]
          }
        },
        axisLabel: {
          formatter: ''
        },
        minorTick: {
          show: true
        },
        minorSplitLine: {
          show: true
        },
        // boundaryGap: [0, '100%'],
        splitLine: { show: false }
      },
      {
        type: 'value',
        name: '',
        position: 'right', // 右轴
        offset: 0,
        axisLine: {
          lineStyle: {
            color: COLORS[2]
          }
        },
        axisLabel: {
          formatter: ''
        },
        minorTick: {
          show: true
        },
        minorSplitLine: {
          show: true
        },
        boundaryGap: [0, '100%'],
        splitLine: { show: false }
      }
    ],
    series: []
  }
}

let DATA = []

const SELECT_NODES = [] // 缓存选择线上点的数据
// const MAKELINE_DATA = [
//   { symbol: 'none', x: '4%', yAxis: 'max' }, // 起点
//   {
//     symbol: 'circle',
//     label: { position: 'start', formatter: '最大值' },
//     type: 'max',
//     name: 'Top'
//   } // 终点
// ]
const CHART = {
  id: 'main',
  self: null,
  initOption: (type) => {
    const chartData = getChartData()

    const option = getChartOption(type)
    // const myIcon = {
    //   line:
    //     'path://M85.504 938.688H1024V1024H0v-85.312h0.192V0h85.312v938.688z m120.256-169.984l-70.208-48.512L372.48 377.728l303.424 155.52 265.472-345.92 67.712 51.968-308.8 402.304-300.16-153.856-194.368 280.96z',
    //   radar:
    //     'path://M791.630769 953.107692H232.369231c-7.876923 0-15.753846-3.938462-19.692308-11.815384L39.384615 405.661538c0-7.876923 0-15.753846 7.876923-23.630769l452.923077-330.830769c7.876923-3.938462 15.753846-3.938462 23.63077 0l452.923077 330.830769c7.876923 7.876923 7.876923 15.753846 7.876923 23.630769l-173.292308 531.692308c-3.938462 7.876923-11.815385 15.753846-19.692308 15.753846z m-543.507692-39.384615h531.692308L945.230769 409.6l-433.230769-315.076923-429.292308 311.138461 165.415385 508.061539z M496.246154 519.876923h-3.938462l-433.230769-94.523077c-11.815385-3.938462-15.753846-11.815385-15.753846-23.630769 3.938462-11.815385 11.815385-15.753846 23.630769-15.753846L476.553846 472.615385l27.569231-378.092308c0-11.815385 11.815385-19.692308 19.692308-19.692308 11.815385 0 19.692308 11.815385 19.692307 19.692308L512 496.246154c0 3.938462-3.938462 11.815385-7.876923 15.753846 0 3.938462-3.938462 7.876923-7.876923 7.876923z M775.876923 937.353846c-7.876923 0-11.815385-3.938462-15.753846-7.876923l-263.876923-389.907692-232.369231 374.153846c-3.938462 7.876923-19.692308 11.815385-27.569231 7.876923-7.876923-3.938462-11.815385-19.692308-7.876923-27.569231l248.123077-401.723077c3.938462-3.938462 7.876923-7.876923 15.753846-7.876923s11.815385 3.938462 15.753846 7.876923L791.630769 905.846154c7.876923 7.876923 3.938462 19.692308-3.938461 27.569231-3.938462 0-7.876923 3.938462-11.815385 3.938461z M496.246154 519.876923c-7.876923 0-15.753846-7.876923-19.692308-15.753846-3.938462-11.815385 3.938462-19.692308 15.753846-23.630769l464.738462-94.523077c11.815385-3.938462 19.692308 3.938462 23.630769 15.753846 3.938462 11.815385-3.938462 19.692308-15.753846 23.630769l-468.676923 94.523077c3.938462 0 0 0 0 0z M653.784615 756.184615h-7.876923l-240.246154-106.338461s-3.938462 0-3.938461-3.938462l-256-204.8c-3.938462-3.938462-7.876923-11.815385-7.876923-19.692307s7.876923-11.815385 11.815384-15.753847l338.707693-122.092307h15.753846l279.630769 137.846154c7.876923 3.938462 11.815385 15.753846 7.876923 23.630769L669.538462 736.492308c0 11.815385 0 15.753846-7.876924 15.753846 0 3.938462-3.938462 3.938462-7.876923 3.938461z m-228.430769-141.784615l220.553846 98.461538 106.338462-256-256-126.030769L196.923077 433.230769l228.430769 181.169231z'
    // }

    // 屏蔽异常数据 图标变色
    if (CHART_ERROR) {
      option.toolbox.feature.myError.iconStyle = { shadowColor: '#ff9800' }
    } else {
      option.toolbox.feature.myError.iconStyle = { shadowColor: '#ffffff' }
    }

    option.legend.selectedMode = 'multiple'

    // 设置图标题
    option.title.text = VUEOBJ.data().title
    if (chartData && chartData.length > 0) {
      option.title.text += '[' + chartData[0].title + ']'
    }

    // 折算 图标变色
    const isConvert = CHART_VALUE !== 'measured_value'
    if (option.toolbox.feature.myConvert) {
      option.toolbox.feature.myConvert.iconStyle = {
        shadowColor: isConvert ? '#ff9800' : '#ffffff'
      }
    }

    // option.xAxis[0].chartData = chartData[0].names//
    if (chartData && chartData.length > 0) {
      option.xAxis[0].data = chartData[0].names.map((d) => {
        if (typeof d === 'number') {
          // 处理底轴: 索引数字
          return d
        } else {
          // 处理底轴: 日期
          return d.replace(' ', '\n')
        }
      })
    }

    // 设置X轴（底轴）名称 [名称换行: 日期 \n 时间]
    // option.xAxis[0].data = chartData[0].names.map(d=>d.replace(' ', '\n')) // data[0].index
    // option.yAxis[0].name = '(单位：摄氏度)'
    // option.yAxis[1].name = '(单位：摄氏度)'
    option.yAxis[0].axisLabel.formatter = '{value}'
    option.yAxis[1].axisLabel.formatter = '{value}'

    option.series = [] // 线图的 series = [] 需要全部配置
    option.legend.selected = {} // 默认选择那条线

    const selectedObj = {}

    // chartData - Array 遍历线数据
    chartData.forEach(function (line, index) {
      if (index === 0) {
        option.yAxis[0].name = line.yAxis0Name || '(单位：摄氏度)'
        option.yAxis[1].name = line.yAxis1Name || '(单位：摄氏度)'
      }

      // 设置图例名称
      option.legend.data.push(line.legend)

      const obj = {
        name: line.name,
        data: (isConvert ? line.convert : line.value).map((v, index) => {
          // 空白点处理 当数据值为 NULL 或 ‘’ 空串 时，表示此点为空白点
          const isNullPoint = v === 'NULL' || v === ''
          let isErrorPoint = false

          // 屏蔽异常数据功能
          if (CHART_ERROR) {
            isErrorPoint = typeof v === 'string' && v.includes('error')
          } else if (typeof v === 'string' && v.includes('error')) {
            v = v.split('|')[0]
          }

          return {
            name: echarts.format.formatTime(
              'yyyy-MM-dd\nhh:mm:ss',
              line.names[index]
            ),
            // name: echarts.format.formatTime('yyyy-MM-dd hh:mm:ss', line.names[index]),
            value: isNullPoint || isErrorPoint ? '' : v,
            itemStyle: { color: isNullPoint ? '#fff' : '#000' }
          }
        }),
        markPoint: {
          silent: true,
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        },
        markLine: {
          silent: true, // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          data: [] // MAKELINE_DATA
        },
        type: 'line',
        areaStyle: { opacity: 0.3 }, // 区域填充样式-线的阴影设置
        smooth: true,
        symbol: 'emptyCircle', // 设定为实心点  ECharts 提供的标记类型包括: 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        symbolSize: 2, // 设定实心点的大小
        itemStyle: {
          normal: {
            lineStyle: {
              type: line.lineStyleType, // solid  dotted  线形状
              width: 2 // 线宽度
            }
          }
        }
      }

      // obj.markLine = {
      //   name: 'testMarkPoint',
      //   yAxis: '2020-08-26 10:55:09',
      //   label: 'MarkPoint Test'
      // }

      Object.assign(selectedObj, { [obj.name]: line.selected })

      if (line.axisType === 'y') {
        obj.yAxisIndex = 1
      }

      if (line.labelShow) {
        obj.label = {
          normal: {
            show: true,
            position: 'top'
          }
        }
      }

      // 添加 点的相关信息 至 series属性 里
      option.series.push(obj)
    })

    option.legend.selected = selectedObj // 默认选择那条线
  },
  drawPie: (id) => {
    const objMain = document.getElementById(CHART.id)
    objMain.removeAttribute('_echarts_instance_')

    const objParent = document.getElementById('chartParent')
    chartSize(objParent, objMain)

    // 选择哪种渲染器
    // 一般来说，Canvas 更适合绘制图形元素数量非常大（这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉 特效。
    // 但是，在不少场景中，SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、渲染性能略高、并且用户使用浏览器内置的缩放功能时不会模糊。
    const echart = echarts.init(objMain, null, { renderer: 'canvas' })
    const option = getChartOption(CHART_TYPE)

    CHART.self = echart

    echart.clear()
    echart.setOption(option)
    echart.showLoading({
      text: '图表数据正在努力加载...'
    })

    // 缓存选择的点的数据
    echart.on('click', 'series', function (params) {
      // if(params.componentType==='series' || params.componentType==='markLine')

      // const currentData = params.data || null
      const currentData =
        DATA.find((d) => {
          return d.name === params.seriesName
        }) || null
      if (currentData) {
        const id = currentData.id
        const name = currentData.name || null
        const value = params.data || null // currentData.value

        /*
        let current = null
        let idx = -1

        if(SELECT_NODES.length>0){
          idx = SELECT_NODES.findIndex((item)=>item.value.name===value.name)
        }

        // cancel select or remove repeat
        if(idx>-1){
          SELECT_NODES.splice(idx,1)
        }
        else{
          // seelcted or add
          if (id) {
            SELECT_NODES.push({
              id,
              name,
              value,
              index: params.dataIndex,
              seriesIndex: params.seriesIndex
            })
          }
        }
        */

        // 改为只记录最后一次选择的时间点
        if (id) {
          const obj = {
            id,
            name,
            value,
            index: params.dataIndex,
            seriesIndex: params.seriesIndex
          }

          SELECT_NODES[0] = obj

          // SELECT_NODES = null
          window.chart.selectNodes = obj
          // window.console.log('Chart/index.vue', window.chart.selectNodes)
        }
        // VUEOBJ.data().select = SELECT_NODES.map(item=>item.id)
        window.chart.selectNodes = SELECT_NODES

        AddMarkLine4SelectNodes(SELECT_NODES[0])
        // {
        //   name: 'selectNode',
        //   xAxis: '2020-08-26\n11:20:08',
        //   label: { formatter: '{c}', position:'middle'}
        // }
      }
    })

    setTimeout(() => {
      echart.hideLoading()
    }, 1500)

    // window.addEventListener('resize', () => {
    //   echart.resize()
    // })
  }
}

// 选择点 添加标记线
function AddMarkLine4SelectNodes (node) {
  const option = getChartOption(CHART_TYPE)
  const line = option.series.find(n => n.name === node.name) || null
  const type = window.chart.type || null

  if (line && type) {
    if (
      typeof line.markLine.data === 'object' &&
      !!line.markLine &&
      !!node.value.name
    ) {
      const times = window.chart.arrTimes || null

      switch (type) {
        case 'ZhuangTaiBiJiao': // 状态比较
          if (times) {
            const index = times
              .map(t => t.time)
              .findIndex(n => n === node.value.name)
            if (index > -1) {
              times.splice(index, 1)
              window.chart.arrTimes = times
            } else if (times.length > 3) {
              alert('最多选择4个时间点！')
              return
            } else {
              window.chart.arrTimes.push({
                name: node.name,
                time: node.value.name
              })
            }
          }

          // 清空
          option.series.map(s => (s.markLine.data = []))
          times &&
            times.forEach((t) => {
              const l = option.series.find(n => n.name === t.name) || null
              l.markLine.data.push({
                name: 'selectNode',
                xAxis: t.time,
                label: { formatter: '{c}', position: 'middle' },
                lineStyle: { color: '#F00', width: 3, type: 'solid' }
              })
            })
          break

        case 'YiChangShuJu': // 屏蔽异常数据
          if (times) {
            const index = times
              .map(t => t.time)
              .findIndex(n => n === node.value.name)
            if (index > -1) {
              times.splice(index, 1)
              window.chart.arrTimes = times
            } else if (times.length > 1) {
              alert('最多选择2个时间点！')
              return
            } else {
              window.chart.arrTimes.push({
                name: node.name,
                time: node.value.name
              })
            }
          }

          // 清空
          option.series.map(s => (s.markLine.data = []))
          times &&
            times.forEach((t) => {
              const l = option.series.find(n => n.name === t.name) || null
              l.markLine.data.push({
                name: 'selectNode',
                xAxis: t.time,
                label: { formatter: '{c}', position: 'middle' },
                lineStyle: { color: '#F00', width: 3, type: 'solid' }
              })
            })
          break

        case 'GongKuangBiaoZhu': // 工况标注 // 只保留选择一条
          // 清空
          option.series.map(s => (s.markLine.data = []))

          line.markLine.data.push({
            name: 'selectNode',
            xAxis: node.value.name,
            label: { formatter: '{c}', position: 'middle' },
            lineStyle: {
              color: '#F00',
              width: 3,
              type: 'solid'
            }
          })
          break

        default:
          return false
      }

      CHART.self.setOption(option)
    }
  }
}

function chartSize (el, chart) {
  if (window.getComputedStyle && !!el) {
    const _style = window.getComputedStyle
      ? window.getComputedStyle(el, null)
      : el.currentStyle
    // _style.width
    chart.style.height = _style.height
  }
}

function getChartData (type) {
  return DATA || null
}

function getChartOption (type) {
  return OPTION[type]
}

// 屏蔽异常数据
function switchChartError (e) {
  CHART_ERROR = !CHART_ERROR

  // const title = e.option.title[0].text
  CHART.initOption(CHART_TYPE) // , title.substring(0, title.indexOf('[')))
  CHART.drawPie()
}

// 实测值、折算切换 注：雷达图没有折算功能
function switchChartValue (e) {
  if (CHART_TYPE === 'line') {
    if (CHART_VALUE === 'measured_value') {
      CHART_VALUE = 'converted_value'
    } else {
      CHART_VALUE = 'measured_value'
    }

    // const title = e.option.title[0].text
    CHART.initOption(CHART_TYPE) // , title.substring(0, title.indexOf('[')))
    CHART.drawPie()
  } else {
    alert('雷达图不能折算！' + CHART_TYPE)
  }
}

const VUEOBJ = {
  name: 'Chart',
  components: {},
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Object],
      default: {},
      required: false
    },
    // 线及点数据
    cdata: {
      type: [Array, Object],
      default: null,
      required: true
    }
  },
  data () {
    return {
      title: '发展趋势',
      height: window.innerHeight
    }
  },
  computed: {},
  watch: {},
  mounted () {
    const self = this
    if (self.cdata && self.cdata.title) {
      self.title = self.cdata.title
    }
    window.console.log(self.cdata, self.title)
    DATA = self.cdata // from parent componet fz/index.vue

    window.onresize = () => {
      self.setHeight(window.innerHeight)
      CHART.self.resize()
    }

    self.setHeight()

    self.$nextTick(function () {
      CHART.initOption(CHART_TYPE)
      CHART.drawPie()
    })

    // self.$refs.main
  },
  methods: {
    setHeight () {
      this.width = '100%'
      this.height = window.innerHeight - window.innerHeight * 0.15
    },
    clearMarkLines () {
      // alert('clearML')
      const option = getChartOption(CHART_TYPE)
      option.series.map(s => (s.markLine.data = []))
      CHART.self.setOption(option)

      window.chart.arrTimes = []
    }
  }
}

export default VUEOBJ
</script>

<style lang="scss" scoped>
#chartParent{
  width: 100%;
  height: 100%;
  padding: 5px;
  margin: 0 auto;
}
</style>
