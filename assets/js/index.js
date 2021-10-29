'use strict'

// 使用闭包，保证避免全局变量污染 (function(){ ... })();
// (function(){
//
// })();

exports.getBrowserInfo = function () {
  const userAgent = navigator.userAgent.toLowerCase()

  // Phone
  if (userAgent.match(/ipad/i) === 'ipad') {
    return { type: 'ipad', isPC: false }
  }

  if (userAgent.match(/iphone os/i) === 'iphone os') {
    return { type: 'iphone os', isPC: false }
  }
  if (userAgent.match(/midp/i) === 'midp') {
    return { type: 'midp', isPC: false }
  }
  if (userAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4') {
    return { type: 'rv:1.2.3.4', isPC: false }
  }
  if (userAgent.match(/ucweb/i) === 'ucweb') {
    return { type: 'ucweb', isPC: false }
  }
  if (userAgent.match(/android/i) === 'android') {
    return { type: 'android', isPC: false }
  }
  if (userAgent.match(/windows ce/i) === 'windows ce') {
    return { type: 'windows ce', isPC: false }
  }
  if (userAgent.match(/windows mobile/i) === 'windows mobile') {
    return { type: 'windows mobile', isPC: false }
  }

  // PC
  return { type: getBrowserType(), isPC: true, userAgent }
}

// get browser type for PC
const getBrowserType = function () {
  const userAgent = navigator.userAgent.toLowerCase() // 取得浏览器的userAgent字符串

  // 判断是否IE浏览器
  if (
    userAgent.includes('compatible') &&
    userAgent.includes('MSIE') &&
    !userAgent.includes('opera')
  ) {
    // eslint-disable-next-line prefer-regex-literals
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp.$1)
    if (!isNaN(fIEVersion)) {
      return 'ie' + fIEVersion
    } else {
      return 'ie'
    }
  }
  if (userAgent.includes('opera')) {
    return 'ppera'
  }
  if (userAgent.includes('edge')) {
    return 'edge'
  } // IE的Edge浏览器
  if (userAgent.includes('firefox')) {
    return 'ff'
  }
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    return 'safari'
  }
  if (userAgent.includes('chrome') && userAgent.includes('safari')) {
    return 'chrome'
  }
}
