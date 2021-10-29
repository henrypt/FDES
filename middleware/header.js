import sha256 from 'js-sha256'
// import axios from 'axios'
// import jsCookie from 'js-cookie'
/*
  {
    $axios, $config, $cookies, $lodash, $vuetify, app,
    base, env, error, from, isDev, isHMR, isStatic, next,
    nuxtState, params, payload, query, redirect, route, store
  } = context
*/
export default function (context) {
  // return axios.post('http://my-stats-api.com', { url: route.fullPath })
  // if (!store.state.authUser) {
  const { store, route, redirect, $axios } = context

  store.dispatch && store.dispatch('system/initSystems')

  // confirm sytem.info has data
  if (!store.state.system.info) {
    store.dispatch && store.dispatch('system/SetSystemInfo')
  }

  const TOKEN_ID = window.localStorage.getItem('tokenid') // await store.getters['token/getTokenid']

  if (route.path !== '/welcome') {
    // const tokenInfo = await store.getters['token/getTokenInfo'](TOKEN_ID)
    // window.console.log('middleware/header.js -> TOKEN_ID = ', TOKEN_ID, '--------------- user/LogOut')
    // if (TOKEN_ID && tokenInfo?.data === '') {
    //   const userId = TOKEN_ID.substring(TOKEN_ID.indexOf('BJVAG') + 5, TOKEN_ID.lastIndexOf('BJVAG'))
    //   store.dispatch && await store.dispatch('user/LogOut', userId)
    // }
  }
  // 请求拦截器
  $axios.defaults.timeout = 30 * 1000 // 设置超时时间

  $axios.interceptors.request.use(function (config) {
    // const time = parseInt(new Date().getTime() / 1000, 10)
    // const secret = '8888'
    // const appId = 'fdes'
    // const sign = sha256.hmac(appId, `time=${time}${secret}`) // HMAC sha256('key', 'xxx')

    // if (config.url.includes('?')) {
    //   config.url = `${config.url}&time=${time}&sign=${sign}&appId=${appId}`
    // } else {
    //   config.url = `${config.url}?time=${time}&sign=${sign}&appId=${appId}`
    // }
    window.console.log('$axios.interceptors.request')
    if (TOKEN_ID) {
      config.url = `${config.url}&access-token=${TOKEN_ID}`
    }

    const nowDate = new Date()
    const signTime = nowDate.getTime()
    if (
      store.state.token != null &&
      store.state.expireTime > nowDate.getTime()
    ) {
      config.headers.sign_time = signTime
      config.headers.auth_Code = store.state.authCode
      config.headers.sign = sha256.hmac(
        store.state.token,
        signTime + store.state.authCode
      )
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      if (store.state.token) {
        config.headers.Authorization = store.state.token
      }
    }
    return config
  })

  $axios.onRequest((config) => {
    debugger
    // 向请求头中塞入 token
    config.headers.token = TOKEN_ID
    config.headers.Authorization = TOKEN_ID

    // 向参数中塞入 token
    let data = {}
    if (config.method.toUpperCase() === 'GET') {
      data = config.params || {}
      data.token = TOKEN_ID
      config.params = data
    } else {
      // POST 需要塞入 data
      data = config.data || {}
      data.token = TOKEN_ID
      config.data = data
    }
    // try {}
    // catch (error) {
    //   return Promise.reject(error)
    // }

    // window.console.log('Making request to ' + config.headers)
  })

  $axios.interceptors.response.use(
    (response) => {
      debugger
      if (!TOKEN_ID) {
        window.console.log('请求失败 token')
        redirect('/404')
        return
      }

      if (response.data.success === false) {
        window.console.log('middleware/header.js -> 请求失败')
        redirect('/404')
        return
      }

      return response
    },
    (err) => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)'
            break
          case 401:
            return history.push('/login')
          case 403:
            err.message = '拒绝访问(403)'
            break
          case 404:
            err.message = '请求出错(404)'
            break
          case 408:
            err.message = '请求超时(408)'
            break
          case 500:
            err.message = '服务器错误(500)'
            break
          case 501:
            err.message = '服务未实现(501)'
            break
          case 502:
            err.message = '网络错误(502)'
            break
          case 503:
            err.message = '服务不可用(503)'
            break
          case 504:
            err.message = '网络超时(504)'
            break
          case 505:
            err.message = 'HTTP版本不受支持(505)'
            break
          default:
            err.message = `连接出错(${err.response.status})!`
        }
      } else {
        err.message = '连接服务器失败![' + URL + ']'
      }
      window.console.log('middleware/header.js -> ', err.message)
      return Promise.reject(err)
    }
  )

  $axios.onResponse((res) => {
    debugger
    // 返回数据逻辑处理
    // window.console.log('test onResponse', res)
    if (res.data.code === 1) {
      // 重定向到 login 页
      redirect('/login')
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status, 10)
    // 重定向到 403 页
    redirect(`/error/${code}`)
    // switch (code) {
    //   case 403:
    //     // 重定向到 403 页
    //     redirect('/error/403')
    //     break
    //   case 404:
    //     // 重定向到 404 页
    //     redirect('/error/404')
    //     break
    //   case 500:
    //     // 重定向到 500 页
    //     redirect('/error/500')
    //     break
    //   default:
    //     break
    // }
  })
}

