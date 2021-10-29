export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  error,
  req,
  res,
  context,
  redirect
}) {
  if (isHMR) { return } // 用来判断热更新
  window.console && window.console.log('middleware>redirect.js')

  const SYSTEM_INFO = store.state.system.info
  // const HOME_PAGE = SYSTEM_INFO.route.home
  const WELCOME_PAGE = SYSTEM_INFO.route.welcome

  // 页面均放在_lang文件夹下，即lang为动态路由参数;
  /* if (!params.lang) { //此写法会出现路由重定向次数过多的问题；
  return redirect('/' + defaultLocale + '' + route.fullPath)} */

  /*
    1. 获取token[middleware\redirect]
    localStorage.getItem('tokenid')
    if( !tokenid ) {
      如果"获取失败"：
      * 路由跳转至"欢迎页面"
        self.$router.push(WELCOME_PAGE)
      * 执行用户登录，录成功后：
        使用JsonWebToken生成tokenid，同步更新到客户端和服务端。
        客户端：localStorage->tokenid
        服务端：Redis（key: tokenid, value:用户信息）
    }

    2. 同步更新各个模块数据
    (1) 同步更新store
      store\user.js
      store\roles.js
      store\system.js
      store\menu.js

    (2) 根据权限同步菜单
    (3) 路由跳转首页
      self.$router.push('/ztjc/ztzs')
  */

  const tokenId = window.localStorage.getItem('tokenid')
  if (tokenId) {
    window.console && window.console.log('midlleware>redirect.js tokenId = ', tokenId)
    // const tokenInfo = store.getters['token/getTokenInfo'](tokenId) || null
    // store.getters['token/getTokenInfo'](tokenId).then((res) => {
    //   debugger
    //   if (res.code === 200 && res.data) {
    //     const r = {
    //       userId: res.data.id,
    //       userName: res.data.name,
    //       userDynamos: res.data.dynamos
    //     }
    //     window.console.log(r)
    //     store.dispatch('user/loginedInState', true)
    //     // 用户登录成功后，同步各个模块数据

    //     return redirect(HOME_PAGE) // 路由至首页
    //   } else {
    //     debugger
    //     store.dispatch('token/DeleteToken', tokenId)
    //     store.dispatch('user/loginedInState', false)
    //   }
    // })

    // if (tokenInfo) {
    //   if (tokenInfo.code === 200 && tokenInfo.data) {
    //     const r = {
    //       userId: tokenInfo.data.id,
    //       userName: tokenInfo.data.name,
    //       userDynamos: tokenInfo.data.dynamos
    //     }
    //     window.console.log(r)
    //     store.dispatch('user/loginedInState', true)
    //     // 用户登录成功后，同步各个模块数据

    //     return redirect(HOME_PAGE) // 路由至首页
    //   } else {
    //     debugger
    //     store.dispatch('token/DeleteToken', tokenId)
    //     store.dispatch('user/loginedInState', false)
    //   }
    // }
  } else if (route.path !== WELCOME_PAGE && !tokenId) {
    debugger
    return redirect(WELCOME_PAGE) // 路由至欢迎面+登录页
  }

  // if (route.fullPath === '/film') {
  //   return redirect('/film/nowplaying')
  // }
}
