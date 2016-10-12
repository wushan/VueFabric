export default{
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
