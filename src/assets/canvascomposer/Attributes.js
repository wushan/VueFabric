var obj
export default {
  updateWidth (val) {
    var canvas = window['canvas']
    val = parseInt(val)
    obj = canvas.getActiveObject()
    if (obj.type === 'sliderE') {
      obj.set('rx', val / 2)
      obj.scaleX = 1
    } else {
      obj.set('width', val)
      obj.scaleX = 1
    }
    obj.setCoords()
    canvas.renderAll()
  },
  updateHeight (val) {
    var canvas = window['canvas']
    val = parseInt(val)
    obj = canvas.getActiveObject()
    if (obj.type === 'sliderE') {
      obj.set('ry', val / 2)
      obj.scaleY = 1
    } else {
      obj.set('height', val)
      obj.scaleY = 1
    }
    obj.setCoords()
    canvas.renderAll()
  },
  updateLeft (val) {
    var canvas = window['canvas']
    val = parseInt(val)
    obj = canvas.getActiveObject()
    obj.set('left', val)
    obj.setCoords()
    canvas.renderAll()
  },
  updateTop (val) {
    var canvas = window['canvas']
    val = parseInt(val)
    obj = canvas.getActiveObject()
    obj.set('top', val)
    obj.setCoords()
    canvas.renderAll()
  },
  updateAngle (val) {
    var canvas = window['canvas']
    val = parseInt(val)
    if (!val) {
      val = 0
    }
    obj = canvas.getActiveObject()
    obj.set('angle', val)
    obj.setCoords()
    canvas.renderAll()
  }
}
