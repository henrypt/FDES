/*
Vuex's central object module
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const getters = () => ({
  // authStatus: state => state.status,
  menu: state => state.menu
})

export const state = () => ({
  // token: {
  //   expireTime: -1,
  //   grantType: null, // 'client_credential',
  //   deviceID: null,
  //   secretKey: null, // '123456',
  //   authorization: null
  // },
  // expireTime: null,
  // authCode: null,
  roleMenu: [{ id: 1, roleId: 20 }]
})

export const mutations = {
  setAuth ({ state }, auth) {
    state = auth
  }
}

export const actions = {
  nuxtServerInit ({ commit, state }, { req }) {
    debugger
    if (req.header.cookie) {
      // let auth = null
      // const parsed = cookieparser.parse(req.headers.cookie)
      // try {
      //   auth = JSON.parse(parsed.auth)
      // } catch (err) {}

      // commit('setAuth', auth)
    }
  }

}
