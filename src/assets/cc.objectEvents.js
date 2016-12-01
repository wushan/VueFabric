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
      // Resize objects
      if (obj.type === 'sliderE') {
        // Handling Special Types
        obj.set('rx', Math.floor(obj.rx * obj.scaleX))
        obj.set('ry', Math.floor(obj.ry * obj.scaleY))
        obj.scaleX = 1
        obj.scaleY = 1
        obj.strokeWidth = 1
        obj.stroke = 'rgb(125,125,125)'
        obj.strokeDashArray = 0
      } else if (obj.type === 'slider' || obj.type === 'sliderT') {
        // Normal Objects
        obj.width = Math.floor(obj.width * obj.scaleX)
        obj.height = Math.floor(obj.height * obj.scaleY)
        obj.scaleX = 1
        obj.scaleY = 1
        obj.strokeWidth = 1
        obj.stroke = 'rgb(125,125,125)'
        obj.strokeDashArray = 0
        // Position Correction
        if (obj.width >= obj.canvas.width) {
          obj.left = 0
        } else if (obj.height >= obj.canvas.height) {
          obj.top = 0
        }
      }
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
