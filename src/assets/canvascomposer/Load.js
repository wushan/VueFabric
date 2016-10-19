export default {
  fromJSON (data, callback) {
    var canvas = window['canvas']
    console.log(canvas.width)
    canvas.loadFromJSON(data, canvas.renderAll.bind(canvas), function (o, object) {
      canvas.renderAll()
    })
    callback && callback({loaded: true})
  }
}
