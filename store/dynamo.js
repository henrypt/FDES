
const UPDATE_DYNAMO = 'updateDynamo'

export const state = () => ({
  info: {
    select: 19
  }
})

// vuex 里的计算机属性, 相当于Vue里的computed
export const getters = {
  getDynamoId (state, store, app) {
    return state.info.select
  },
  getDynamoInfo: (state, getters) => (id) => {
    return state?.info
  }
}

export const mutations = {
  [UPDATE_DYNAMO] (state, id) {
    if (id) {
      state.info.select = id
    }
  }
}

export const actions = {
  // GetMenuInfo (context, menu) {
  updateDynamo (context, id) {
    if (id) {
      context.commit(UPDATE_DYNAMO, id)
      const sessionKey = context.rootState.system.info.sname
      sessionKey && this._vm.$common.resetSession('dynamo', sessionKey, context.state.info)
    }
  }
}
