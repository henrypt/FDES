export const state = () => ({
  info: null,
  // 报警卡
  alarmCard: [
    { color: '#f6bf99', title: '注意' },
    { color: '#f00', title: '严重' },
    { color: '#ff8000', title: '异常' },
    { color: '#fc0', title: '注意' },
    { color: '#ced0d4', title: '一般' },
    { color: '#0f0', title: '正常' },
    { color: '#ccc', title: '被手工屏蔽' },
    { color: '#ffaf32', title: '上下线校验错误' },
    { color: '#ffaf32', title: '实测值小于计算值错误' },
    { color: '#ffaf32', title: '计算条件不满足，停止计算' },
    { color: '#0f0', title: '正常' }
  ],
  // 故障级别 颜色、标题（提示信息）
  grade: [
    { color: '#000', title: '' },
    { color: '#ff0', title: '1级报警' },
    { color: '#ff8000', title: '2级报警' },
    { color: '#fc0', title: '3级报警' },
    { color: '#cbd0d4', title: '4级报警' },
    { color: '#0f0', title: '正常' },
    { color: '#ccc', title: '被手工屏蔽' },
    { color: '#ffaf32', title: '上下线校验错误' },
    { color: '#ffaf32', title: '跳变率校验错误' },
    { color: '#ffaf32', title: '实测值小于计算值错误' },
    { color: '#ffaf32', title: '计算条件不满足，停止计算' }
  ],
  // 报警 颜色、标题（提示信息）
  warn: [
    { color: '#f6bf99', title: '注意' },
    { color: '#f00', title: '严重' },
    { color: '#ff8000', title: '异常' },
    { color: '#fc0', title: '注意' },
    { color: '#ced0d4', title: '一般' },
    { color: '#0f0', title: '正常' },
    { color: '#ccc', title: '被手工屏蔽' },
    { color: '#ffaf32', title: '上下线校验错误' },
    { color: '#ffaf32', title: '实测值小于计算值错误' },
    { color: '#ffaf32', title: '计算条件不满足，停止计算' },
    { color: '#0f0', title: '正常' }
  ]
})

// vuex 里的计算机属性, 相当于Vue里的computed
export const getters = {

}

export const mutations = {

}

export const actions = {

}
