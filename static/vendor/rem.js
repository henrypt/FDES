'use strict';
/*
//document.documentElement.style.fontSize = document.documentElement.clientWidth / 640*100 + 'px'
//获取屏幕宽度
const width = document.documentElement.clientWidth
//获取html
const htmlNode = document.querySelector('html')
//设置html字体大小
htmlNode.style.fontSize = width / 640 * 100 +'px' // width/16 + 'px'
*/

/*
 * 一般情况下设置为1rem=100px，在写css的width、height、margin、padding时比较好换算
 * 例如设计稿上52px，则换算后为0.52rem
 */
(function(doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = ('orientationchange' in window) ? 'orientationchange' : 'resize'
  let recalc = function() {
    let clientWidth = docEl.clientWidth
    if( !clientWidth ){ return }
    if( clientWidth>=640 ){  //页面视口最大设为640，当大于640px时，文件的font-size=100px
      docEl.style.fontSize = '100px'
    }
    else{   
      docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'
      // 页面视口小于640时，文件的font-size的值随着视口的变化而改变  
      // 若想1rem=50px，可以把100换成50，以此类推
    } 
  }
  if( !doc.addEventListener ){ return }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);