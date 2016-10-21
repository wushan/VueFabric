export default {
  removeObject (cb) {
    var canvas = window['canvas']
    if (canvas.getActiveGroup()) {
      canvas.getActiveGroup().forEachObject(function (o) {
        canvas.remove(o)
      })
      canvas.discardActiveGroup().renderAll()
    } else if (canvas.getActiveObject()) {
      var singleObj = canvas.getActiveObject()
      if (singleObj._element !== undefined && singleObj._element.localName === 'video') {
        singleObj.getElement().pause()
        canvas.remove(singleObj)
      } else {
        canvas.remove(singleObj)
      }
      console.log('removed')
    } else {
      console.log('return')
      return
    }
    cb && cb()
  },
  loadClock (data, cb) {
    var fabric = window['fabric']
    var canvas = window['canvas']
    var objects = JSON.parse(data[0].clock)
    objects = objects.objects
    for (var i = 0; i < objects.length; i++) {
      var klass = fabric.util.getKlass(objects[i].type)
      if (klass.async) {
        klass.fromObject(objects[i], function (img) {
          canvas.add(img)
        })
      } else {
        var instance = klass.fromObject(objects[i])
        canvas.add(instance)
        canvas.setActiveObject(instance)
        cb && cb(instance)
      }
    }
  }
}
