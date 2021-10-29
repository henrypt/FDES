export default ({ app, $axios, store, route, routes }) => {
  // nuxtjs中使用路由守卫, 路由守卫一般是来验证token失效, 也可以设置权限
  app.router.beforeEach((to, from, next) => {
    const tokenId = window.localStorage.getItem('tokenid')
    // const fdes = window.sessionStorage.getItem('FDES') || null
    // const menuData = JSON.parse(fdes)
    const welcome = '/welcome'
    // 在跳转时，判断是否跳转路由和当前路由是否一致，避免重复跳转产生问题。
    if (!tokenId && to.path !== '/welcome') {
      const sessionKey = store.state.system.info.sname
      const v = window.sessionStorage.getItem(sessionKey)
      let obj = null
      try {
        obj = JSON.parse(v)
      } catch (err) {}

      const userId = obj?.user?.info?.user?.id
      window.console.log('------------- plugins/route.js .dispatch(user/LogOut) --------------')
      store.dispatch('user/LogOut', userId).then(() => {
        window.console.log('[tokenId lost] plugins/route.js store.dispatch(user/LogOut) and next({path: welcome})')
        next({ path: welcome })
      })
    } else {
      // 从 welcome -> home
      if (from.path !== to.path && from.path === welcome) {
        to.meta.loginState = 'logining'
      } else {
        to.meta.loginState = ''
      }

      next()
    }
  })

  app.router.afterEach((to, from) => {
  })
}
