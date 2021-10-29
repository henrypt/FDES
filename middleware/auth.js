// import crypto from 'crypto-js'
// import getCookie from '@/config/get-cookie'
/*
Nuxt.js是基于在Vue.js的服务端渲染框架，能完美的解决SEO的问题，但同时权限认证成为了一大痛点，需要解决用户登录后，保存token，来验证后续的权限的问题。

解决方法：
  利用js-cookie 保存token，这样能在token能在头部被获取，同时并用vuex,将token和用户信息存储在store中。

中间件authenticated.js
  由于store 里面的数据刷新后清空，所以添加中间件，重新设置store数据。
  如果头部不含用户信息，即cookie失效则重新登录。

Web应用一般有2种登陆认证的形式：
  用户名和密码认证登陆（http://blog.fens.me/nodejs-express-passport/）
  第三方OAuth认证登陆（http://blog.fens.me/nodejs-oauth-passport/）

  Nuxt 实现用户鉴权登陆
  From: https://www.jianshu.com/p/07fef850490e
  众所周知，我们浏览网页使用的 HTTP 协议是无状态的的，也就是说你每一次请求对于服务器来说都是一样的，它没有办法记住这个请求是你发的。所以这里就要用到Cookie。
  Cookie中的内容是服务端返回数据设置的，由浏览器储存在你的硬盘中的一组数据，，比如你的用户数据，每次向服务器发送请求就会携带上这个数据。服务器查看就能知道这是谁发过来的。这一过程就称为Session（会话）
  储存在本地的Cookie并不安全，所以现在更为流行的做法是仅仅通过 Cookie 保存 的唯一的用户标识符（SessionID）来识别用户，而用户信息储存在服务器端。

  服务器端
  在服务器端我们使用 koa-session 安装 koa-session
  npm install koa-session
  npm install koa-session-mongoose //使用 mongodb 储存 Session 信息
  然后在入口文件中这样使用
  。。。。
  详细信息见开头的From链接

  客户端（Nuxt）
  其实以上的步骤和 Vue 项目中一模一样，Nuxt 中主要的不同就是失去了全局前置守卫，那么要在哪里判断是否存在 Cookie 呢，别急，Nuxt 官方自然是给了解决方案，先看一下 Nuxt 的生命周期
  Nuxt生命周期：
  Incoming Request ->
  nuxtServerInit ->
  middleware(1.nuxt.config.js 2.matching layout 3. matching page & children)
  validate() (Pages & children) [校验参数]
  asyncData() & fetch() (Pages & children) [异步数据处理]
  Render [开始客户端渲染]
  Vue的生命周期
  beforeCreated && created ->
  beforeMount && mounted ->
  beforeUpdate && updated
  beforeDestroy && destroyed

  这里我们用到上面中的 nuxtServerInit 和 middleware 这两个时期，先来看代码
  // store/index.js  Vuex 文件中
  export const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit({ commit }, { req }) {
      if (req.session && req.session.userid) {
        console.log("用户已经登录");
        commit("SET_USER", req.session.userid);
      }
    },

    export const mutations = {
      SET_USER(state, user) {
        state.authUser = user;
      }
    }
  }
  Store action 模块中的 nuxtServerInit 函数是整个生命周期 最先运行的，我们就在这里判断当前用户浏览器中是否有 Cookie ，如果有的话就在 state 中用一个字段保存下来。

这里还只是做了判断，打上了印记你登没登陆，拦截在哪里呢，别急，就是下一个流程 middleware 中。

打开 middleware 文件夹( Nuxt 项目自带)，新建 auth.js 文件，如下:
*/
// import axios from 'axios'
export default function ({ vue, store, route, redirect, $axios, app, req }) {
  window.console.log(
    'middleware auth.js',
    '从store/user.js => Login 中获取的token, 登录成功后，tokenid放在了localStorage中',
    '[后期，在服务端的登录方法，返回用户信息里，加上token的信息（Http头中返回Set_Cookies:sessionId: 1111），之后，页面要数据时Http请求里带上这个Cookie]'
  )
  window.console.log('req = ', req, app)
  // const { auth } = getCookie(req)
  // window.console.log('auth = ', auth)
  /*
  if (auth) {
    store.commit('setAuth', auth)
    return store.dispatch('getUserInfo')
  }
  const routePath = route.path
  const extraPath = ['/', '/en']
  if ((!store.state.auth) && extraPath.indexOf(routePath) === -1) {
    return redirect('/')
  }
  */

  // const auth = vue.$common.getTokenid()
  // global.console.log('auth from auth.js ', auth)
}

// function getTokenId (req, jwt) {
//   const tokenid = req.headers.authorization// 获取前端请求头发送过来的tokenid
//   if (tokenid) {
//     // 校验tokenid
//     jwt.verify(
//       tokenid,
//       'keven',
//       function (err, decoded) { // decoded:指的是tokneid解码后用户信息
//         window.console.log(err)
//       }
//     )
//   }
// }

// login success & save res.tokenid
// window.localStorage.setItem('tokenid', getTokenId())

// function postDataByToken () {
/*
  把tokenid通过头部发送给后端，后端检验用户信息是否过期
  $.ajax({
    ...
    headers: {
      authorization: window.localStorage.getItem('tokenid')
    },
    success: function(res){
      ....
    }
  })
  */
// }
