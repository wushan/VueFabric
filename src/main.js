/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
var start = performance.now();
console.log('啟動:' + start / 100)
import Vue from 'vue'
import store from './store'
import App from './App'
import Extend from './assets/canvascomposer/Extend'
import VueSweetAlert from 'vue-sweetalert'
import CanvasComposer from './assets/canvascomposer/CanvasComposer.js'
/* eslint-disable no-new */
Vue.use(VueSweetAlert)
var vue = new Vue({
  el: '#app',
  store,
  events: { 
    'loadedmetadata': function(res) { 
      alert(res)
    } 
  },
  render: h => h(App)
})
var bus = new Vue()
window.bus = bus
window.vue = vue

if (CanvasInitData && CanvasInitOption) {
  CanvasComposer.init(CanvasInitData, CanvasInitOption)
} else {
  CanvasComposer.init('new', CanvasInitOption)
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

// var canvas = window['canvas']
canvas.on('mouse:move', (e) => {
  vue.$children[0].mouseplace = [e.e.layerX, e.e.layerY]
})
// Canvas Events for Detecting objects
canvas.on('object:added', function (e) {
  window.bus.$emit('updateScene')
});
canvas.on('object:modified', function (e) {
  window.bus.$emit('updateScene')
});

var end = performance.now();
console.log('啟動時間' + (end - start) / 100)