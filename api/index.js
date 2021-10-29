/*
  包含n个接口请求函数的模块
  函数的返回值: promise对象
 */
// import axios from '@nuxtjs/axios' // '~/plugins/axios.js'
import CryptoJS from 'crypto-js'
// import qs from 'qs'
// import Vue from 'vue'
import config from './pyconfig.js'
import ajax from './ajax'

// const BASE_URL = 'http://localhost:4000'
const VIRTUAL_DIRECTORY = '/fdes_dyw'
const BASE_URL = `${config.ROOT}${VIRTUAL_DIRECTORY}`

export const reqDateTime = () => ajax(`${BASE_URL}/get/utf8/date.asp`, null, 'GET', 'text')

// 获取模板列表
export const reqModelList = types =>
  ajax(`${BASE_URL}/get/sea_getModelList.asp?types=${types}`)

// 获取指定模板ID的数据
export const reqModelDataById = modelId =>
  ajax(`${BASE_URL}/get/sea_getModelItem.asp?SetId=${modelId}`)

// 获取多台机型+机组+项目 的列表数据
export const reqTCategories = dynamoId =>
  ajax(
    `${BASE_URL}/get/mai_ISetTest-ansi.asp?t=GetTCategorys&Dynamo=${dynamoId}`
  )

// 获取指定机组+机型+分类项目ID 的 多台监测量数据
export const reqTsitmes = (dynamo, dType, catId) =>
  ajax(
    `${BASE_URL}/get/mai_ISetTest.asp?t=GetTestItemByCat&Dynamo=${dynamo}&DType=${dType}&CatID=${catId}`
  )

export const reqLanguages = () => ajax(BASE_URL + '/languages')

// get menu class 1 json data
export const reqMenuClass1 = lang =>
  ajax(`${BASE_URL}/menuClass1?lang=${lang}`)

// 加密-密.码 get/utf8/EnDecodeAuto.asp
// export const reqEnDecode = (params) =>
// ajax(`${BASE_URL}/get/utf8/EnDecodeAuto.asp`, params, 'POST').then(res=>{
//   return { code: 200, data: res }
// })

// 用户名密码登陆 (userid, password, dynamoId) === params, 'POST'
export const reqLogin = params =>
  ajax(`${BASE_URL}/get/utf8/login.asp`, params, 'POST').then((res) => {
    if (!res.httpcode) {
      return { code: 200, data: res.LoginInfo }
    } else {
      let r = ''
      switch (res.httpcode) {
        case '1': r = '重复登录'; break
        case '2': r = '密码错误'; break
        default: r = '---'
      }

      return { code: 403, data: r }
    }
  })

// 用户登出
export const reqLogout = id =>
  ajax(`${BASE_URL}/get/utf8/logout.asp?un=${id}`).then(
    (res) => {
      // return deleteTokenByRedis(id)
    }
  )

// 强制注销某个用户
export const reqLogoutKickOffline = params =>
  ajax(`${BASE_URL}/get/utf8/logoutKickOffline.asp`, params, 'POST', 'json').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 反馈意见导出
export const exportFeedback = () =>
  ajax(`${BASE_URL}/get/utf8/exportFeedback.asp`, null, 'POST', 'arraybuffer').then((res) => {
    return {
      code: 200,
      data: `${BASE_URL}/get/utf8/exportFeedback.asp` // res
    }
  })

// 获取设备信息
export const reqEquips = () =>
  ajax(`${BASE_URL}/get/utf8/getEquips.asp`, null).then((res) => {
    return {
      code: 200,
      data: res?.Data?.Station
    }
  })

