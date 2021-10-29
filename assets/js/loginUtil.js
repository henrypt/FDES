/*
  用户登录并获取Access_Token
  登录，配置客户端信息并重定向到认证地址，等待用户授权。
  这一步的目的是取得用户的授权并得到授权码，授权码将用于取得Access_Token。
  如果配置了参数中的redirect_uri，取得授权码之后认证服务器将会重定向到该地址。
*/

import RndNum from './ranNum'
const loginUtil = {
  login(vue) {
    vue.$config.code = RndNum(4) // random number 4 digital

    let authorUrl = vue.$config.userAuthorizationUri // 请求授权地址 github.com/login/oauth/authorize

    // [*] 必选项

    // 客户端相关标识，请从认证服务器申请
    //  clientId: "97c81931476b84be6746",
    //  client_secret:"7b38a22c72c35ee37d231c0c89d5c5630a099d84"
    authorUrl =
      authorUrl +
      ('?' +
        vue.$querystring.stringify({
          client_id: vue.$config.clientId, // [*]表示客户端的ID，请从认证服务器申请 "97c81931476b84be6746"
          response_type: vue.$config.response_type, // [*] 表示授权类型，此处的值固定为"code"
          scope: vue.$config.scope, // 申请的权限范围
          state: vue.$config.state, // 客户端的当前状态
          redirect_uri: vue.$config.redirect_uri, // 表示重定向回调URI
        }))
    window.location.href = authorUrl
  },
  logout(vue, returnUrl) {
    vue.$router.push('/logout' + '?return_url=' + returnUrl)
  },
  checkLogin(vue) {
    const tokenInfo = vue.$token.loadToken()
    if (tokenInfo.access_token === null || tokenInfo.access_token === 'null') {
      return false
    }
    return true
  },
}

export default loginUtil
