import Vue from 'vue'
import echarts from 'echarts'

export default () => {
  Vue.use(echarts)
  Vue.prototype.$echarts = echarts
}
