import Vue from 'vue'
export default {
  // Global
  layertop () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.bringToFront()
      canvas.renderAll()
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
    }
  },
  layerup () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.bringForward()
      canvas.renderAll()
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
    }
  },
  layerdown () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.sendBackwards()
      canvas.renderAll()
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
    }
  },
  layerbottom () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.sendToBack()
      canvas.renderAll()
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
    }
  },
  duplicate () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      var newObject = obj.clone()
      // Move New Object
      newObject.left = newObject.left + 10
      newObject.top = newObject.top + 10
      canvas.add(newObject)
      canvas.setActiveObject(newObject)
      canvas.renderAll()
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
    }
  },
  lock () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      if (obj.lockMovementY === true) {
        obj.lockMovementY = false
        obj.lockMovementX = false
        obj.lockRotation = false
        obj.lockScalingX = false
        obj.lockScalingY = false
        obj.stroke = ''
        obj.strokeWidth = 0
        canvas.renderAll()
      } else {
        obj.lockMovementY = true
        obj.lockMovementX = true
        obj.lockRotation = true
        obj.lockScalingX = true
        obj.lockScalingY = true
        obj.stroke = '#ff0000'
        obj.strokeWidth = 4
        canvas.renderAll()
      }
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
    }
  },
  removeObject (cb) {
    var canvas = window['canvas']
    // Confirm before delete
    window.vue.$swal({
      title: '確定刪除？',
      text: '刪除後可使用 Ctrl + Z 組合鍵回復',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除'
    }).then(() => {
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
      Vue.$children[0].$emit('updateHistory')
      Vue.$children[0].$emit('closeContextMenu')
      window.vue.$swal(
        '已刪除',
        '所選項目已刪除',
        'success'
      )
    })
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
  },
  // Ratio
  lockRatio (ratio) {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    obj.width = Math.round(obj.getWidth())
    obj.height = obj.width / ratio.w * ratio.h
    obj.scaleX = 1
    obj.scaleY = 1
    obj.lockUniScaling = true
    canvas.renderAll()
  },
  unLockRatio () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    obj.lockUniScaling = false
    canvas.renderAll()
  },
  get_param (param) {
    var vars = {}
    window.location.href.replace(window.location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (m, key, value) {
      vars[key] = value !== undefined ? value : ''
    })
    if (param) {
      return vars[param] ? vars[param] : null
    }
    return vars
  }
}
