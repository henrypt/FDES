import {
  delUser,
  addUser,
  updateUser,
  decrypt
} from '@/api/index.js'

// import de from '~/static/lang/de.js'

// const UPDATE_USERS = 'UpdateUsers'
const UPDATE_DYNAMO_INFO = 'UpdateDynamoInfo'
const UPDATE_ROLE_INFO = 'UpdateRoleInfo'
const ADD_USER = 'AddUser'
const DELETE_USER = 'DeleteUser'

/*
  以下为动态数据：
    1 "游客"
    2 "普通用户"
    3 "高管"
    4 ""
    5 ""
    6 ""
    7 ""
    8 "运行工程师"
    11 "维修工程师"
    43 "系统工程师"
    44 "VIP用户"

  创建操作:
  <Root><add TableName=DOT_userinfoDOT_><Data><PopedomId>4</PopedomId><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><UserNm>test1</UserNm><Psw>8888</Psw></Data></add><add TableName=DOT_UserDynamoDOT_><Data><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo><PopedomId>1</PopedomId></Data></add><add TableName=DOT_UserDynamoDOT_><Data><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>20</Dynamo><PopedomId>2</PopedomId></Data></add></Root>

  删除操作-用户
  <Root><Modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId></LocateInfo><Data><MyFlag>0</MyFlag></Data></Modify></Root>

  修改机组：删除&添加
  <Root><Delete TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test2BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo></LocateInfo></Delete><modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test2BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>20</Dynamo></LocateInfo><Data><PopedomId>44</PopedomId></Data></modify></Root>

  修改角色
  <Root><modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo></LocateInfo><Data><PopedomId>2</PopedomId></Data></modify></Root>

  D:\FDES2021\fdes\api\pyconfig.js

  更新操作(机组添加、删除， 角色添加、删除):
  <Root><modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>111</UserId><Dynamo>19</Dynamo></LocateInfo><Data><PopedomId>3</PopedomId></Data></modify></Root>

  更新操作-删除指定机组:
  <Root><modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId></LocateInfo><Data><UserNm>test1</UserNm></Data></modify><modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo></LocateInfo><Data><PopedomId>2</PopedomId></Data></modify><Delete TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>20</Dynamo></LocateInfo></Delete></Root>

  更新操作-修改
  1、用户名
  <Root><modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId></LocateInfo><Data><UserNm>test1</UserNm></Data></modify></Root>
  ---------------------------
  <Root>
  <modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>test2021BJVAGRHTFUOTK0.10816284674215798</UserId></LocateInfo><Data><UserNm>test2021</UserNm></Data></modify>
  <modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test2021BJVAGRHTFUOTK0.10816284674215798</UserId><Dynamo>19</Dynamo></LocateInfo><Data><PopedomId>2</PopedomId></Data></modify>
  <add TableName=DOT_UserDynamoDOT_><Data><UserId>test2021BJVAGRHTFUOTK0.10816284674215798</UserId><Dynamo>20</Dynamo><PopedomId>2</PopedomId></Data></add>
  </Root>
  ---------------------------

  2、修改机组-角色
  <Root><modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo></LocateInfo><Data><PopedomId>2</PopedomId></Data></modify></Root>

  3、更新操作-删除机组
  <Root><Delete TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test2BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>20</Dynamo></LocateInfo></Delete></Root>

  4、删除一个，修改一个：
  <Root><modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId></LocateInfo><Data><UserNm>test1</UserNm></Data></modify><Delete TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo></LocateInfo></Delete><modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>20</Dynamo></LocateInfo><Data><PopedomId>44</PopedomId></Data></modify></Root>

  创建操作:
  <Root><add TableName=DOT_userinfoDOT_><Data><PopedomId>4</PopedomId><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><UserNm>test1</UserNm><Psw>8888</Psw></Data></add><add TableName=DOT_UserDynamoDOT_><Data><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo><PopedomId>1</PopedomId></Data></add><add TableName=DOT_UserDynamoDOT_><Data><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>20</Dynamo><PopedomId>2</PopedomId></Data></add></Root>
  ---------------------------
  <Root><add TableName=DOT_userinfoDOT_><Data><PopedomId>4</PopedomId><UserId>test2021BJVAGRHTFUOTK0.8071522238326679</UserId><UserNm>test2021</UserNm><Psw>8888</Psw></Data></add><add TableName=DOT_UserDynamoDOT_><Data><UserId>test2021BJVAGRHTFUOTK0.8071522238326679</UserId><Dynamo>19</Dynamo><PopedomId>2</PopedomId></Data></add></Root>
  ---------------------------

  删除操作-用户
  <Root><Modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId></LocateInfo><Data><MyFlag>0</MyFlag></Data></Modify></Root>
*/