// export default function({ redirect, $axios, app }) {
// 从store/user.js => Login 中获取的token, 登录成功后，token放在了sessionStorage中的user.token

// try {
//   if (jsCookie) {
//     const t = jsCookie.get('token') || ''
//     t.split(';').forEach((cookie) => {
//       const parts = JSON.parse(cookie)
//       axios.defaults.cookies = parts
//     })
//   }
// } catch (error) {
// }

// if (
//   jsCookie &&
//   jsCookie.get('token') &&
//   jsCookie.get('token').authorization
// ) {
//   window.console.log('token = ', jsCookie.get('token').authorization)
// }
// else{
// }

// const axios = app.$axios
// axios.onRequest((config) => {
//   const time = parseInt(new Date().getTime() / 1000, 10)
//   const secret = '8888'
//   const appId = 'fdes'
//   const sign = sha256.hmac(appId, `time=${time}${secret}`) // HMAC sha256('key', 'xxx')
//   try {
//     if (!TOKEN_ID && axios.defaults.cookies.token) {
//       TOKEN_ID = axios.defaults.cookies.token.authorization
//     }
//   } catch (error) {}

//   if (config.url.includes('?')) {
//     config.url = `${config.url}&time=${time}&sign=${sign}&appId=${appId}`
//   } else {
//     config.url = `${config.url}?time=${time}&sign=${sign}&appId=${appId}`
//   }
//   if (TOKEN_ID) {
//     config.url = `${config.url}&access-token=${TOKEN_ID}`
//   }
//   window.console.log(config.url)
//   return config
// })

// let URL = ''

// axios.interceptors.request.use(
//   (config) => {
//     const time = parseInt(new Date().getTime() / 1000, 10)
//     const secret = '8888'
//     const appId = 'fdes'
//     const sign = sha256.hmac(appId, `time=${time}${secret}`) // HMAC sha256('key', 'xxx')
//     URL = config.url
//     try {
//       if (!TOKEN_ID && axios.defaults.cookies.token) {
//         TOKEN_ID = axios.defaults.cookies.token.authorization
//       }
//     } catch (err) {
//       window.console.log(
//         'axios.interceptors.request error (TOKEN_ID)',
//         err.message
//       )
//       return Promise.reject(err)
//     }

//     if (config.url.includes('?')) {
//       config.url = `${config.url}&time=${time}&sign=${sign}&appId=${appId}`
//     } else {
//       config.url = `${config.url}?time=${time}&sign=${sign}&appId=${appId}`
//     }
//     if (TOKEN_ID) {
//       config.url = `${config.url}&access-token=${TOKEN_ID}`
//     }
//     window.console.log(config)

//     return config
//   },
//   (err) => {
//     window.console.log('axios.interceptors.request error (err)')
//     return Promise.reject(err)
//   }
// )

// axios.interceptors.response.use(
//   (response) => {
//     // if (!TOKEN_ID) {
//     //   window.console.log('请求失败 TOKEN_ID')
//     //   return
//     // }

//     if (response.data.success === false) {
//       window.console.log('请求失败')
//       return
//     }

//     return response
//   },
//   (err) => {
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           err.message = '请求错误(400)'
//           break
//         case 401:
//           return history.push('/login')
//         case 403:
//           err.message = '拒绝访问(403)'
//           break
//         case 404:
//           err.message = '请求出错(404)'
//           break
//         case 408:
//           err.message = '请求超时(408)'
//           break
//         case 500:
//           err.message = '服务器错误(500)'
//           break
//         case 501:
//           err.message = '服务未实现(501)'
//           break
//         case 502:
//           err.message = '网络错误(502)'
//           break
//         case 503:
//           err.message = '服务不可用(503)'
//           break
//         case 504:
//           err.message = '网络超时(504)'
//           break
//         case 505:
//           err.message = 'HTTP版本不受支持(505)'
//           break
//         default:
//           err.message = `连接出错(${err.response.status})!`
//       }
//     } else {
//       err.message = '连接服务器失败![' + URL + ']'
//     }
//     window.console.log(err.message)
//     return Promise.reject(err)
//   }
// )
// }

// 解析浏览器中的cookies
// function getCookie(name, strCookie) {
//   const arrCookie = strCookie.split(';') || []
//   for (let i = 0; i < arrCookie.length; i++) {
//     const arr = arrCookie[i].split('=') || []

//     if (arr[0].trim() === name) {
//       return arr[1]
//     }
//   }

//   return {}
// }
