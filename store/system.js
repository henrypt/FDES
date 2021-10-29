// import Cookies from 'js-cookie'
/*
  creator: peng tao
  system.js 只缓存系统级信息---系统固化的数据信息，比如：系统名称
*/
import {
  reqSystemInfo,
  reqEquips,
  reqUsers,
  getRolesXml
} from '@/api/index.js'

const SET_SYSTEM_INFO = 'SetSystemInfo'
const INIT_SYSTEM_INFO = 'initSystemInfo'

const STATION_INFO = {
  // 默认值
  dynamo: 19,
  // transfGroup: {
  //   id: 'DYW'
  // },
  // DynamoType
  transfGroupIds: [
    'DYWD1', // D1发电机
    'DYWD2', // D2发电机

    'DYWL1', // L1发电机
    'DYWL2', // L2发电机
    'DYWL3', // L3发电机
    'DYWL4', // L4发电机

    'NDHD1', // 宁德一号机
    'NDHD2', // 宁德二号机
    'NDHD3', // 宁德三号机
    'NDHD4' // 宁德四号机
  ],
  types: {
    ids: [100, 101, 102], // , 1022
    name: null,
    class: {
      A: [100, 101],
      B: [102]
      // C: [1022]
    },
    default: 100
  },
  text: {
    default: '---'
  },
  tail: 'GRH',
  user: {
    default: 'guest',
    pwd: 8888
  },
  ids: [100, 101, 102], // , 'DYW', 'LA1', 'LA2' "NDHD"
  //                              项目ID
  // 发电机工况         0    00      0     绕组温度
  // 上层线棒出水温度   0    00      1     绕组温度
  // 线棒层间温度       0    00      2     绕组温度
  // 下层线棒出水温度   0    00      3     绕组温度
  // 引出线出水温度     0    00      5     绕组温度
  // 铁芯温度           2   2       6     定子铁芯
  // 氢冷器             5   5       7     氢冷器、空冷器
  // 氢气密封油         5   51      8     密封油系统GHE
  // 转子及轴承         7   70      9     转子匝间
  // 励磁机             5   53     10     氢冷器、空冷器
  // 主系统及厂用电                 12     轴电压
  // 定子冷却水         5   50      13    定子水系统GST
  // 局放放电           5   54      19    局放
  // 定子绕组端部振动   8           30     端部振动
  // 转子匝间短路       7   70      72    转子匝间
  // 轴系振动           7   71     104    轴系振动
  // 报警卡                        105
  page: {
    tage: [
      { name: '定子绕组温度', index: 0 },
      { name: '同型测点', index: 1 },
      { name: '铁心温度', index: 2 },
      { name: '水电连接', index: 3 },
      { name: '进相运行', index: 4 },
      { name: '其他', index: 5 },
      { name: '运行巡检', index: 6 },
      { name: '转子绕组', index: 7 },
      { name: '在线监测', index: 8 },
      { name: '报警卡', index: 9 }
    ]
  }
}

// *** 此处的内容 后期  最好 动态从服务器读取
const SYSTEM_INFO = {
  name: '发电机智能监测及故障诊断系统',
  enname: 'Generator intelligence monitoring and fault dragnosis expert system',
  sname: 'FDES',
  dynamo: {
    id: STATION_INFO.dynamo
  },
  route: {
    welcome: '/welcome',
    home: '/ztjc/ztzs'
  },
  logoInfo: {
    to: '/',
    img: '/v.png'
  },
  stations: null, // all stations in this system
  users: null, // all users in this system
  roles: null, // all roles in this system
  user: STATION_INFO.user,
  overtime: 1 // 设置用户登录超时时间（默认20分钟）
}

const loopDynamos = (p, data, leaf = 'Dynamo') => {
  data.forEach((data) => {
    for (const i in data) {
      if (i === leaf) {
        // arr.push(data[i])
        if (data[i]._ID) {
          p.children.push(data[i])
        }
      }
      if (i === 'TransfGroup') {
        loopDynamos(p, data[i], leaf)
      }
    }
  })
}