// CRUD token in Redis
// 创建一个token, id和其对应的数据信息
export const createTokenByRedis = (loginInfo, tokenId, userInfo, dTypes) => {
  ajax(`${BASE_URL}/get/utf8/token.asp`, { type: 'delete', name: tokenId })

  const dynamo = userInfo.Dynamos.Dynamo
  const arrDynamo = []
  const _arr = dynamo.filter(d => dTypes.includes(parseInt(d._DType, 10)))

  let current = null

  _arr.forEach((d, index) => {
    // PopedomId
    const {
      AlarmView,
      BaseDataView,
      CanMngSys,
      CanOverhaul,
      CanQuery,
      CanRepair,
      CanRun,
      CanStatus,
      CanUpdate,
      CurvesView,
      Descr,
      DoPointE,
      FaultProcV,
      PopedomId,
      ReportView,
      StatView,
      StatusView,
      shadow,
      _DType,
      _ID,
      _Name,
      _ShortNM,
      _Status
    } = d

    if (parseInt(_ID, 10) === loginInfo.dynamoId) {
      current = d
    }

    arrDynamo.push(`{$AlarmView$:$${AlarmView}$,$BaseDataView$:$${BaseDataView}$,$CanMngSys$:$${CanMngSys}$,$CanOverhaul$:$${CanOverhaul}$,$CanQuery$:$${CanQuery}$,$CanRepair$:$${CanRepair}$,$CanRun$:$${CanRun}$,$CanStatus$:$${CanStatus}$,$CanUpdate$:$${CanUpdate}$,$CurvesView$:$${CurvesView}$,$Descr$:$${Descr}$,$Text$:$${Descr}$,$DoPointE$:$${DoPointE}$,$FaultProcV$:$${FaultProcV}$,$PopedomId$:$${PopedomId}$,$ReportView$:$${ReportView}$,$StatView$:$${StatView}$,$StatusView$:$${StatusView}$,$Shadow$:$${shadow}$,$DType$:$${_DType}$,$dynamoId$:$${_ID}$,$dynamoName$:$${_Name}$,$dynamoShortName$:$${_ShortNM}$,$dynamoStatus$:$${_Status}$}`)
  })

  // const _user = `{$id$:$${userInfo.User._ID}$,$loginId$:$${userInfo.User._LoginID}$,$name$:$${userInfo.User._Name}$,$dynamoId$:$${current._ID}$,$dynamoName$:$${current._Name}$,$dynamoShortName$:$${current._ShortNM}$,$roleName$:$${current.Descr}$}`
  const _user = `$id$:$${userInfo?.User._ID}$,$loginId$:$${userInfo?.User?._LoginID}$,$name$:$${userInfo?.User?._Name}$,$dynamoId$:$${current?._ID}$,$dynamoName$:$${current?._Name}$,$dynamoShortName$:$${current?._ShortNM}$,$roleName$:$${current?.Descr}$`
  const params = {
    type: 'create',
    name: tokenId,
    value: `{${_user},$dynamo$:[${arrDynamo.join()}]}`
  }

  return ajax(`${BASE_URL}/get/utf8/tokenAdd.asp`, params, 'POST', 'json').then((res) => {
    if (window) {
      window.console.log('get/utf8/tokenAdd.asp res = ', res, ', params = ', params)

      window.localStorage && window.localStorage.removeItem && window.localStorage.removeItem('tokenid')
      window.localStorage && window.localStorage.setItem && window.localStorage.setItem('tokenid', res)
      window.console.log('api>index.js createTokenByRedis - localStorage.setItem ', window.localStorage.getItem('tokenid'))
    }
  })
}

// 获取指定token信息
export const getTokenByRedis = (tokenId) => {
  return crudToken({
    type: 'read',
    name: tokenId
  })
}

// 更新指定token信息
export const updateTokenByRedis = (tokenId, data) => {
  return crudToken({
    type: 'update',
    name: tokenId,
    value: data
  })
}

// 删除指定的token信息
export const deleteTokenByRedis = (tokenId) => {
  return crudToken({
    type: 'delete',
    name: tokenId
  })
}

// 刷新token有效时间
export const expireTokenByRedis = (tokenId, time) => {
  return crudToken({
    type: 'expire', name: tokenId, time
  })
}

// 判断指定token id的是否存在[Redis数据库中]
export const checkExistentKey = (tokenId) => {
  return crudToken({
    type: 'haskey',
    name: tokenId
  })
}

