// var fabric = window['fabric']
export default{
  bindEvents (instance, obj) {
    obj.on('selected', function () {
      instance.currentObject = obj.toObject()
    })
    obj.on('deselected', function () {
      instance.$root.$children[0].currentObject = null
    })
    obj.on('moving', function () {
      instance.currentObject = obj.toObject()
    })
    // Scaling
    obj.on('scaling', function () {
      instance.currentObject = obj.toObject()
    })
    // Rotating
    obj.on('rotating', function () {
      instance.currentObject = obj.toObject()
    })
    // After Edit
    obj.on('modified', function () {
      console.log('changed')
      instance.currentObject = obj.toObject()
      instance.$emit('updateHistory')
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
