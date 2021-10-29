/*
  vuex持久化 vuex-persistedstate
  一、如果是用Nuxtjs，请配置插件： { src: '~/plugins/persistedstate.js', ssr: false }
  二、Nuxtjs的fetch只用于store，不能用来设置数据，可以用AsyncData设置数据，用在路由页面即可。
  三、fetch官方文档很清楚了：服务端或切换至目标路由之前
  四、可以用nuxtServerInit+express session存储用户登录
*/
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'
export default ({ app, store, vue }) => {
  const KEY = store.state.system.info.sname || 'FDES'

  if (process.env.NODE_ENV !== 'production') {
    // createPersistedState({
    //   storage: window.sessionStorage,
    //   getState: sessionStorage.getItem,
    //   setState: sessionStorage.setItem,
    //   removeState: sessionStorage.removeItem
    // })(store)
    window.onNuxtReady(() => {
      createPersistedState({
        key: KEY,
        storage: window.sessionStorage, // window.localStorage,
        // getState: sessionStorage.getItem,
        // setState: sessionStorage.setItem,
        // removeState: sessionStorage.removeItem,
        reducer (val) {
          return {
            system: val.system,
            roles: val.roles,
            user: val.user, // 只储存state中的user
            menu: val.menu,
            token: val.token,
            dynamo: val.dynamo
          }
        }
      })(store)
    })
  }
}

// const cookieStorage = {
//   getItem(key) {
//     return Cookies.getJSON(key)
//   },
//   setItem(key, value) {
//     return Cookies.set(key, value, { expires: 3, secure: false })
//   },
//   removeItem(key) {
//     return Cookies.remove(key)
//   }
// }

// export default (context) => {
//   createPersistedState({
//     storage: cookieStorage,
//     getState: cookieStorage.getItem,
//     setState: cookieStorage.setItem
//   })(context.store)
// }
