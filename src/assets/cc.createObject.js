var fabric = window['fabric']
console.log('1')
import Events from '../assets/cc.objectEvents'
export default {
  addRect (canvas) {
    var rect = new fabric.Rect({
      left: canvas.getWidth() / 2 - 100 / 2,
      top: canvas.getHeight() / 2 - 100 / 2,
      fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
      width: 100,
      height: 100,
      padding: 0,
      strokeWidth: 0
    })
    rect.toObject = (function (toObject) {
      return function () {
        return fabric.util.object.extend(toObject.call(this), {
          interaction: this.interaction
        })
      }
    })(rect.toObject)
    rect.perPixelTargetFind = true
    canvas.add(rect)
    // CanvasComposer.History.Update()
    canvas.renderAll()
    // Bind
    console.log(this)
    Events.bindEvents(this, rect)
    // Programmatically Select Newly Added Object
    canvas.setActiveObject(rect)
  }
}
