export default {
  removeObject () {
    var canvas = window['canvas']
    console.log(canvas)
    var checkYourMind = window.confirm('確定刪除？')
    if (checkYourMind === true) {
      console.log(canvas.getActiveGroup())
      if (canvas.getActiveGroup()) {
        canvas.getActiveGroup().forEachObject(function (o) {
          if (o._element !== undefined && o._element.localName === 'video') {
            o.getElement().pause()
            canvas.remove(o)
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
        } else {
          canvas.remove(singleObj)
        }
        console.log('removed')
      } else {
        console.log('return')
        return
      }
    }
  }
}
