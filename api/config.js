import axios from 'axios'
// import { state } from '../store/'

// 增加自定义配置
const instance = axios.create({
  timeout: 60 * 1000
})

// 在 request 拦截器实现
instance.interceptors.request.use(
  (config) => {
    // 允许携带token ,这个是解决跨域产生的相关问题
    config.withCredentials = true
    // config.timeout = 10000

    const token = getAccessToken()

    if (token) {
      // 向请求头中塞入 token
      config.headers = {
        token,
        'access-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    if (config.url === 'refresh') {
      config.headers = {
        token,
        'refresh-token': token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 在 response 拦截器实现
instance.interceptors.response.use(
  (response) => {
    // window.console.log(
    //   'api/ajax.js => instance.interceptors.response.use',
    //   response.data
    // )

    // 定时刷新access-token
    // token 失效问题
    // 当token失效，服务端会返回一个特定的错误表示(比如 token invalid)，但是我们不能在每个请求之后去做刷新 token，
    // 所以这里用 axios response 拦截器，统一处理所有请求成功之后响应过来的数据，然后对特殊数据进行处理，其他的正常分发。
    /*
    if (
      !response.data.value &&
      response.data.data &&
      response.data.data.message === 'token invalid'
    ) {
      // 刷新token
      state
        .dispatch('initToken')
        .then((response) => {
          setAccessToken(response.data)
        })
        .catch((error) => {
          throw new Error('token刷新' + error)
        })
    }
    */
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

function getAccessToken () {
  return window.localStorage.getItem('tokenid')
}

// function setAccessToken (token) {
//   const TOKEN =
//     'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'

//   token = token || TOKEN
//   if (window.localStorage && window.localStorage.setItem('tokenid')) {
//     window.localStorage.setItem('tokenid', token)
//   }
// }

export default instance
