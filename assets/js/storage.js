/* eslint-disable prefer-const */
'use strict'
/*
 * getter or setter sessionStorage / sessionStorage data
 * .getItem(key) 如果key不存在时，返回null
 * .setItem(key,value) 如果key的value存在时，更新key的值
 * .remove(key) 表示清除单项key的值
 * .clear(),表示清除localStorage/sessionStorage存储的所有数据
 * 遍历存储的数据
 * for(i=0;i<sessionStorage.length;i++){
 *   sessionStorage.key(i)+":"+sessionStorage.getItem(sessionStorage.key(i))
 * }
 *
 * sessionStorage.length 表示本地存储数据的总量
 * sessionStorage.key(i) 表示获取第i个数据的key
 * sessionStorage.getItem( sessionStorage.key(i) )，表示获取第i个数据的value
 *
 * JSON存储
 *  1. JSON.stringify(data) 将对象转换成JSON格式的数据串
 *  2. JSON.parse(data)将数据解析成对象并返回解析后的对象。
 * 例子:
 *  var arr = {"name":"moomoo","age":2,"eat":"apple"}
 *  sessionStorage.setItem("arr", JSON.stringify(arr))
 *  arr = JSON.parse( sessionStorage.getItem("arr") )
 *
 *
 */
const STORAGE_PRE_KEY = 'henry-v1_'

const storage = (obj) => {
  // obj: {type:xx, name:xx, info:xx, isJson:true/false}
  const objLen = Object.keys(obj).length || -1

  switch (objLen) {
    case 3:
      return getItem(obj)
    case 4:
      setItem(obj)
      break
  }
}

const getItem = (obj) => {
  let { type, name, isJson } = obj
  name = STORAGE_PRE_KEY + name

  if (type === 'localStorage') {
    const data = localStorage.getItem(name)
    return isJson ? JSON.parse(data) : data
  }

  if (type === 'sessionStorage') {
    const data = sessionStorage.getItem(name)
    return isJson ? JSON.parse(data) : data
  }

  return null
}

const setItem = (obj) => {
  let { type, name, info, isJson } = obj

  if (!!name && typeof info !== 'undefined') {
    name = STORAGE_PRE_KEY + name

    if (isJson) {
      info = JSON.stringify(info)
    }

    if (type === 'localStorage') {
      localStorage.setItem(name, info)
    }
    if (type === 'sessionStorage') {
      sessionStorage.setItem(name, info)
    }
  }
}

// delete sessionStorage or sessionStorage data by name
const storageRemove = (type, name) => {
  if (name) {
    if (type === 'localStorage') {
      localStorage.removeItem(name)
    }

    if (type === 'sessionStorage') {
      sessionStorage.removeItem(name)
    }
  }
}

// clear all
const storageClear = (type) => {
  if (type === 'localStorage') {
    localStorage.clear()
  }

  if (type === 'sessionStorage') {
    sessionStorage.clear()
  }
}

export { storage, storageRemove, storageClear }
