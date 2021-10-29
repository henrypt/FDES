import Vue from 'vue'
import Moment from 'moment'
// import Cookies from 'js-cookie'

const common = {
  install (Vue) {
    Vue.prototype.i18nConfiguration = {
      name: 'FDES_LANGUAGE'
    }
    // 日期时间处理
    Vue.prototype.$moment = {
      moment: (date) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')
        return newMoment
      },
      // 获取 YYYY-MM-DD hh:mm:ss
      dateTime: (date = new Date()) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')

        return newMoment.format('YYYY-MM-DD hh:mm:ss')
      },
      // 获取时间戳
      timeStamp: (date = new Date()) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')
        return Date.parse(newMoment.format('YYYY/MM/DD hh:mm:ss'))
      },
      add: (d = 0, date = new Date()) => {
        const newMoment = new Moment(date)
        newMoment.locale('zh-cn')

        return newMoment.add(d, 'd').format('YYYY-MM-DD hh:mm:ss')
      }
    }
  },
  // 路由跳转
  go (type, vue, append) {
    // push or replace
    const _system = vue.$store.getters['system/getSystemInfo']
    if (vue.$router.path !== _system.route[type]) {
      try {
        vue.$router.push({
          path: !append ? _system.route[type] : _system.route[type] + '#' + append
        })
      } catch (err) {
        window.console.log('输出报错', err)
      } // '/' or /ztjc/ztzs

      // vue.$router.replace(_system.route[type])
    }
  },
  getSession (key) {
    const v = window.sessionStorage.getItem(key)
    let obj = null
    try {
      obj = JSON.parse(v)
      if (obj) {
        return obj
      } else {
        return null
      }
    } catch (err) {
      return null
    }
  },
  resetSession (type, key, val) {
    const str = window.sessionStorage.getItem(key)
    if (str) {
      const obj = JSON.parse(str)
      if (obj[type]) {
        obj[type] = val
        this.setSession(key, JSON.stringify(obj), type)
        window.console.log('window.sessionStorage(' + key + ') = ', type, obj[type])
      }
    }
  },
  setSession (key, val, type) {
    window.sessionStorage.removeItem(key)
    window.sessionStorage.setItem(key, val)
    const str = window.sessionStorage.getItem(key)
    if (str) {
      const obj = JSON.parse(str)

      window.console.log('window.sessionStorage.getItem(' + key + ') = ', obj.token)
    }
  },
  removeSession (key) {
    window?.sessionStorage?.removeItem(key)
  },
  // 半角转全角
  toSBC (input) {
    let res = ''; let c
    for (let i = 0; i < input.length; i++) {
      c = input.charCodeAt(i)
      if ((c >= 0x21 && c < 0x30) || (c > 0x39 && c < 0x41) || (c > 0x5A && c < 0x61) || (c > 0x7A && c <= 0x7E)) { // 33 126c>=0x21&&c<=0x7e
        res += String.fromCharCode(c + 0xFEE0)
      } else if (c === 0x20) {
        res += String.fromCharCode(0x3000)
      } else {
        res += input.charAt(i)
      }
    }
    return res
  },
  // 全角转半角
  ToCDB (str) {
    let tmp = ''
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
        tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
      } else {
        tmp += String.fromCharCode(str.charCodeAt(i))
      }
    }
    return tmp
  },
  getTokenid: (state) => {
    return window.localStorage.getItem('tokenid')
    // return window.localStorage.getItem('tokenid') || state.token?.id || null
  }

}

Vue.prototype.$common = common
Vue.use(common)
