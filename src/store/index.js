import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    baseurl: 'http://radi.4webdemo.com/',
    canvas: {},
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
    },
    music: {
      sources: [
        {
          LId: '1',
          name: 'abc.mp3',
          time: '11:23'
        },
        {
          LId: '2',
          name: 'def.mp3',
          time: '02:04'
        },
        {
          LId: '3',
          name: 'ghi.mp3',
          time: '15:09'
        },
        {
          LId: '4',
          name: 'jlk.mp3',
          time: '03:02'
        }
      ],
      selected: []
    }
  },
  mutations: {
    set_canvas (state, options) {
      state.canvas = options
    },
    increment (state, payload) {
      state.objects[payload] += 1
    },
    decrement (state, payload) {
      state.objects[payload] -= 1
    },
    addToMusicList (state, obj) {
      state.music.selected.push(obj)
    },
    removeFromList (state, index) {
      state.music.selected.splice(index, 1)
    },
    replaceSelectMusic (state, list) {
      state.music.selected = list
    }
  },
  actions: {

  }
})
