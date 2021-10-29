<!-- page info:  -->
<template>
  <div id="main" ref="main" :style="`height: ${height}px;`" />
</template>

<script>
import echarts from 'echarts'
import { reqFaultTree, reqFaultMode } from '~/api/index.js'

const OPTION = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: {
    type: 'tree',
    id: 0,
    name: 'tree1',
    data: null,

    top: '0%',
    left: '12%',
    bottom: '5%',
    right: '20%',

    orient: 'horizontal',

    symbolSize: 10,

    label: {
      position: 'left',
      verticalAlign: 'middle',
      align: 'right',
      fontSize: 12
    },

    leaves: {
      label: {
        position: 'right',
        verticalAlign: 'middle',
        align: 'left'
      }
    },

    initialTreeDepth: 15,
    expandAndCollapse: true,
    animationDuration: 550,
    animationDurationUpdate: 750
  }
}

export default {
  props: {
    faultType: {
      type: String,
      default: '',
      required: true
    },
    treeId: {
      type: Number,
      default: -1,
      required: true
    },
    dynamoId: {
      type: Number,
      default: -1,
      required: true
    },
    itemName: {
      type: String,
      default: '',
      required: true
    },
    orient: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    // 这里存放数据
    return {
      title: '故障树',
      height: window.innerHeight
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // created
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // mounted
    const self = this
    self.$nextTick(function () {
      self.hInit()
    })
  },
  // 方法集合
  methods: {
    // methods
    hInit () {
      const self = this
      self.GetFaultTreeData('main')
    },
    async GetFaultTreeData (id) {
      const self = this
      let faultTreeData = null
      let sdata = null
      switch (self.faultType) {
        case 'faultTree':
          // 故障树
          sdata = await reqFaultTree(self.treeId, self.dynamoId)
          if (sdata && sdata.code === 200) {
            faultTreeData = sdata.data
          }
          // OPTION.series.orient = self.orient
          OPTION.series.top = '0%'
          OPTION.series.left = '12%'
          OPTION.series.bottom = '5%'
          OPTION.series.right = '20%'
          break

        case 'faultMode':
          // 故障模式
          sdata = await reqFaultMode(self.treeId, self.dynamoId)
          if (sdata && sdata.code === 200) {
            faultTreeData = sdata.data
          }
          // OPTION.series.orient = self.orient
          // OPTION.series.top = '5%'
          // OPTION.series.left = '0%'
          // OPTION.series.bottom = '10%'
          // OPTION.series.right = '0%'
          break
      }

      self.LoadFaultTreeChart(id, [faultTreeData])

      window.onresize = () => {
        self.setHeight(window.innerHeight)
        // CHART.self.resize()
      }

      self.setHeight()
    },
    LoadFaultTreeChart (id, faultTreeData) {
      const objMain = document.getElementById(id) || this.$refs.main
      OPTION.series.data = faultTreeData

      window.console && window.console.log(faultTreeData, echarts)

      const echart = echarts.init(objMain, null, { renderer: 'canvas' })
      echart.clear()
      echart.setOption(OPTION)

      echart.showLoading({
        text: '图表数据正在努力加载...'
      })

      setTimeout(() => {
        echart.hideLoading()
      }, 1500)
    },
    open () {
      const self = this
      self.closeOthers()
    },
    // 关闭其他打开的对话框
    closeOthers () {},
    setHeight () {
      this.width = '100%'
      this.height = window.innerHeight - window.innerHeight * 0.15
    }
  }
  // beforeCreate () {}, // 生命周期 - 创建之前
  // beforeMount () {}, // 生命周期 - 挂载之前
  // beforeUpdate () {}, // 生命周期 - 更新之前
  // updated () {}, // 生命周期 - 更新之后
  // beforeDestroy () {}, // 生命周期 - 销毁之前
  // destroyed () {}, // 生命周期 - 销毁完成
  // activated () {}, // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
// @import url(); 引入公共css类
</style>
