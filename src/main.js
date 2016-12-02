/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Extend from './assets/canvascomposer/Extend'
import VueSweetAlert from 'vue-sweetalert'
import CanvasComposer from './assets/canvascomposer/CanvasComposer.js'
/* eslint-disable no-new */
Vue.use(VueSweetAlert)
var vue = new Vue({
  el: '#app',
  render: h => h(App)
})


window.vue = vue
// // Register Canvas Globally
// var canvas = new fabric.CanvasEx('c', {
//   width: 500,
//   height: 500,
//   allowTouchScrolling: true
// })
// // Register to window.global
// window.canvas = canvas
// console.log(window.canvas)
// console.log(vue)
// // Canvas Events
// canvas.on('before:selection:cleared', function () {
//   vue.$children[0].currentObject = null
// })

// console.log(CanvasComposer)

// CanvasComposer.init('new', {
//   width: 1000,
//   height: 500
// })
if (CanvasInitData && CanvasInitOption) {
  CanvasComposer.init(CanvasInitData, CanvasInitOption)
} else {
  CanvasComposer.init('new', {
    width: 1024,
    height: 768
  })
}
// Deselect
canvas.on('selection:cleared', function () {
  // console.log('Canvas Before Deselect')
  vue.$children[0].currentObject = null
  canvas.renderAll()
})

// After Rendered
canvas.on('after:render', function () {
	var activeObj = canvas.getActiveObject()
	if (activeObj) {
		vue.$children[0].currentObject = activeObj.toObject()
	} else {
		vue.$children[0].currentObject = activeObj
	}
  // console.log('Canvas afterRender')
})

// Prevent Object leaving the canvas
canvas.on('object:moving', function (e) {
  var obj = e.target;
   // if object is too big ignore
  if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
      return;
  }        
  obj.setCoords();        
  // top-left  corner
  if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
      obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
      obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
  }
  // bot-right corner
  if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
      obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
      obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
  }
});

// canvas.on('object:scaling', function (e) {
//   var obj = e.target;
//   // 2 pixels for not losing control
//   if (Math.floor(obj.getHeight()) >= obj.canvas.height && Math.floor(obj.getWidth()) >= obj.canvas.width) {
//     obj.scaleY = obj.canvas.height / obj.height
//     obj.scaleX = obj.canvas.width / obj.width
//     obj.left = 0
//     obj.top = 0
//     console.log('limiteeeC')
//   } else if (Math.floor(obj.getHeight()) >= obj.canvas.height && Math.floor(obj.getWidth()) < obj.canvas.width) {
//     obj.scaleY = obj.canvas.height / obj.height
//     console.log('limiteeeB')
//   } else if (Math.floor(obj.getHeight()) < obj.canvas.height && Math.floor(obj.getWidth()) >= obj.canvas.width) {
//     obj.scaleX = obj.canvas.width / obj.width
//     console.log('limiteeeA')
//   } else {
//     return
//   }
//   obj.setCoords();        
//   // top-left  corner
//   if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
//       obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
//       obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
//   }
//   // bot-right corner
//   if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
//       obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
//       obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
//   }
// });

// (function(d) {
//     var config = {
//       kitId: 'daf4cqp',
//       scriptTimeout: 3000,
//       async: true
//     },
//     h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
//   })(document);