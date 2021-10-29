<template>
  <div
    id="main"
    style="width: 100%; height: 380px; min-height: 380px; background-color:rgba(255, 255, 255, 0.2);"
    class="px-2 py-3"
  />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'DataStatistics',
  components: {},
  props: {
    title: {
      type: String,
      default: '趋势图',
      required: false
    }
  },
  data () {
    return {
      option: {
        title: {
          text: '缺陷统计',
          textStyle: { color: '#fff' }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            orient: 'vertical',
            left: 'right',
            top: 'center'
            // ,saveAsImage: {show: true }
          }
        },
        tooltip: {},
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'bar',
            name: '',
            label: { show: true, position: 'top', color: '#fff' },
            itemStyle: {
              color: '#45678E',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 5
            },
            data: [1]
          },
          {
            type: 'bar',
            name: '',
            label: { show: true, position: 'top', color: '#fff' },
            itemStyle: {
              color: '#FF0000',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 5
            },
            data: [10]
          },
          {
            type: 'bar',
            name: '',
            label: { show: true, position: 'top', color: '#fff' },
            itemStyle: {
              color: '#D5E3F4',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 5
            },
            data: [3]
          },
          {
            type: 'bar',
            name: '',
            label: { show: true, position: 'top', color: '#fff' },
            itemStyle: {
              color: '#fff',
              shadowColor: 'rgba(0, 0, 0, 0.9)',
              shadowBlur: 5
            },
            data: [8]
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.$nextTick(function () {
      // 处理echart插件需要的数据
      this.drawChart('main')
    })
  },
  methods: {
    drawChart (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption(this.option)
      this.charts.showLoading({
        text: '图表数据正在努力加载...'
      })

      setTimeout(() => {
        this.charts.hideLoading()
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped></style>
