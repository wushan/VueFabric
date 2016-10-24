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
console.log(vue.$children)

canvas.on('before:selection:cleared', function () {
  vue.$children[0].currentObject = null
})

// console.log(window.canvas)