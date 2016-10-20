// var fabric = window['fabric']
export default{
  bindEvents (instance, obj) {
    // console.log(instance)
    // var canvas = window['canvas']
    // console.log(obj)
    // console.log(canvas)
    obj.on('selected', function () {
      instance.currentObject = obj.toObject()
      // console.log(rootapp)
    })
    obj.on('moving', function () {
      console.log('mov')
      instance.currentObject = obj.toObject()
      // console.log(rootapp)
    })
    // Scaling
    obj.on('scaling', function () {
      console.log('sca')
      instance.currentObject = obj.toObject()
      // console.log(rootapp)
    })
    // Rotating
    obj.on('rotating', function () {
      console.log('rot')
      instance.currentObject = obj.toObject()
      // console.log(rootapp)
    })
    // After Edit
    obj.on('modified', function () {
      console.log('changed')
      instance.currentObject = obj.toObject()
      instance.$emit('updateHistory')
      // console.log(rootapp)
    })
  },
  ungroup (obj) {
    if (obj.type === 'group') {
      var items = obj._objects
      obj._restoreObjectsState()
      window.canvas.remove(obj)
      for (var i = 0; i < items.length; i++) {
        window.canvas.add(items[i])
        if (i === 0) {
          // Lock 'MASK' Layer
          window.canvas.item(0).selectable = false
        }
        // window.canvas.item(window.canvas.size() - 1).hasControls = true
      }
      window.canvas.renderAll()
    }
  }
}
