import { reqRoles, updateRoles } from '@/api/index.js'

const RESET_ROLES_INFO = 'resetRolesInfo'
const UPDATE_ROLES_INFO = 'updateRolesInfo'

export const state = () => ({
  info: null
})

export const mutations = {
  [RESET_ROLES_INFO] (state, { info }) {
    state.info = JSON.parse(JSON.stringify(info))
  },
  [UPDATE_ROLES_INFO] (state, { info }) {
    if (info) {
      state.info = JSON.parse(JSON.stringify(info))
    }
  }
}

export const actions = {
  async GetRolesInfo ({ commit }) {
    // First: read date from sessionStorage, if sessionStorage is null, read it from /api/index.js
    let roles = null
    if (
      window.sessionStorage.getItem('loginedInState') &&
      JSON.parse(
        window.sessionStorage.getItem('loginedInState').toLowerCase()
      ) &&
      window.sessionStorage &&
      window.sessionStorage.getItem('FDES')
    ) {
      roles = JSON.parse(window.sessionStorage.getItem('FDES')).roles.info
    } else {
      roles = null
    }

    if (roles) {
      commit(RESET_ROLES_INFO, { info: roles })
    } else {
      const result = await reqRoles()
      if (result.code === 200) {
        const info = []
        result.data && result.data.Record.forEach((record) => {
          info.push({
            AlarmView: record.AlarmView, // 故障诊断-浏览报警(menu-2)
            BaseDataView: record.BaseDataView, // 数据处理-查询(menu-2)
            CanMngSys: record.CanMngSys, // 系统设置(menu-1)
            CanOverhaul: record.CanOverhaul, // 维修管理(menu-1)
            CanQuery: record.CanQuery,
            CanRepair: record.CanRepair, // 故障诊断-检修处理故障、人工提交先兆、提交录入数据(menu-2)
            CanRun: record.CanRun, // 故障诊断-运行中处理故障、人工提交先兆、提交录入数据(menu-2)
            CanStatus: record.CanStatus,
            CanUpdate: record.CanUpdate, // 数据处理-设置(menu-2)
            CurvesView: record.CurvesView, // 趋势分析(menu-1)
            Descr: record.Descr,
            DoPointE: record.DoPointE, // 故障诊断-测点异常处理(menu-2)
            FaultProcV: record.FaultProcV, // 故障诊断-浏览查询录入、故障诊断(menu-2)
            PopedomId: record.PopedomId,
            ReportView: record.ReportView, // 数据处理-报表(menu-2)
            StatView: record.StatView, // 统计分析(menu-1)
            StatusView: record.StatusView, // 状态监测(menu-1)
            Shadow: record.shadow,
            Text: record.Descr
          })
        })

        commit(RESET_ROLES_INFO, { info })
      }
    }
  },

  // update syste role info
  async UpdateRolesInfo ({ commit }, { info, params }) {
    if (info && params) {
      const result = await updateRoles(params)
      if (result.code === 200) {
        commit(RESET_ROLES_INFO, { info })
      }
      return result
    }
  },

  ResetRoles ({ commit }, { info }) {
    if (info) {
      commit(RESET_ROLES_INFO, { info })
    }
  }
}