export const crudToken = params =>
  ajax(`${BASE_URL}/get/utf8/token.asp`, params, 'POST', 'json').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

export const reqSystemInfo = () => {
  window.console && window.console.log('reqSystemInfo')
  return []
}

// 获取多台机型+机组+项目 的列表数据
export const reqFaultTree = (treeId, dynamoId) => {
  // ajax(
  //   `${BASE_URL}/get/QryFaultModeTree.asp?Treeid=${treeId}&dynamo=${dynamoId}`,
  //   {},
  //   'GET',
  //   'json'
  // )
  const sdata = {
    code: 200,
    data: {
      id: '125006',
      name: '定子铁芯铜屏蔽温度高',
      side: '0',
      Color: '0',
      children: [
        {
          id: '151001',
          name: '冷氢温度高',
          side: '1',
          Color: '0',
          children: [
            {
              id: '151007',
              name: '氢冷器水侧窝气',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151008',
              name: '氢冷器泄漏',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '171003',
                  name: '氢气露点温度GRV004MZ高',
                  side: '2',
                  Color: '0',
                  children: []
                },
                {
                  id: '171008',
                  name: '漏氢量大',
                  side: '2',
                  Color: '0',
                  children: []
                },
                {
                  id: '141007',
                  name: '机壳内积水',
                  side: '2',
                  Color: '0',
                  children: []
                },
                {
                  id: '171001',
                  name: '氢气压力GRV001／002MP低',
                  side: '2',
                  Color: '0',
                  children: []
                }
              ]
            },
            {
              id: '171029',
              name: '氢冷器冷却效能低或通风系统异常',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '151005',
                  name: '氢气冷却器冷却效能低',
                  side: '0',
                  Color: '0',
                  children: [
                    {
                      id: '151006',
                      name: '氢冷器堵塞故障',
                      side: '1',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '171025',
                      name: '氢冷器外表脏污、损伤',
                      side: '1',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '171028',
                  name: '发电机通风冷却系统异常',
                  side: '0',
                  Color: '0',
                  children: [
                    {
                      id: '171026',
                      name: '冷、热氢短路',
                      side: '1',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '151013',
                  name: '冷热氢温差小',
                  side: '2',
                  Color: '0',
                  children: []
                }
              ]
            },
            {
              id: '151003',
              name: '氢冷器冷却水流量低',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '171024',
                  name: '氢气温度控制阀GRH001VD故障',
                  side: '1',
                  Color: '0',
                  children: []
                },
                {
                  id: '151019',
                  name: '氢冷器冷却水系统泄漏',
                  side: '1',
                  Color: '0',
                  children: [
                    {
                      id: '151021',
                      name: '氢冷器疏水阀关闭不严',
                      side: '0',
                      Color: '0',
                      children: []
                    },
                    {
                      id: '151020',
                      name: '氢冷器冷却水系统管路泄漏',
                      side: '0',
                      Color: '0',
                      children: []
                    }
                  ]
                },
                {
                  id: '151018',
                  name: '氢冷器及其冷却水系统中某些阀门开度异常',
                  side: '1',
                  Color: '0',
                  children: []
                },
                {
                  id: '162011',
                  name: '闭路水总流量SRI001MD低',
                  side: '1',
                  Color: '0',
                  children: []
                }
              ]
            },
            {
              id: '151004',
              name: '氢冷器冷却水入口温度高',
              side: '1',
              Color: '0',
              children: [
                {
                  id: '162008',
                  name: '闭路水供水温度SRI001MT高',
                  side: '1',
                  Color: '0',
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: '125001',
          name: '定子铁芯铜屏蔽松动',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '125002',
          name: '定子铁芯铜屏蔽通风不良',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '171001',
          name: '氢气压力GRV001／002MP低',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '114023',
          name: '发电机过负荷',
          side: '1',
          Color: '0',
          children: []
        },
        {
          id: '151002',
          name: '热氢温度高',
          side: '2',
          Color: '0',
          children: []
        },
        {
          id: '151014',
          name: '冷热氢温差大',
          side: '2',
          Color: '0',
          children: []
        }
      ]
    }
  }

  return Sleep(sdata)
}

export const reqFaultMode = (treeId, dynamoId) => {
  const sdata = {
    code: 200,
    data: {
      id: '125006',
      name: '定子绕组',
      side: '0',
      Color: '0',
      children: [
        {
          id: '151001',
          name: '绕组槽部',
          side: '1',
          Color: '0',
          children: [
            {
              id: '151077',
              name: '定子线棒堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151078',
              name: '定子线棒空心导线渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151079',
              name: '定子线棒股线断裂',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151080',
              name: '定子线棒股间短路',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151081',
              name: '定子线棒槽部振动大',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151082',
              name: '定子线棒槽问振动火花放电',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151083',
              name: '定子线棒槽部绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151084',
              name: '定子线棒槽楔松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151085',
              name: '定子线棒绝缘内部分层及损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '151086',
              name: '定子线棒空心导线堵塞',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151002',
          name: '绕组端部',
          side: '1',
          Color: '0',
          children: [
            {
              id: '161001',
              name: '定子线棒出槽口处防晕层损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161002',
              name: '定子线棒出槽口处绝缘局部损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161003',
              name: '定子线棒水电接头渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161004',
              name: '定子线棒接头接触不良或部分开焊',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161005',
              name: '水电接头手包绝缘不良',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161006',
              name: '绝缘引水管（包括接头）渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161007',
              name: '绝缘引水管堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161008',
              name: '定子水总进、出口水管渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161009',
              name: '定子绕组端部振动大',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '161010',
              name: '定子绕组端部绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151003',
          name: '引出线',
          side: '1',
          Color: '0',
          children: [
            {
              id: '171001',
              name: '引出线出水温度',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171001',
              name: '引出线水路堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171002',
              name: '引出线水路窝气',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171003',
              name: '套管内冷水渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171004',
              name: '引出线水路渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171005',
              name: '主引线（过渡引线）渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171006',
              name: '套管绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171007',
              name: '主引线（过渡引线）绝缘损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171008',
              name: '相环、过渡引线水电接头及软连接接头不良或部分开焊故障',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '171009',
              name: '套管漏氢',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151004',
          name: '绕组其它',
          side: '1',
          Color: '0',
          children: [
            {
              id: '181001',
              name: '定子线棒温度高',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181002',
              name: '整个分支过热',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181003',
              name: '整相绕组过热',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181004',
              name: '定子线棒水路堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181005',
              name: '定子内冷水路渗漏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181006',
              name: '定子绕组绝缘受潮',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '181007',
              name: '浸渍不良故障',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151005',
          name: '定子铁芯槽部',
          side: '1',
          Color: '0',
          children: [
            {
              id: '191001',
              name: '定子铁芯松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '191002',
              name: '定子铁芯绝缘局部损坏',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '191003',
              name: '定子铁芯径向通风槽堵塞',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '191004',
              name: '定子铁芯温度高',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151006',
          name: '定子铁芯阶梯段',
          side: '1',
          Color: '0',
          children: [
            {
              id: '211001',
              name: '定子铁芯阶梯段齿部通风槽堵塞',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151007',
          name: '定子铁芯压指',
          side: '1',
          Color: '0',
          children: [
            {
              id: '221001',
              name: '定子铁芯压指松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '221002',
              name: '定子铁芯压指通风不良',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151008',
          name: '定子铁芯压圈',
          side: '1',
          Color: '0',
          children: [
            {
              id: '251010',
              name: '定子铁芯压圈松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '251011',
              name: '定子铁芯压圈通风不良',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151009',
          name: '定子端部屏蔽环',
          side: '1',
          Color: '0',
          children: [
            {
              id: '231002',
              name: '定子铁芯铜屏蔽松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '231003',
              name: '定子铁芯铜屏蔽通风不良',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '231004',
              name: '定子铁芯铜屏蔽温度高',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        },
        {
          id: '151010',
          name: '铁芯其它',
          side: '1',
          Color: '0',
          children: [
            {
              id: '241001',
              name: '定子铁芯两端压圈、定位筋锁紧螺母等结构件松动',
              side: '1',
              Color: '0',
              children: []
            },
            {
              id: '241001',
              name: '定子铁芯刚性支撑结构松动',
              side: '1',
              Color: '0',
              children: []
            }
          ]
        }
      ]
    }
  }

  return Sleep(sdata)
}

// 获取故障诊断信息
//  faultpos: 原发部位 (Default: -1)
//  TheKind: 设备异常-种类 (Default: 0 待处理)
//  TheAttri: 设备异常-属性 (Default: -1)
//  TheGrade: 设备异常-级别 (Default: -1)
//  OrderType: 1、2、3、4 升序、降序 (Default: 4)
//  The Queren: 确认 (Default: 0)
//  StartDate、EndDate
//  type = Queren * 10000 + TheKind + 1
export const reqWholeFault = (
  dynamo = -1,
  part = -1,
  type = 0,
  attr = 2,
  grade = -1,
  sdate,
  edate,
  queren = 0,
  orderType = 4
) =>
  ajax(
    `${BASE_URL}/get/sea_getWholeFault_new.asp?Dynamo=${dynamo}&TheKind=${
      parseInt(queren, 10) * 10000 + parseInt(type) + 1
    }&faultpos=${part}&OrderType=${orderType}&TheAttri=${attr}&theGrade=${grade}&StartDate=${sdate}&EndDate=${edate}`
  )

// 获取指定故障Id的故障数据
export const reqFaultData = faultId =>
  ajax(`${BASE_URL}/get/sea_faultinfoxml.asp?id=${faultId}`)

// 故障浏览 - 获取当前故障对应的 趋势比较 相关的时间等信息 返回信息类似于: 7053,2021-01-23 11:34:28
export const reqRelateTsitmid = faultId =>
  ajax(`${BASE_URL}/get/sea_GetRelateTsitmid.asp?FaultID=${faultId}`)

// 故障浏览 - 获取当前故障对应的 横向比较 相关的时间等信息 返回信息类似于: 1,9,2021-01-23 11:34:28
export const reqRelateTag = faultId =>
  ajax(`${BASE_URL}/get/sea_GetRelateTag.asp?FaultID=${faultId}`)

// 系统 & 趋势图 采样周期
export const readConfigure = () => ajax(`${BASE_URL}/get/utf8/configure.asp`, { crud: 'read' }, 'POST', 'json')
export const updateConfigure = params =>
  ajax(`${BASE_URL}/get/utf8/configure.asp`, params, 'POST').then((res) => {
    if (res) {
      return {
        code: 200,
        data: res
      }
    } else {
      return {
        code: 500,
        data: null
      }
    }
  })

// 日志
export const readLog = params => ajax(`${BASE_URL}/get/utf8/log.asp`, params, 'POST', 'xml')

export const reqRoles = () =>
  ajax(`${BASE_URL}/get/utf8/getRoles.asp`, { n: Math.random() }).then((res) => {
    return {
      code: 200,
      data: res.Degree
    }
  })

// 修改角色
export const updateRoles = params =>
  ajax(`${BASE_URL}/get/utf8/setRoles.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 根据会话获取用户信息
export const reqUserInfo = () => {
  // 静态模拟数据
  const data = {
    code: 200,
    data: {
      id: 1,
      name: '访客',
      pwd: '8888',
      dynamos: [19, 20],
      roles: { text: '普通用户', value: 1 }
    }
  }
  return Sleep(data)
}

export const isValidDynamoType = (dt, dy) => {}

export const isValidStation = (st) => {}

export const isValidDynamoByStaionID = (sid, dy) => {}

export const isValidEquipType = (ets) => {}

export const getStationIDByDynamo = (dy, fn) => {}

export const getDynamoTypeByDynamoID = (dy) => {}

export const getETypeIDByDynamoID = (dy) => {}

export const getSysStatusByDynamoID = (dy) => {}

export const reqOnlineUsers = () => ajax(`${BASE_URL}/get/utf8/getOnlineUsers.asp`, null, 'POST', 'xml')

export const reqUsers = () =>
  ajax(`${BASE_URL}/get/utf8/getUsers.asp`).then((res) => {
    return {
      code: 200,
      data: res?.User || null
    }
  })

// 删除指定的用户ID
export const delUser = params =>
  ajax(`${BASE_URL}/get/utf8/users.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 添加用户
export const addUser = params =>
  ajax(`${BASE_URL}/get/utf8/users.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 修改用户(机组、角色)
export const updateUser = params =>
  ajax(`${BASE_URL}/get/utf8/users.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

export const getRolesXml = () =>
  ajax(`${BASE_URL}/get/utf8/getRoles.asp`).then((res) => {
    return {
      code: 200,
      data: res.Degree
    }
  })

export const dynamoStatus = params =>
  ajax(`${BASE_URL}/get/utf8/dynamoStatus.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 读取模板们
export const readModels = params =>
  ajax(`${BASE_URL}/get/utf8/model.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 更新指定的模板 公用: 1,  私用: 0
export const updateModel = params =>
  ajax(`${BASE_URL}/get/utf8/model.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 删除指定模板
export const deleteModel = params =>
  ajax(`${BASE_URL}/get/utf8/model.asp`, params, 'POST', 'text').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

export const getDynamoName = (dy) => {}
export const getStationName = (sid) => {}

export const getSid = (dy) => {}

// tail = tail ? this.$store.state.stationInfo.tail : ''
export const getSName = (dy, tail) => {
  const SName = ''
  return SName + tail
}
/*
export const getDynamoId = (dy) => {}
*/
export const getFdesUserId = () => {
  // top.CURRENT_FDESUSERID = Session('fdesuserid')
}

export const getCurrentUserOnlineStatus = () =>
  ajax(`${BASE_URL}/get/utf8/getLoginUsers.asp`)

export const makeUpperNumbers = (num) => {
  const UpperNumbers = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十'
  ]
  const tempArr = (num + '').split('') || []
  switch (parseInt(num, 10)) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return UpperNumbers[num - 1]
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      return UpperNumbers[9] + UpperNumbers[tempArr[1] - 1]
    case 100:
      return '一百'
    default:
      return (
        UpperNumbers[tempArr[0] - 1] +
        UpperNumbers[9] +
        UpperNumbers[tempArr[1] - 1]
      )
  }
}

export const rCheck = () => ajax(`${BASE_URL}/get/utf8/rCheck.asp`)

// 获取模板列表
// export const updateFaultItemDescr = (params) =>
//   ajax(
//     `${BASE_URL}/get/utf8/updateItemDescr.asp?CurID=${params.curId}&ItemType=${
//       params.itemType
//     }&ItemID=${params.itemId}&NewDescr=${window.encodeURIComponent(
//       params.newDescr
//     )}`
//   )
export const updateFaultItemDescr = params =>
  ajax(`${BASE_URL}/get/utf8/updateItemDescr.asp`, params, 'POST')

/*
  POST: /get/sea_get_dealWiths.asp?
  Faultid=33947&
  Dealid=3892&
  dealInfo=123
  <FaultInfo>
    <Dynamo>84</Dynamo>
    <xianzs />
    <conclusions />
    <dealwiths />
    <descr>2020-12-05 09:02 实时匹配</descr>
    <strFault>33947</strFault>
    <faultid>33947</faultid>
    <validate>0100001</validate>
    <dialogs />
    <original>0</original>
  </FaultInfo>
*/
export const updateDealAdditionInfo = params =>
  ajax(`${BASE_URL}/get/utf8/updateDealAdditionInfo.asp`, params, 'POST')
/*
<?xml version="1.0" encoding="gb2312"?>
<FaultInfo>
  <Dynamo>84</Dynamo>
  <xianzs></xianzs>
  <conclusions></conclusions>
  <dealwiths></dealwiths>
  <descr>2020-10-29 16:09 实时匹配----- 2020-10-29 16:10 实时匹配</descr>
  <strFault>33835</strFault>
  <faultid>33835</faultid>
  <validate>0000010</validate>
  <dialogs></dialogs>
  <original>0</original>
</FaultInfo>
*/

// proccess fault operation, such as: next(step), previous(step), ignore, finish, transform, rollback
// params: {
//   id: xxx,
//   reason: 'xxxx',
//   work: 'next',
// }
export const faultOperation = params =>
  ajax(`${BASE_URL}/get/utf8/fault.asp`, params, 'POST')

export const updateFaultConfirm = params =>
  ajax(`${BASE_URL}/get/utf8/confirm2.asp`, params, 'POST')

// 录入选项-create
export const createEntryOption = params =>
  ajax(`${BASE_URL}/get/utf8/entryOption.asp`, params, 'POST', 'text').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 录入选项-read
export const readEntryOption = params =>
  ajax(`${BASE_URL}/get/utf8/entryOption.asp`, params, 'POST').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 录入选项-update
export const updateEntryOption = params =>
  ajax(`${BASE_URL}/get/utf8/entryOption.asp`, params, 'POST', 'text').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 录入选项-delete
export const deleteEntryOption = params =>
  ajax(`${BASE_URL}/get/utf8/entryOption.asp`, params, 'POST', 'text').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 录入选项-sort
export const sortEntryOption = params =>
  ajax(`${BASE_URL}/get/utf8/entryOption.asp`, params, 'POST', 'text').then((res) => {
    return {
      code: 200,
      data: res
    }
  })

// 监测量-crud
//  监测量-update  { "create":"update", "batch": 1, "xml": "<modify>...</modify>"}  batch: 批量修改
// export const crudAmount = (params) => {
//   const { crud } = params
//   let _params = ''
//   switch (crud) {
//     case 'read':
//       _params = ['POST', 'xml']
//       break
//     default:
//       _params = ['POST', 'text', 'text']
//   }
//   window.console.log(_params)
//   ajax(`${BASE_URL}/get/utf8/amount.asp`, params, 'POST', 'xml').then((data) => {
//     debugger
//     return { code: 200, data }
//   })
// }

export const crudAmount = params =>
  ajax(`${BASE_URL}/get/utf8/amount.asp`, params, 'POST', 'xml')
    .then((data) => {
      return { code: 200, data }
    })

// 机型监测量名称-update { "create":"update", "batch": 1, "xml": "<modify>...</modify>"}  batch: 批量修改
export const crudDTypeTagRItem = (params) => { // , type, format, responseType
  const { crud } = params
  let _params = ''
  switch (crud) {
    default:
      _params = ['POST', 'json', 'text']
  }
  return ajax(`${BASE_URL}/get/utf8/dTypeTagRItem.asp`, params, ..._params).then((data) => {
    return { code: 200, data }
  })
}

function Sleep (data, time = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, time)
  })
}

/**
 * AES块加密
 * mode:
 *   AES分为几种模式，比如ECB，CBC，CFB等等，这些模式除了ECB由于没有使用IV而不太安全，其他模式差别并没有太明显，大部分的区别在IV和KEY来计算密文的方法略有区别。具体可参考WIKI的说明。
 * padding:
 *   AES块加密说过，PADDING是用来填充最后一块使得变成一整块，所以对于加密解密两端需要使用同一的PADDING模式，大部分PADDING模式为PKCS5, PKCS7, NOPADDING。
 * 加密解密端
 * 所以，在设计AES加密的时候
 * - 对于加密端，应该包括：加密秘钥长度，秘钥，IV值，加密模式，PADDING方式。
 * - 对于解密端，应该包括：解密秘钥长度，秘钥，IV值，解密模式，PADDING方式。
 */
const KEY = '46cc793c53dc451b'
const IV = '15101510340'
export const encrypt = (word) => {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
/**
 * AES块解密
 */
export const decrypt = (word) => {
  const key = CryptoJS.enc.Utf8.parse(KEY)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
