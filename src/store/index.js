import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    objects: {
      slider: 0,
      sliderT: 0,
      sliderE: 0,
      plaintext: 0,
      clock: 0,
      eclock: 0,
      marquee: 0,
      rss: 0,
      usbframe: 0,
      webview: 0,
      rtspframe: 0
    }
  },
  mutations: {
    increment (state, payload) {
      state.objects[payload] += 1
    },
    decrement (state, payload) {
      state.objects[payload] -= 1
    }
  },
  actions: {

  }
})
