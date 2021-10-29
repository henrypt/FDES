import {
  // export const reqLogin = ({name, pwd}) => ajax('/login', {name, pwd}, 'POST')
  reqLogin, // export const reqUserInfo = () => ajax('/userinfo')
  // reqUserInfo,
  reqLogout, // export const reqLogout = (id) => ajax('/logout', {id}, 'POST')
  deleteTokenByRedis,
  decrypt
} from '@/api/index.js'

// import de from '~/static/lang/de.js'

// const UPDATE_USERS = 'UpdateUsers'
const LOGIN = 'Login'
const LOGOUT = 'Logout'
const LOGINED_IN_STATE = 'loginedInState'
// const UPDATE_USER_INFO_SELECT_DYNAMOS = 'UpdateUserInfoSelectDynamos'
const RESET_USER = 'resutUser'

// 注意：token 暂时放在登录用户的Vuex的state里，如果项目要求非登录也可访问项目时，需要把token移回store/index.vue的根state里
export const state = () => ({
  // info: {
  //   dynamoInfo: 'xxx',
  //   role: { name: 'xxx' }
  // },
  /*
    roles: [{
      AlarmView: "1",
      BaseDataView: "1",
      CanMngSys: "1",
      CanOverhaul: "1",
      CanQuery: "1",
      CanRepair: "1",
      CanRun: "1",
      CanStatus: "1",
      CanUpdate: "1",
      CurvesView: "1",
      DType: "100",
      Descr: "VIP用户",
      DoPointE: "1",
      FaultProcV: "1",
      PopedomId: -1,
      ReportView: "1",
      Shadow: "0",
      StatView: "1",
      StatusView: "1",
      Text: "VIP用户",
      dynamoId: "19",
      dynamoName: "19号发电机",
      dynamoShortName: "1F",
      dynamoStatus: "0"
      }, ..., { ... }
    ],
    user: {
      id: "dyw_henryBJVAGRHTFUOTK0.23159838026491586",
      loginId: "{C3A2E176-AD7E-4048-B832-F49058070C9C}",
      name: "dyw_henry",
      dynamoId: 19,
      dynamoName: "一号发电机",
      dynamoShortName: "1F",
      roleName: "VIP用户"
    }
  */
  info: {
    // [{"AlarmView":"1","BaseDataView":"1","CanMngSys":"1","CanOverhaul":"1","CanQuery":"1","CanRepair":"1","CanRun":"1","CanStatus":"1","CanUpdate":"1","CurvesView":"1","Descr":"VIP用户","Text":"VIP用户","DoPointE":"1","FaultProcV":"1","PopedomId":"undefined","ReportView":"1","StatView":"1","StatusView":"1","Shadow":"0","_DType":"100","_ID":"19","_Name":"19号发电机","_ShortNM":"1F","_Status":"0"}, ..., {} ]
    roles: null,
    user: null
    // {
    //   id: null,
    //   name: null,
    //   loginId: null,
    //   dynamoName: null,
    //   dynamoShortName: null,
    //   roleName: null
    // }
  },
  params: {
    type: 1,
    data: ['H2 CO CO2 CH4 C2H6 C2H4 C2H2', 'H2 CO CO2 CH4 C2H6 C2H4 C2H2']
  },
  users: null,
  token: null,
  password: null
})

// vuex 里的计算机属性, 相当于Vue里的computed
export const getters = {
  isLoggedIn: (state) => {
    return (
      (state.info && state.token) // || !!window.sessionStorage.getItem('user')
    )
  },
  // 获取用户选择的系统当前机组的角色 使用方式：this.$store.getters['user/getUserRoles'] || null
  getUserRoles: (state, getters) => (id) => {
    id = id || state?.info?.user?.dynamoId
    if (state?.info?.roles) {
      const roleInfo = state.info.roles.find(
        itm => parseInt(itm.dynamoId, 10) === parseInt(id, 10)
      )
      return roleInfo
      // return state.info.dynamos.filter(item => item.selected)
    } else {
      return null // state.info.dynamos[0]
    }
  },
  // 获取用户token
  getUserToken: (state) => {
    return state.token
  },
  getUserPassword: state => (id) => {
    return state?.password
  },
  getUserInfo: state => (v) => {
    return state?.info?.user || v?.$common?.getSession('FDES')?.user?.info?.user
  },
  getUserDynamoStatus: state => (dynamoId) => {
    return state?.info?.roles?.find(role => role?.dynamoId?.toString() === dynamoId.toString())
  }
}