const hStations = (data) => {
  const items = []
  const itemsStaionInfo = data?.filter((itm, idx) => {
    return STATION_INFO.ids.includes(itm._ID)
  })

  // itemsStaionInfo
  itemsStaionInfo.forEach((station, idx) => {
    // const transfGroupInfo = station.TransfGroup.filter((item) => {
    //   return STATION_INFO.transfGroupIds.includes(item._ID)
    // })

    const p = {
      id: idx,
      name: station._Name,
      shortName: station._ID,
      selected: false,
      subAttr: station._SubAttr,
      children: []
    }
    loopDynamos(p, station.TransfGroup)
    items.push(p)
    // 系统拥有的机组
    // transfGroupInfo.map((item) => {
    //   debugger
    //   for (const v in item) {
    //     // v === 'Dynamo' => leaf
    //     if (v === 'Dynamo') {
    //       window.console.log(item[v])
    //     } else {
    //       // 递归
    //       if (typeof v === 'object') {

    //       }
    //     }
    //   }
    // })

    // transfGroupInfo.forEach((transfGroup) => {
    //   const dynamoInfo = transfGroup.Dynamo || null

    //   if (dynamoInfo && dynamoInfo._ID !== '') {
    //     p.children.push({
    //       id: dynamoInfo._ID,
    //       name: dynamoInfo.Descr,
    //       shortName: dynamoInfo.ShortNM,
    //       disabled: false,
    //       selected: false,
    //       dynamoType: dynamoInfo.DynamoType,
    //       eTypeId: dynamoInfo.ETypeID,
    //       eTypeName: dynamoInfo.ETypeName,
    //       stationId: dynamoInfo.StationID,
    //       status: dynamoInfo.Status,
    //       orgNo: dynamoInfo.OrgNo,
    //       transfGroup: {
    //         id: transfGroup._ID,
    //         name: transfGroup._Name,
    //         subAttr: transfGroup._SubAttr
    //       },
    //       partOrgNo: dynamoInfo.PartOrgNo.PlateItem || []
    //     })
    //   }
    // })

    // items.push(p)
  })

  return items
}

const hUsers = (data) => {
  const items = []
  data?.Record?.forEach((record, idx1) => {
    const p = {
      id: record.Userid,
      name: record.Usernm,
      descr: record.Descr,
      dynamos: [],
      roles: []
    }

    const arrDynamos =
      record.Dynamos && record.Dynamos.length > 0
        ? record.Dynamos
        : [record.Dynamos]

    arrDynamos.forEach((dynamo, idx2) => {
      if (STATION_INFO.types.ids.includes(parseInt(dynamo.DynamoType, 10))) {
        p.dynamos.push({
          id: dynamo.DynamoID,
          name: dynamo.DynamoDesc,
          shortName: null,
          disabled: false,
          selected: false,
          dynamoType: dynamo.DynamoType,
          popedom: {
            id: dynamo.popedomID,
            desc: dynamo.PopedomDesc
          }
        })

        p.roles.push({
          text: dynamo.PopedomDesc,
          value: dynamo.PopedomID,
          dynamoId: dynamo.DynamoID
        })
      }
    })

    items.push(p)
  })

  return items
}

