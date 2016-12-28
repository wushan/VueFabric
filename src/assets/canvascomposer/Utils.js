// UUID
import uuid from 'node-uuid'
export default {
  // Global
  layertop () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.bringToFront()
      canvas.renderAll()
      window.vue.$children[0].$emit('updateHistory')
      window.bus.$emit('updateScene')
      window.vue.$children[0].$emit('closeContextMenu')
    }
  },
  layerup () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.bringForward()
      canvas.renderAll()
      window.vue.$children[0].$emit('updateHistory')
      window.bus.$emit('updateScene')
      window.vue.$children[0].$emit('closeContextMenu')
    }
  },
  layerdown () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.sendBackwards()
      canvas.renderAll()
      window.vue.$children[0].$emit('updateHistory')
      window.bus.$emit('updateScene')
      window.vue.$children[0].$emit('closeContextMenu')
    }
  },
  layerbottom () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    if (obj) {
      obj.sendToBack()
      canvas.renderAll()
      window.vue.$children[0].$emit('updateHistory')
      window.bus.$emit('updateScene')
      window.vue.$children[0].$emit('closeContextMenu')
    }
  },
  duplicate () {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    var newObject
    if (obj) {
      // Slider Clone
      if (obj.type === 'slider' || obj.type === 'sliderE' || obj.type === 'sliderT') {
        if (obj.slides) {
          window.vue.$children[0].$emit('globalError', '已含有圖層的 Slider 物件無法複製，請建立新的 Slider。')
        } else {
          // Normal Clone
          newObject = obj.clone()
          // Move New Object
          newObject.left = newObject.left + 10
          newObject.top = newObject.top + 10
          // Assign a new id for new Object
          newObject.id = uuid.v4()
          canvas.add(newObject)
          canvas.setActiveObject(newObject)
          canvas.renderAll()
          window.vue.$children[0].$emit('updateHistory')
          window.vue.$children[0].$emit('closeContextMenu')
        }
      } else {
        // Normal Clone
        newObject = obj.clone()
        // Move New Object
        newObject.left = newObject.left + 10
        newObject.top = newObject.top + 10
        // Assign a new id for new Object
        newObject.id = uuid.v4()
        canvas.add(newObject)
        canvas.setActiveObject(newObject)
        canvas.renderAll()
        window.vue.$children[0].$emit('updateHistory')
        window.vue.$children[0].$emit('closeContextMenu')
      }
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
        obj.selectable = true
        obj.stroke = ''
        obj.strokeWidth = 0
        canvas.renderAll()
      } else {
        obj.lockMovementY = true
        obj.lockMovementX = true
        obj.lockRotation = true
        obj.lockScalingX = true
        obj.lockScalingY = true
        obj.selectable = false
        canvas.deactivateAllWithDispatch()
        canvas.renderAll()
      }
      window.vue.$children[0].$emit('updateHistory')
      window.vue.$children[0].$emit('closeContextMenu')
    } else {
      window.vue.$children[0].$emit('globalError', '錯誤')
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
          if (o.type === 'image') {
            return window.vue.$children[0].$emit('globalError', '必須先離開編輯模式，才能刪除 Slider 物件中的圖片。')
          } else {
            canvas.remove(o)
          }
        })
        canvas.discardActiveGroup().renderAll()
      } else if (canvas.getActiveObject()) {
        var singleObj = canvas.getActiveObject()
        if (singleObj._element !== undefined && singleObj._element.localName === 'video') {
          singleObj.getElement().pause()
          canvas.remove(singleObj)
        } else if (singleObj.type === 'image') {
          return window.vue.$children[0].$emit('globalError', '必須先離開編輯模式，才能刪除 Slider 物件中的圖片。')
        } else {
          canvas.remove(singleObj)
        }
        console.log('removed')
      } else {
        console.log('return')
        return
      }
      window.vue.$children[0].$emit('updateHistory')
      window.vue.$children[0].$emit('closeContextMenu')
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
        instance.id = uuid.v4()
        instance.name = 'Clock'
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
    if (ratio) {
      if (obj.type === 'sliderE') {
        // obj.scaleX = Math.floor(obj.scaleX / ratio.w)
        obj.set('rx', obj.getWidth() / 2)
        obj.set('ry', obj.rx / ratio.w * ratio.h)
        obj.scaleX = 1
        obj.scaleY = 1
        obj.setCoords()
        canvas.renderAll()
      } else {
        obj.width = Math.floor(obj.getWidth())
        obj.height = Math.floor(obj.width / ratio.w * ratio.h)
        obj.scaleX = 1
        obj.scaleY = 1
      }
      obj.lockUniScaling = true
      // obj.scaleX = Math.floor(obj.scaleX / ratio.w)
      // obj.scaleX = Math.round(obj.scaleX)
      // console.log(obj.scaleX)
      // console.log(Math.round(obj.scaleX))
      // obj.scaleY = Math.round(obj.scaleX) / ratio.w * ratio.h
      // console.log(obj.scaleY)
      obj.setCoords()
      // obj.lockUniScaling = true
      // Dealing With Sliders
      // if (obj.type === 'slider') {
      //   console.log(obj)
      // }
      canvas.renderAll()
    } else {
      // Lock current size
      // obj.width = Math.round(obj.width * obj.scaleX)
      // obj.height = Math.round(obj.height * obj.scaleY)
      // obj.scaleX = 1
      // obj.scaleY = 1
      obj.setCoords()
      obj.lockUniScaling = true
      canvas.renderAll()
    }
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
  },
  pushObject (direction, gap) {
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    switch (direction) {
      case 'left':
        // if (obj.left <= 0) {
        //   obj.left = 0
        //   obj.setCoords()
        // } else {
        //   obj.left = obj.left - gap
        //   obj.setCoords()
        // }
        obj.left = obj.left - gap
        obj.setCoords()
        break
      case 'right':
        // if (obj.left + obj.getWidth() >= obj.canvas.width) {
        //   obj.left = obj.canvas.width - obj.getWidth()
        //   obj.setCoords()
        // } else {
        //   obj.left = obj.left + gap
        //   obj.setCoords()
        // }
        obj.left = obj.left + gap
        obj.setCoords()
        break
      case 'up':
        // if (obj.top <= 0) {
        //   obj.top = 0
        //   obj.setCoords()
        // } else {
        //   obj.top = obj.top - gap
        //   obj.setCoords()
        // }
        obj.top = obj.top - gap
        obj.setCoords()
        break
      case 'down':
        // if (obj.top + obj.getHeight() >= obj.canvas.height) {
        //   obj.top = obj.canvas.height - obj.getHeight()
        //   obj.setCoords()
        // } else {
        //   obj.top = obj.top + gap
        //   obj.setCoords()
        // }
        obj.top = obj.top + gap
        obj.setCoords()
        break
    }
    canvas.renderAll()
  },
  selectAll () {
    var fabric = window['fabric']
    var canvas = window['canvas']
    // First Deselect All
    this.deselectAll()
    var objs = canvas.getObjects().map(function (o) {
      return o.set('active', true)
    })
    var group = new fabric.Group(objs, {
      originX: 'center',
      originY: 'center'
    })
    canvas._activeObject = null
    canvas.setActiveGroup(group.setCoords()).renderAll()
  },
  deselectAll () {
    var canvas = window['canvas']
    canvas.deactivateAllWithDispatch()
  },
  isolation (state) {
    // Make Everything but selected Object inselectable
    var canvas = window['canvas']
    var obj = canvas.getActiveObject()
    var i
    for (i = 0; i < canvas._objects.length; i++) {
      if (canvas._objects[i] === obj) {

      } else {
        canvas._objects[i].selectable = !canvas._objects[i].selectable
        canvas._objects[i].evented = !canvas._objects[i].evented
      }
    }
    canvas.renderAll()
  }
}