// 取新、老选择的交集，比如 老[19] 新[19,20] => [20],   老[19,20] 新[19] => [-20], 根据结果数组里值的正、负确定是添加还是删除操作
const hArrayIntersection = (val, oldVal) => {
  if (val?.length < 1 || oldVal?.length < 1) { return [] }
  const _val = new Set([...val])
  const _oldVal = new Set([...oldVal])

  let arr = Array.from(_val.filter(x => !_oldVal.has(x)))
  if (arr?.length === 0) {
    arr = Array.from(_oldVal.filter(x => !_val.has(x)))
    return arr.map(n => n * -1)
  } else {
    return arr
  }
}

const hAddUser = (info) => {
  // 添加用户
  const userId = info.Userid
  const userName = info.Usernm
  const pwd = decrypt(info.pwd)
  const popedomId = info.popedomId
  const dynamoPopedom = info.dynamoPopedom
  const arrXML = []
  let params = null

  for (let i = 0, iLen = dynamoPopedom.length; i < iLen; i++) {
    const dy = dynamoPopedom[i]
    arrXML.push(
      `<add TableName=DOT_UserDynamoDOT_><Data><UserId>${userId}</UserId><Dynamo>${dy}</Dynamo><PopedomId>${popedomId}</PopedomId></Data></add>`
    )
  }

  params = {
    crud: 'create',
    xml:
    encodeURIComponent(
      '<Root>' +
      `<add TableName=DOT_userinfoDOT_><Data><PopedomId>${popedomId}</PopedomId><UserId>${userId}</UserId><UserNm>${userName}</UserNm><Psw>${pwd}</Psw></Data></add>` +
      `${arrXML.join('')}` +
      '</Root>')
  }

  return addUser(params)
}

// Update User Dynamo Info --- change Dynamo: delete old dynamo, modify new dynamo
const hUpdateDynamoInfo = (info, user) => {
  /*
    key: 'users/dys',
    info: { val, oldVal },
    user: self.user
  */
  const userId = user.Userid
  const popedomId = user.roles[0].id

  const dynamoPopedom = []

  const newArr = hArrayIntersection(info.val, info.oldVal)
  for (let i = 0, iLen = newArr.length; i < iLen; i++) {
    if (newArr[i] > 0) {
      dynamoPopedom.push(`<add TableName=DOT_UserDynamoDOT_><Data><UserId>${userId}</UserId><Dynamo>${newArr[i]}</Dynamo><PopedomId>${popedomId}</PopedomId></Data></add>`)
    } else {
      const dy = Math.abs(newArr[i])
      dynamoPopedom.push(`<Delete TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>${userId}</UserId><Dynamo>${dy}</Dynamo></LocateInfo></Delete>`)
    }
  }

  for (let j = 0, jLen = info?.val?.length; j < jLen; j++) {
    const dy = info.val[j]
    if (!newArr.includes(dy)) {
      dynamoPopedom.push(`<modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>${userId}</UserId><Dynamo>${dy}</Dynamo></LocateInfo><Data><PopedomId>${popedomId}</PopedomId></Data></modify>`)
    }
  }

  if (dynamoPopedom?.length > 0) {
    const params = {
      crud: 'update',
      xml: `<Root>${dynamoPopedom.join('')}</Root>`
    }

    // 修改用户(机组、角色) ../get/users.asp
    return updateUser(params)
  } else {
    return null
  }
}

