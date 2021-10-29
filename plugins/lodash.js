//  plugins/lodash.js
import _ from 'lodash'
import Vue from 'vue'
Vue.prototype.$lodash = _

export default ({ app }, inject) => {
  app.lodash = _
  inject('lodash', _)
}
