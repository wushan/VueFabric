import Events from '../cc.objectEvents'
import Slider from './Slider'
export default {
  fromJSON (data, callback) {
    var fabric = window['fabric']
    var canvas = window['canvas']
    console.log(data)
    canvas.loadFromJSON(data, canvas.renderAll.bind(canvas), function (o, object) {
      console.log('解析 ------ v')
      console.log(object)
      console.log(o)
      console.log('^ ---------- ')
      // When object is slider
      if (object.type === 'slider' || object.type === 'sliderE' || object.type === 'sliderT') {
        if (object.visibleslide) {
          fabric.Image.fromURL(object.visibleslide.url, function (img) {
            // img.scaleToWidth(object.visibleslide.imgWidth)
            img.set('width', object.visibleslide.imgWidth)
            img.set('height', object.visibleslide.imgHeight)
            img.set('scaleX', 1)
            img.set('scaleY', 1)
            // Make a Pattern
            var patternSourceCanvas = new fabric.StaticCanvas()
            patternSourceCanvas.add(img)
            // console.log('ImageCurrentWidth:' + img.getWidth())
            var pattern = new fabric.Pattern({
              source: function () {
                patternSourceCanvas.setDimensions({
                  width: img.getWidth() + 500,
                  height: img.getHeight() + 500
                })
                return patternSourceCanvas.getElement()
              },
              repeat: 'no-repeat'
            })
            object.set('fill', pattern)
            pattern.offsetX = object.visibleslide.offsetX
            pattern.offsetY = object.visibleslide.offsetY
            canvas.renderAll()
            // canvas.setActiveObject(object)
            // Edit Mode
            object.on('object:dblclick', function (options) {
              // Pass pattern out
              Slider.enterEditMode(object, img)
            })
          }, { crossOrigin: 'Anonymous' })
        }
      }
      // Bind Event for Each
      // Bind Common Events
      Events.bindEvents(window.vue.$children[0], object)
      // Slider Component should update the maskSize after everytime modified.
      // After Edit
      object.on('modified', function () {
        if (this.slides) {
          for (var i = 0; i < this.slides.length; i++) {
            this.slides[i].maskWidth = this.width * this.scaleX
            this.slides[i].maskHeight = this.height * this.scaleY
          }
        }
      })
      canvas.renderAll()
    })
    // callback && callback('ddd')
  }
}
