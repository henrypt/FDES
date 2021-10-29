import jwt from 'jsonwebtoken'
import {
  crudToken,
  createTokenByRedis,
  updateTokenByRedis,
  getTokenByRedis
} from '@/api/index.js'

const RESET_TOKEN = 'resetToken'
const DELETE_TOKEN = 'deleteToken'
const TOKEN_MODEL = {
  id: null, // token id
  info: null, // user data info { userId: 'xxxx', userName: 'xxx', dynamos: [...] }
  type: 'key'
}

// sign or verify token id
const TokenUtil = {
  privateKey: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc',

  // 生成token
  sign (userId) {
    /*
  签名方法:jwt.sign(payload, secretOrPrivateKey, [options, callback])
    payload 是一个json对象或者是一个可以json化的buffer或字符串 这个对象可以存储用户id,会话信息等,这里的信息都是可以使用jwt.verify()方法拿到的.
    secretOrPrivateKey是加密的key或者叫做密匙,不知道密匙是无法解析payload参数的.
    options 参数 是一个json对象
    expiresIn : 表示有效期  不带单位默认为秒  如带单位如: "2 days", "10h", "7d"

    例如: let token = jwt.sign({user: '1234'}, 'Fizz', {expiresIn: 60 * 60})
  */
    const payload = { userId }
    const token = jwt.sign(payload, this.privateKey)
    // window.console.log(`token = ${token}`, payload, this.privateKey)
    return token + 'BJVAG' + userId
  },
  // 验证token
  verify (token) {
  /*
  解析验证方法:jwt.verify(token, secretOrPublicKey, [options, callback])
    token: 就是token字符串 由jwt.sign()方法生成的
    secretOrPublicKey:是加密的key,用于解析生成token时的payload参数
    options: 设置一些解密的方法....
    使用方法
      jwt.verify(token, 'Fizz', function (err, data) {
        if (err) console.log(err)
        console.log('解析的数据', data)
      })

  */
    // const decoded = jwt.verify(token, this.privateKey)
    jwt.verify(token, this.privateKey)
    // window.console.log('decoded = '+decoded);
    // window.console.log('decoded = ' + JSON.stringify(decoded))
  },
  main () {
    const str = this.sign('xxx')
    this.verify(str)
  }
}

// CRUD redis for token id and user data info
const FdesRedis = {
  async create (info) {
    const { type, tokenId, userInfo } = info

    const v = ({ // JSON.stringify
      id: userInfo.User._ID,
      name: userInfo.User._Name,
      dynamos: userInfo.Dynamos.Dynamo
    })
    // const val = userINfo.user,
    const param = {
      type,
      name: tokenId,
      value: JSON.stringify(v),
      time: 1440 // 1440分钟，即1天
    }

    const r = await crudToken(param)
    window.console.log('await crudToken(param) r = ', r)
    return r
  },
  // get user data info by token id [from Redis]
  async get (id) {
    const tokenId = id || window.localStorage.getItem('tokenid')
    let r = null
    if (tokenId) {
      r = await getTokenByRedis({ type: 'read', name: tokenId })
      // return (r && typeof r === 'object') ? { code: 200, data: r } : { code: 401, data: null }
      return (r && typeof r === 'object') ? r : null
    }
    return r
  },
  async delete (id) {
    let r = null
    if (id) {
      const param = { type: 'delete', name: id }
      r = await crudToken(param)
    }
    return (r && typeof r === 'object') ? 200 : 401
  }
}

/*
注意：token 暂时放在登录用户的Vuex的state里，
如果项目要求非登录也可访问项目时，需要把token移回store/index.vue的
根state里
*/

export const state = () => ({
  token: TOKEN_MODEL
})

// vuex 里的计算机属性, 相当于Vue里的computed
export const getters = {
  // get user token id
  /*
  此处返回的内容不准确，不知道为什么！！！
  getTokenid: (state) => {
    return window.localStorage.getItem('tokenid')
  },
  */
  // get user data info
  getTokenInfo: state => (id) => {
    return FdesRedis.get(id || state.token?.id)

    // const info = state.token?.userInfo || null
    // if (info) {
    //   return info
    // } else {
    //   return FdesRedis.get(id || state.token?.id)
    // }
  }
}

export const mutations = {
  [RESET_TOKEN] (state, { info }) {
    state = info
  },
  [DELETE_TOKEN] (state) {
    state.token = TOKEN_MODEL
  }
}

export const actions = {
  // init token id by user._ID
  async InitToken ({ commit }, { loginInfo, userInfo, dTypes }) {
    window.console.log('TOKEN store/token.js -> InitToken ', userInfo)
    if (userInfo) {
      const user = userInfo.User
      // sign token id by user id
      const id = TokenUtil.sign(user._ID)
      if (id) {
        await createTokenByRedis(loginInfo, id, userInfo, dTypes)
        commit(RESET_TOKEN, { tokenId: id, info: JSON.stringify(userInfo) })

        return { id, userInfo }
      }
    }
  },
  async UpdateToken ({ commit }, { tokenId, info }) {
    if (info) {
      const r = await updateTokenByRedis(tokenId, info) // updateTokenByRedis = (tokenId, userInfo)
      window.console.log('============ updateTokenByRedis r = ', r)
      return { tokenId, info }
    }
  },
  DeleteToken ({ commit }, id) {
    window.console.log('store/token.js -> DeleteToken()')
    if (id) {
      const r = FdesRedis.delete(id)
      if (r === 200) {
        commit(DELETE_TOKEN)
      }
      return r
    }
  },
  ResetToken ({ commit }, userInfo) {
    window.console.log('TOKEN store/token.js -> ResetToken ', userInfo)
    if (userInfo) {
      const id = userInfo.tokenId
      if (id) {
        commit(RESET_TOKEN, { info: userInfo })
      }
    }
  }
}