// Update User Role Info
const hUpdateRoleInfo = (info, user) => {
  const userId = user.Userid
  const popedomId = info.popedomId

  const dynamoPopedom = []

  const arrDynamos = info.dynamos
  for (let i = 0, iLen = arrDynamos.length; i < iLen; i++) {
    const dy = arrDynamos[i]
    dynamoPopedom.push(`<modify TableName=DOT_UserDynamoDOT_><LocateInfo><UserId>${userId}</UserId><Dynamo>${dy}</Dynamo></LocateInfo><Data><PopedomId>${popedomId}</PopedomId></Data></modify>`)
  }

  /*
    Modify
    <Root>
      <modify TableName=DOT_UserDynamoDOT_>
        <LocateInfo><UserId>test1BJVAGRHTFUOTK0.17881510653689025</UserId><Dynamo>19</Dynamo></LocateInfo>
        <Data><PopedomId>2</PopedomId></Data>
      </modify>
    </Root>
  */

  if (userId && dynamoPopedom?.length > 0) {
    const params = {
      crud: 'update',
      xml: `<Root>${dynamoPopedom.join('')}</Root>`
      // xml: `<Root><modify TableName="userinfo"><LocateInfo><UserId>${userId}</UserId></LocateInfo><Data><UserNm>${userName}</UserNm></Data></modify>${dynamoPopedom}</Root>`
    }

    // 修改用户(机组、角色) ../get/users.asp
    return updateUser(params)
  } else {
    return null
  }
}

// Delte User
const hDeleteUser = (info) => {
  const userId = info.Userid
  if (!userId) {
    throw new Error('User Id has error!')
  } else {
    // <Root><Modify TableName="userinfo"><LocateInfo><UserId>dyw_henry</UserId></LocateInfo><Data><MyFlag>0</MyFlag></Data></Modify></Root>
    const params = {
      crud: 'delete',
      xml: `<Root><Modify TableName=DOT_userinfoDOT_><LocateInfo><UserId>${userId}</UserId></LocateInfo><Data><MyFlag>0</MyFlag></Data></Modify></Root>`
    }

    // 删除指定的用户ID ../get/users.asp
    return delUser(params)
  }
}

// 注意：token 暂时放在登录用户的Vuex的state里，如果项目要求非登录也可访问项目时，需要把token移回store/index.vue的根state里
export const state = () => ({
  info: null
})

// vuex 里的计算机属性, 相当于Vue里的computed
export const getters = {
  [ADD_USER] (state, { info }) {
    state.info.users.push(info)
  },
  [DELETE_USER] (state, id) {
    const users = state.info.users
    users.splice(
      users.findIndex(user => user.id === id),
      1
    )
  }
}

export const mutations = {
  [UPDATE_DYNAMO_INFO] (state, { info }) {

  },
  [UPDATE_ROLE_INFO] (state, { info }) {

  },
  [DELETE_USER] (state, { info }) {

  }
}

export const actions = {
  UpdateUsersInfo ({ commit }, { key, info, user }) {
    switch (key) {
      // 用户管理 页面， 在添加、删除用户时，更新 SYSTEM_INFO
      case 'users/add':
        commit(ADD_USER, { info })
        // 添加用户  ../get/users.asp
        // 需要重新加载所有用户信息
        return hAddUser(info)
        // return addUser(params)

      // 更新用户-机组，角色
      case 'users/dys':
        commit(UPDATE_DYNAMO_INFO, { info })
        return hUpdateDynamoInfo(info, user)

      case 'users/roles':
        commit(UPDATE_ROLE_INFO, { info, user })
        return hUpdateRoleInfo(info, user)

      // 删除用户
      case 'users/delete':
        commit(DELETE_USER, info.Userid)
        return hDeleteUser(info)
    }
  }
}
