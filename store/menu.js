const INIT_MENU = 'InitMenu'
const GET_MENU_INFO = 'GetMenuInfo'
const UPDATE_MENU_INFO = 'UpdateMenuInfo'
const SET_MENU_CAN = 'SetMenuCan'

export const state = () => ({
  info: null
})

export const getters = () => ({
  getMenuByRoleId: (state, getters) => (userId) => {
    if (state && state.info) {
      const items = state.info.stations.items || null
      // const r = items.forEach((item) => {
      //   return item.children.find(child => child.id === userId) || null
      // })
      return items
    }

    return null
  }
})

export const mutations = {
  // Menu Data from i18n -> locales/
  [INIT_MENU] (state, info) {
    state.info = info
  },
  [GET_MENU_INFO] (state, { info }) {
    state.info = info
  },
  [UPDATE_MENU_INFO] (state, { currentRole }) {
    const menuInfo = state.info || []
    menuInfo.forEach((menu) => {
      if (menu.active && menu.role) {
        // menu.can = currentRole.find(item => item.id === menu.key).power[0].can === 1
        menu.can = currentRole[menu.role] === '1'
      }
    })
    state.info = menuInfo
  },
  [SET_MENU_CAN] (state, { info }) {
    state.info[info.index].can = info.can
  }
}

export const actions = {
  // 根据当前用户的角色信息，更新菜单权限，并返回新的菜单信息
  async GetMenuInfo (context, menu) {
    // 菜单静态保存在locales/xxx.json 中
    // 在middleware/i18n.js中初始化[store.commit('menu/InitMenu', { info: dataMenu.data })]
    // const sessionKey = this.state.system.info.sname
    // const menuData = this._vm.$common.getSession(sessionKey)
    const _menu = menu?.info?.info || menu?.info || menu

    const dynamoId = this.state.system.info.dynamo.id
    // if (this.state && this.state.user && this.state.user.info && this.state.user.info.user) {
    //   dynamoId = this.state.user.info.user.dynamoId
    // } else {
    //   dynamoId = menu.system.info.dynamo.id
    // }

    const currentRole = await context.rootGetters['user/getUserRoles'](dynamoId)
    if (currentRole && _menu && _menu.length > 0) {
      _menu.forEach((m) => {
        // ["StatusView", "CurvesView", "AlarmView-FaultProcV-CanRun-CanRepair-DoPointE", "StatView", "BaseDataView-CanUpdate-ReportView", "CanMngSys", "all"]
        const arrRole = m.role.split('-') || []
        let can = false
        for (let i = 0, iLen = arrRole.length; i < iLen; i++) {
          if (currentRole[arrRole[i]] + '' === '1') {
            can = true
            break
          }
        }
        m.can = can
      })

      window.console.log('store/menu.js state.info = ', _menu)
      context.commit(INIT_MENU, _menu)

      return _menu
      // } else {
      // ajax

      // const result = info || null // self.$t('menuClass1') || null

      // if (result && result.code === 200) {
      //   const info2 = result.data
      //   context.commit(GET_MENU_INFO, { info2 })
      // }
    } else {
      return 'go'
    }
    // else {
    //   const result = this.info || null // self.$t('menuClass1') || null
    //   if (result ?? result?.code === 200) {
    //     const info2 = result.data
    //     context.commit(GET_MENU_INFO, { info2 })
    //   }
    // }
  },
  UpdateMenuInfo ({ commit }, currentRole) {
    commit(UPDATE_MENU_INFO, { currentRole })
  },
  SetMenuCan ({ commit }, info) {
    commit(SET_MENU_CAN, { info })
  },
  // 在middleware/i18n.js中初始化[store.commit('menu/InitMenu', { info: dataMenu.data })]
  InitMenu ({ commit }, info) {
    commit(INIT_MENU, info)
  }
}
