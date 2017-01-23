var fabric = window.fabric
var canvas = window.canvas
import Load from './Load'
export default {
  init: function (options, cb) {
    // *Setting Up Canvas
    canvas = new fabric.CanvasEx('c', {
      width: options.width,
      height: options.height,
      allowTouchScrolling: true,
      perPixelTargetFind: true
    })
    // Register to window.global
    window.canvas = canvas
    var grid = 50
    var threshold = grid * 0.2
    this.fit()
    // 拖拉縮放解鎖
    canvas.uniScaleTransform = true
    canvas.preserveObjectStacking = true
    canvas.renderOnAddRemove = false
    canvas.on('object:moving', snapMoveToGrid)
    // Selection Event
    canvas.on('selection:created', (e) => {
      canvas.getActiveGroup().on('modified', (e) => {
        window.vue.$children[0].$emit('updateHistory')
      })
    })
    // canvas.on('object:scaling', snapScaleToGrid)
    // canvas.on('object:moving', fixBoundaries)
    // canvas.on('object:scaling', fixBoundaries)
    function roundToGrid (value) {
      return Math.round(value / grid) * grid
    }
    function snapMoveToGrid (ev) {
      var t = ev.target
      var w = t.width * t.scaleX
      var h = t.height * t.scaleY
      var snap = {   // Closest snapping points
        top: roundToGrid(t.top),
        left: roundToGrid(t.left),
        bottom: roundToGrid(t.top + h),
        right: roundToGrid(t.left + w)
      }
      var dist = {   // Distance from snapping points
        top: Math.abs(snap.top - t.top),
        left: Math.abs(snap.left - t.left),
        bottom: Math.abs(snap.bottom - t.top - h),
        right: Math.abs(snap.right - t.left - w)
      }
      if (dist.bottom < dist.top) {
        if (dist.bottom > threshold) {
          snap.top = t.top // don't snap
        } else {
          snap.top = snap.bottom - h
        }
      } else if (dist.top > threshold) {
        snap.top = t.top // don't snap
      }
      if (dist.right < dist.left) {
        if (dist.right > threshold) {
          snap.left = t.left // don't snap
        } else {
          snap.left = snap.right - w
        }
      } else if (dist.left > threshold) {
        snap.left = t.left // don't snap
      }
      t.set({
        top: snap.top,
        left: snap.left
      })
    }
    cb && cb()
  },
  initWithData: function (data, options, cb) {
    // *Setting Up Canvas
    var canvas = new fabric.CanvasEx('c', {
      width: options.width,
      height: options.height,
      perPixelTargetFind: true
    })
    // Register to window.global
    window.canvas = canvas
    var grid = 50
    var threshold = grid * 0.2
    // Bind Global
    // 拖拉縮放解鎖
    canvas.uniScaleTransform = true
    canvas.preserveObjectStacking = true
    canvas.renderOnAddRemove = false
    canvas.on('object:moving', snapMoveToGrid)
    window.vue.$children[0].$emit('globalLoad', true)
    Load.fromJSON(data, function (res) {
      window.vue.$children[0].$emit('globalLoad', false)
    })
    this.fit()
    function roundToGrid (value) {
      return Math.round(value / grid) * grid
    }
    function snapMoveToGrid (ev) {
      var t = ev.target
      var w = t.width * t.scaleX
      var h = t.height * t.scaleY
      var snap = {   // Closest snapping points
        top: roundToGrid(t.top),
        left: roundToGrid(t.left),
        bottom: roundToGrid(t.top + h),
        right: roundToGrid(t.left + w)
      }
      var dist = {   // Distance from snapping points
        top: Math.abs(snap.top - t.top),
        left: Math.abs(snap.left - t.left),
        bottom: Math.abs(snap.bottom - t.top - h),
        right: Math.abs(snap.right - t.left - w)
      }
      if (dist.bottom < dist.top) {
        if (dist.bottom > threshold) {
          snap.top = t.top // don't snap
        } else {
          snap.top = snap.bottom - h
        }
      } else if (dist.top > threshold) {
        snap.top = t.top // don't snap
      }
      if (dist.right < dist.left) {
        if (dist.right > threshold) {
          snap.left = t.left // don't snap
        } else {
          snap.left = snap.right - w
        }
      } else if (dist.left > threshold) {
        snap.left = t.left // don't snap
      }
      t.set({
        top: snap.top,
        left: snap.left
      })
    }
    cb && cb()
  },
  fit: function () {
    // Reference Canvas Again
    var canvas = window.canvas
    // Scale Canvas to fit viewport
    // var container = document.getElementById('artboard')
    var container = document.querySelector('.canvas-wrapper')
    var paintArea = document.getElementById('canvas')
    // canvas.wrapperEl.style.transform = "scale(.8)"
    ;(function () {
      // console.log(canvas)
      // var aspectRatio = canvas.width / canvas.height
      // Ratio = Canvas 寬(實際px) 與 artboard 寬的比值
      // console.log(canvas.width)
      // console.log(container)
      // console.log(container.clientWidth)
      var ratioW = canvas.width / container.clientWidth
      var ratioH = canvas.height / container.clientHeight
      // console.log('Canvas 實際寬度是視窗寬度的: ' + ratioW + ' 倍')
      // console.log('Canvas 實際高度是視窗寬度的: ' + ratioH + ' 倍')
      var motive
      // 若寬度比值大於或等於高度比值 (代表此矩形為橫式或正方形)
      if (ratioW >= ratioH) {
        // 橫式或正方形情況下，Canvas 實際寬度大於視窗寬度 (必須 scale 縮減)
        if (ratioW > 1) {
          ratioW = container.clientWidth / canvas.width
          // 再縮減 80% 以避免 canvas 貼邊。
          motive = ratioW * 0.8
          console.log(ratioW)
          if (motive > 1) {
            motive = 1
          }
          paintArea.style.transform = 'scale(' + motive + ')'
          // paintArea.style.transformOrigin = "25% 25%"
        } else {
          motive = 1
          paintArea.style.transform = 'scale(' + motive + ')'
          // paintArea.style.transformOrigin = "25% 25%"
        }
      } else if (ratioW < ratioH) {
        if (ratioH > 1) {
          ratioH = container.clientHeight / canvas.height
          // 再縮減 80% 以避免 canvas 貼邊。
          motive = ratioH * 0.8
          console.log(ratioH)
          if (motive > 1) {
            motive = 1
          }
          paintArea.style.transform = 'scale(' + motive + ')'
          // paintArea.style.transformOrigin = "45% 25%"
        } else {
          motive = 1
          paintArea.style.transform = 'scale(' + motive + ')'
          // paintArea.style.transformOrigin = "25% 25%"
        }
      }
    }())
    // 天才
    // function resizedw () {
    // // Haven't resized in 100ms!
    //   this.fit()
    // }
    // window.onresize = function () {
    //   // clearTimeout(doit)
    //   // doit = setTimeout(resizedw, 100)
    //   setTimeout(() => this.fit(), 1200)
    // }
    var doit
    // function resizedw () {
    // // Haven't resized in 100ms!
    //   console.log('xx')
    //   console.log(this)
    //   console.log('xx')
    // }
    var resizedw = (function () {
      this.fit()
    }.bind(this))
    window.onresize = function () {
      clearTimeout(doit)
      doit = setTimeout(resizedw, 100)
    }
  }
}
