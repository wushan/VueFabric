var canvas = window.canvas
import initCanvas from './Initial'
import store from '../../store'
export default {
  init: function (data, options) {
    if (typeof data === 'object') {
      initCanvas.initWithData(data, options, function (res) {
        window.vue.$children[0].updateHistory()
      })
      // 讀取
    } else if (data === 'new') {
      initCanvas.init(options, function (res) {
        window.vue.$children[0].updateCanvasSize()
        // Initial State
        window.vue.$children[0].updateHistory()
      })
    }
    console.log(options)
    store.commit('set_canvas', options)
  },
  Save: {
    toObj: function () {
      var currentCanvas = JSON.stringify(canvas)
      console.log(currentCanvas)
    },
    toPng: function () {
      // Prevent saving image with a selected control points(borders).
      canvas.deactivateAll().renderAll()
      var png = canvas.toDataURL('png')
      // CROSS ORIGIN ISSUE
      window.open(png)
    },
    toSvg: function () {
      var svg = canvas.toSVG({suppressPreamble: true})
      console.log(svg)
    }
  }
}