export const mutations = {
  [LOGIN] (state, { data, pwd, dynamoId }) {
    if (data && data.Dynamos) {
      const infoDynamo = data.Dynamos.Dynamo

      if (infoDynamo) {
        // const CurrentUser = {
        //   userId: data.User._ID,
        //   userLoginId: data.User._LoginID,
        //   userName: data.User._Name,
        //   dynamoInfo: {
        //     id: dynamoId,
        //     name: '',
        //     shortName: ''
        //   },
        //   role: { id: -1, name: '---' },
        //   pwd,
        //   roles: []
        // }

        const current = infoDynamo.find(
          itm => parseInt(itm._ID, 10) === dynamoId
        )

        const user = {
          id: data.User._ID,
          loginId: data.User._LoginID,
          name: data.User._Name,
          dynamoId,
          dynamoName: current ? current._Name : '',
          dynamoShortName: current ? current._ShortNM : '',
          roleName: current ? current.Descr : ''
        }

        const roles = []
        // 用户机组的权限信息
        infoDynamo.forEach((dynamo) => {
          roles.push({
            AlarmView: dynamo.AlarmView, // 故障诊断-浏览报警(menu-2)
            BaseDataView: dynamo.BaseDataView, // 数据处理-查询(menu-2)
            CanMngSys: dynamo.CanMngSys, // 系统设置(menu-1)
            CanOverhaul: dynamo.CanOverhaul, // 维修管理(menu-1)
            CanQuery: dynamo.CanQuery,
            CanRepair: dynamo.CanRepair, // 故障诊断-检修处理故障、人工提交先兆、提交录入数据(menu-2)
            CanRun: dynamo.CanRun, // 故障诊断-运行中处理故障、人工提交先兆、提交录入数据(menu-2)
            CanStatus: dynamo.CanStatus,
            CanUpdate: dynamo.CanUpdate, // 数据处理-设置(menu-2)
            CurvesView: dynamo.CurvesView, // 趋势分析(menu-1)
            Descr: dynamo.Descr,
            Text: dynamo.Descr,
            DoPointE: dynamo.DoPointE, // 故障诊断-测点异常处理(menu-2)
            FaultProcV: dynamo.FaultProcV, // 故障诊断-浏览查询录入、故障诊断(menu-2)
            ReportView: dynamo.ReportView, // 数据处理-报表(menu-2)
            PopedomId: -1,
            StatView: dynamo.StatView, // 统计分析(menu-1)
            StatusView: dynamo.StatusView, // 状态监测(menu-1)
            Shadow: dynamo.shadow,
            DType: dynamo._DType,
            dynamoId: dynamo._ID,
            dynamoName: dynamo._Name,
            dynamoShortName: dynamo._ShortNM,
            dynamoStatus: dynamo._Status
          })
        })

        state.info = {
          roles,
          user
        }

        state.password = pwd

        // if (current) {
        //   CurrentUser.dynamoInfo.name = current._Name // 当前机组名曾
        //   CurrentUser.dynamoInfo.shortName = current._ShortNM
        //   CurrentUser.role.name = current.Descr // 当前角色名称
        // }

        // info.Dynamos.Dynamo
        //  info.Dynamo.Descr / CanRun / CanRepair CanUpdate CanMngSys
        // info.User
        //  info.User._ID         e.g. "henry2021BJVAGRHTFUOTK0.22286031892971686"
        //  info.User._LoginID    e.g. "{0ED45D15-409A-44E2-81CF-67F1C08D5795}"
        //  info.User._Name       e.g. "henry2021"

        // state.info = typeof user === 'string' ? JSON.parse(user) : user
        window.console && window.console.log('store>user.js Login', state)
      }
    }
  },

  [LOGOUT] (state) {
    state.info = null
    state.token = null
    this.isLoggedIn = false
  },

  [LOGINED_IN_STATE] (state, info) {
    window.sessionStorage &&
      window.sessionStorage.setItem('loginedInState', info)
  },
  // [UPDATE_USER_INFO_SELECT_DYNAMOS] (state, ids) {
  //   if (ids) {
  //     const dynamos = state.info.roles || null
  //     ids.forEach((id) => {
  //       dynamos.forEach((dynamo) => {
  //         dynamo.selected = dynamo.id === id
  //       })
  //     })
  //     // state.info.dynamos = info
  //   }
  // },

  [RESET_USER] (state, info) {
    if (info) {
      state.info = info
    }

    if (info.tokenId) {
      state.token = info.tokenId
    }

    window.console.log('[RESET_USER] stat = ', state)
  }
}

export const actions = {
  async Login ({ commit }, { userId, pwd, dynamoId }) {
    pwd = decrypt(pwd)

    const result = await reqLogin({ userId, pwd })
    if (result.code === 200) {
      const data = result.data
      commit(LOGIN, { data, pwd, dynamoId })
      if (window) {
        window.sessionStorage &&
        window.sessionStorage.setItem &&
        window.sessionStorage.setItem('loginedInState', true)
      }
    }
    return result
  },
  // 在调用 user/LogOut 成功后，在 reqLogout 里执行 token/DeleteToken
  async LogOut ({ context, commit, state }, userId) {
    const id = userId || state?.info?.user?.id || state?.info?.userId
    if (!id) {
      window.console.log('async LogOut(', id, ') failed!!!')
      return
    }

    id && await reqLogout(id)
    // if (id) {
    //   // ajax
    //   const result = await reqLogout(id)
    //   if (result.code === 200) {
    //     commit(LOGOUT)
    //   } else {
    //     throw new Error('404 error')
    //   }
    // }
    const tokenid = state.token || window.localStorage.getItem('tokenid')
    deleteTokenByRedis(tokenid)

    commit(LOGOUT)

    if (window) {
      // const sessionKey = self.$store.state.system.info.sname
      window?.sessionStorage?.removeItem('FDES')
      window?.localStorage?.removeItem('tokenid')
      window?.sessionStorage?.setItem('loginedInState', false)
    }

    window.console.log('store/user.js -> LogOut', userId)
    return 'ok'
  },

  ResetUser ({ commit }, info) {
    commit(RESET_USER, info)
  },

  LoginedInState ({ commit }, isLogin) {
    commit(LOGINED_IN_STATE, isLogin)
  }

  // UpdateUserInfoSelectDynamos ({ commit }, dynamos) {
  //   commit(UPDATE_USER_INFO_SELECT_DYNAMOS, dynamos)
  // }
}
