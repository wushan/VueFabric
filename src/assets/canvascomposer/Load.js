import Events from '../cc.objectEvents'
export default {
  fromJSON (data, callback) {
    var canvas = window['canvas']
    canvas.loadFromJSON(data, canvas.renderAll.bind(canvas), function (o, object) {
      // Bind Event for Each
      Events.bindEvents(window.vue.$children[0], object)
      callback && callback({object})
      canvas.renderAll()
    })
  }
}
