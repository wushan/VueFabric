/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  render: h => h(App)
})

// Register Canvas Globally
var canvas = new fabric.CanvasEx('c', {
  width: 500,
  height: 500,
  allowTouchScrolling: true
})
// Register to window.global
window.canvas = canvas
console.log(window.canvas)
console.log(vue)
// Canvas Events
canvas.on('before:selection:cleared', function () {
  vue.$children[0].currentObject = null
})