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

var end = performance.now();
console.log('啟動時間' + (end - start) / 100)