const hRoles = (data) => {
  const items = []

  data?.Record?.forEach((record) => {
    items.push({
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
  return items
}

export const state = () => ({
  info: SYSTEM_INFO // stations, users, roles
})

export const getters = {
  getSystemInfo: (state, getters) => {
    return SYSTEM_INFO
  },

  getStationInfo: state => () => {
    return STATION_INFO
  },

  hasDynamoType: state => (dtype) => {
    return STATION_INFO.ids.includes(Number(dtype))
  },

  getDynamoInfo: state => (dynamoId) => {
    const r = null
    const dyId = dynamoId || STATION_INFO.dynamo

    state.info &&
      state.info.stations.map(item =>
        item.children.filter((c) => {
          return parseInt(c.id, 10) === dyId && r === null
        })
      )
    return r
  },

  hasUser: state => (userId) => {
    if (SYSTEM_INFO && SYSTEM_INFO.users) {
      const r = SYSTEM_INFO.users.forEach((user) => {
        if (user && user.id) {
          return user.id.toString().includes(userId + 'BJVAG')
        }
      })
      return typeof r !== 'undefined'
    } else {
      return false
    }
  }
}

export const mutations = {
  [SET_SYSTEM_INFO] (state, { info }) {
    state.info = info
  },
  [INIT_SYSTEM_INFO] (state, info) {
    let items = null
    // window.console.log('store/system.js -> INIT_SYSTEM_INFO ', info.type)
    switch (info.type) {
      case 'stations':
        items = hStations(info.data)
        if (items.system) {
          info = items.system
        }
        break
      case 'users':
        items = hUsers(info.data)
        break
      case 'roles':
        items = hRoles(info.data)
        break
    }

    if (items) {
      SYSTEM_INFO[info.type] = items
    }
  }
}

export const actions = {
  async GetSystemInfo2 ({ commit, state }) {
    const result = await reqSystemInfo()
    if (result.code === 200) {
      const info = result.data
      commit(SET_SYSTEM_INFO, { info })
    }
  },
  async SetSystemInfo ({ commit, state }) {
    let system = null

    if (
      window.sessionStorage.getItem('loginedInState') &&
      JSON.parse(
        window.sessionStorage.getItem('loginedInState').toLowerCase()
      ) &&
      window.sessionStorage &&
      window.sessionStorage.getItem(SYSTEM_INFO.sname)
    ) {
      system = JSON.parse(window.sessionStorage.getItem(SYSTEM_INFO.sname)).system.info
    } else {
      system = null
    }

    // sessionStorage
    if (system) {
      commit(SET_SYSTEM_INFO, { info: system })
    } else if (state.systemInfo) {
      commit(SET_SYSTEM_INFO, { info: state.systemInfo })
    } else {
      // ajax
      const result = await reqSystemInfo(state)
      if (result.code === 200) {
        const info = result.data
        commit(SET_SYSTEM_INFO, { info })
      }
    }
  },

  async initSystems ({ commit, state }) {
    const r1 = await reqEquips()
    const r2 = await reqUsers()
    const r3 = await getRolesXml()

    Promise.all([r1, r2, r3]).then((res) => {
      if (res[0].code === 200 && res[1].code === 200 && res[2].code === 200) {
        commit(INIT_SYSTEM_INFO, { data: res[0].data, type: 'stations' })
        commit(INIT_SYSTEM_INFO, { data: res[1].data, type: 'users' })
        commit(INIT_SYSTEM_INFO, { data: res[2].data, type: 'roles' })

        SYSTEM_INFO && commit(SET_SYSTEM_INFO, { info: SYSTEM_INFO })
      }
    })

    // const result = await reqEquips()
    // if (result.code === 200) {
    //   const stationData = result.data
    //   commit(INIT_SYSTEM_INFO, { data: stationData, type: 'stations' })
    // }

    // const result1 = await reqUsers()
    // if (result1.code === 200) {
    //   const stationData = result1.data
    //   commit(INIT_SYSTEM_INFO, { data: stationData, type: 'users' })
    // }

    // const result2 = await getRolesXml()
    // if (result2.code === 200) {
    //   const stationData = result2.data
    //   commit(INIT_SYSTEM_INFO, { data: stationData, type: 'roles' })
    // }

    // if (result && result1 && result2) {
    //   if (SYSTEM_INFO) {
    //     commit(SET_SYSTEM_INFO, { info: SYSTEM_INFO })
    //   }
    // }
  }

}
/*
function Get() {
  // return setTimeout(()=>{
  const info = {
    code: 200,
    data: [
      {
        id: '1',
        name: 'ZhuangTaiJianCe',
        key: 'ztjc',
        desc: '状态监测',
        disabled: false,
        to: '/ZhuangTaiJianCe',
        active: true,
        icon: 'home',
        subMenu: [
          {
            id: '1.1',
            name: 'ZhuangTaiZhanShi',
            desc: '状态展示',
            disabled: false,
            icon: './images/ZhuangTaiJianCe/ZhuangTaiZhanShi.png',
            to: '/ZhuangTaiJianCe/ZhuangTaiZhanShi',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.2',
            name: 'DingZiRaoZuWenDu',
            desc: '定子绕组温度',
            disabled: false,
            icon: './images/ZhuangTaiJianCe/DingZiRaoZuWenDu.png',
            to: '/ZhuangTaiJianCe/DingZiRaoZuWenDu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.3',
            name: 'TongXingCeDian',
            desc: '同型测点',
            disabled: true,
            icon: './images/ZhuangTaiJianCe/TongXingCeDian.png',
            to: '/ZhuangTaiJianCe/TongXingCeDian',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.4',
            name: 'WenDuFenBuShiYiTu',
            desc: '温度分部示意图',
            disabled: false,
            icon: './images/ZhuangTaiJianCe/WenDuFenBuShiYiTu.png',
            to: '/ZhuangTaiJianCe/WenDuFenBuShiYiTu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.5',
            name: 'ShuiDianLianJie',
            desc: '水电连接',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/ShuiDianLianJie.png',
            to: '/ZhuangTaiJianCe/ShuiDianLianJie',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.6',
            name: 'TieXinWenDu',
            desc: '铁芯温度',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/TieXinWenDu.png',
            to: '/ZhuangTaiJianCe/TieXinWenDu',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.7',
            name: 'JinXiangYunXing',
            desc: '进相运行',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/JinXiangYunXing.png',
            to: '/ZhuangTaiJianCe/JinXiangYunXing',
            type: 'ZhuangTaiJianCe'
          },
          {
            id: '1.8',
            name: 'QiTaCanShu',
            desc: '其它参数',
            disabled: false,
            icon: './images/3D/ZhuangTaiJianCe/QiTaCanShu.png',
            to: '/ZhuangTaiJianCe/QiTaCanShu',
            type: 'ZhuangTaiJianCe'
          }
        ]
      },
      {
        id: '2',
        name: 'QuShiFenXi',
        key: 'qsfx',
        desc: '趋势分析',
        disabled: false,
        to: '/QuShiFenXi',
        active: true,
        icon: 'folder',
        subMenu: [
          {
            id: '2.1',
            name: 'FaZhan',
            desc: '发展趋势',
            disabled: false,
            icon: './images/QuShiFenXi/FaZhan.png',
            to: '/QuShiFenXi/FaZhan',
            type: 'QuShiFenXi'
          },
          {
            id: '2.2',
            name: 'TongXingBiJiao',
            desc: '同形比较',
            disabled: false,
            icon: './images/QuShiFenXi/TongXingBiJiao.png',
            to: '/QuShiFenXi/TongXingBiJiao',
            type: 'QuShiFenXi'
          }
        ]
      },
      {
        id: '7',
        name: 'ZhuangTaiJianCe',
        key: 'xtsz',
        desc: '系统设置',
        disabled: true,
        to: '/XiTongSheZhi',
        active: true,
        icon: 'settings',
        subMenu: [
          {
            id: '7.1',
            name: 'YongHuGuanLi',
            desc: '用户管理',
            disabled: false,
            icon: './images/XiTongSheZhi/YongHuGuanLi.png',
            to: '/XiTongSheZhi/YongHuGuanLi',
            type: 'XiTongSheZhi'
          },
          {
            id: '7.2',
            name: 'JueSheGuanLi',
            desc: '角色管理',
            disabled: false,
            icon: './images/XiTongSheZhi/JueSheGuanLi.png',
            to: '/XiTongSheZhi/JueSheGuanLi',
            type: 'XiTongSheZhi'
          }
        ]
      }
    ]
  }
  return info
  // },10000)
}
*/
