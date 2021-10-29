/* eslint-disable prefer-const */
'use strict'
/*
 * Api：
 * 设置 cookie this.$cookies.set(keyName, time)   //return this
 * 获取cookie  this.$cookies.get(keyName)       // return value
 * 删除 cookie this.$cookies.remove(keyName)   // return  false or true , warning： next version return this； use isKey(keyname) return true/false,please
 * 查看一个cookie是否存在（通过keyName）this.$cookies.isKey(keyName)        // return false or true
 * 获取所有cookie名称  this.$cookies.keys()  // return a array
 * 警告 $ cookies关键名称不能设置为['expires'，'max-age'，'path'，'domain'，'secure']
 */

const COOKIE_PRE_KEY = 'henry-v2_'

const cookie = (obj) => {
  // obj: {name:xxx, info:xxx, isJson }
  const objLen = Object.keys(obj).length || -1
  switch (objLen) {
    case 1:
    case 2:
      return getItem(obj)

    case 3:
      setItem(obj)
      break
  }
}

const getItem = (obj) => {
  let { name, isJson } = obj
  name = COOKIE_PRE_KEY + name

  const data = window.$cookies.get(name)

  return isJson ? JSON.parse(data) : data
}

const setItem = (obj) => {
  let { name, info, isJson } = obj
  name = COOKIE_PRE_KEY + name

  const data = isJson ? JSON.stringify(info) : info

  window.$cookies.set(name, data)
}

const cookieRemove = (name) => {
  if (window.$cookies.isKey(name)) {
    window.$cookies.remove(name)
  }
}

const cookieKey = (key) => {
  return window.$cookies.isKey(name)
}

export { cookie, cookieRemove, cookieKey }
