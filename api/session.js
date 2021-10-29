import Vue from 'vue'
import Vuex from 'vuex'

const hsession = {
  test: () => {
    const self = Vue
    const $store = Vuex.Store
    window.console.log(self, $store)
    debugger

    window.console.log(Vue, typeof Vue.$common)
    // window.console.log('state.user = ', mapState('user'))
    return Vue
  }
}

export default hsession
