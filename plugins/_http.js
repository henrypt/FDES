import axios from 'axios'
import { sha256 } from 'js-sha256'
import { state } from '../store/index'
// import router from '../router'
const instance = axios.create({
  timeout: 10000
})

// http request 拦截器
instance.interceptors.request.use(
  (config) => {
    const nowDate = new Date()
    const signTime = nowDate.getTime()
    if (state.token != null && state.expireTime > nowDate.getTime()) {
      config.headers.sign_time = signTime
      config.headers.auth_Code = state.authCode
      config.headers.sign = sha256.hmac(state.token, signTime + state.authCode)
    }

    config.headers.token = getAccessToken()
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// // http response 拦截器
// instance.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//         // 401 清除token信息并跳转到登录页面
//           store.commit('loginout')
//           router.replace({
//             path: '/login',
//             query: {redirect: router.currentRoute.fullPath}
//           })
//       }
//     }
//     // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
//     return Promise.reject(error.response.data)
//   }
// )

function getAccessToken () {
  const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'
  return window.sessionStorage && window.sessionStorage.getItem('FDES')
    ? JSON.parse(window.sessionStorage.getItem('FDES')).user.token
    : TOKEN
}

// export default instance
