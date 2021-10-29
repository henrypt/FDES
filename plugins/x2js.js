// x2js 这是一个在XML和JavaScript对象之间进行转换的库
import Vue from 'vue'
import X2js from 'x2js'

// Vue.use(X2js)
// eslint-disable-next-line new-cap

export default () => {
  Vue.prototype.$x2js = new X2js()
}
