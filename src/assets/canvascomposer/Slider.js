import Events from '../cc.objectEvents'
export default {
  enterEditMode (mask, image) {
    // var fabric = window['fabric']
    var canvas = window['canvas']
    var currentObject = canvas.getActiveObject()
    var targetObj = currentObject.visibleslide
    // console.log(image)
    image.left = mask.left
    image.top = mask.top
    // if (mask.type === 'circle') {
    //   image.scaleToWidth(mask.width * mask.scaleX)
    // }
    image.scaleToWidth(mask.width * mask.scaleX)
    // Set Image Opacity
    image.set('opacity', 0.8)
    // Style Fixed Image Position
    var newMask = mask.clone()
    newMask.set('fill', 'rgba(0,0,0,0.25)')
    newMask.set('selectable', false)
    newMask.set('stroke', 'rgb(125,125,125)')
    newMask.set('strokeDashArray', [2])
    newMask.set('strokeWidth', 2)
    canvas.remove(mask)
    canvas.add(image)
    canvas.add(newMask)
    canvas.setActiveObject(image)
    console.log(targetObj.id)
    // Arrow function to get 'this'
    image.on('object:dblclick', (options) => {
      // Flatten
      this.flatten(newMask, image, targetObj)
    })
    canvas.renderAll()
    // console.log(JSON.stringify(canvas));
  },
  flatten (mask, image, targetObj) {
    var fabric = window['fabric']
    var canvas = window['canvas']
    console.log('Flattened')
    console.log(targetObj.id)
    // Unbind Events
    image.off('object:dblclick')
    // Set Image Opacity
    image.set('opacity', 1)
    // Transform Scaled Image Size back
    image.set('width', image.width * image.scaleX)
    image.set('height', image.height * image.scaleY)
    image.set('scaleX', 1)
    image.set('scaleY', 1)
    // Save Image Left/Image Top for Pattern Offset
    var offsetXTranslate = image.left - mask.left
    var offsetYTranslate = image.top - mask.top
    // Set Image left/top to 0 (Matching the Mask left/top)
    image.left = 0
    image.top = 0
    // Make a Pattern
    var patternSourceCanvas = new fabric.StaticCanvas()
    patternSourceCanvas.add(image)
    // console.log('ImageCurrentWidth:' + image.getWidth())
    var pattern = new fabric.Pattern({
      source: function () {
        patternSourceCanvas.setDimensions({
          width: image.getWidth() + 500,
          height: image.getHeight() + 500
        })
        return patternSourceCanvas.getElement()
      },
      repeat: 'no-repeat'
    })
    // Set Patter Offset From Saved Information
    pattern.offsetX = offsetXTranslate
    pattern.offsetY = offsetYTranslate

    var newMask = mask.clone()

    if (newMask.type === 'slider') {
      // Style Mask style back
      newMask.set('fill', pattern)
      newMask.set('strokeWidth', 0)
      newMask.set('scaleX', 1)
      newMask.set('scaleY', 1)
      newMask.set('width', mask.width * mask.scaleX)
      newMask.set('height', mask.height * mask.scaleY)
      // Update Attributes Back to 'visibleslide'
      newMask.visibleslide.offsetX = pattern.offsetX
      newMask.visibleslide.offsetY = pattern.offsetY
      newMask.visibleslide.imgWidth = image.getWidth()
      newMask.visibleslide.imgHeight = image.getHeight()
      newMask.visibleslide.id = targetObj.id
      newMask.visibleslide.url = targetObj.url
      console.log(newMask.visibleslide)
      // Find slide in slides
      if (newMask.slides) {
        for (var i = 0; i < newMask.slides.length; i++) {
          if (newMask.slides[i].id === targetObj.id) {
            newMask.slides[i] = newMask.visibleslide
          }
        }
      }
    }
    // Circle Shape Will Encounter the Scale Issue
    // Rectagle Only

    // Bind Double Click Event from fabric.ext
    // https://github.com/mazong1123/fabric.ext
    newMask.on('object:dblclick', (options) => {
      // Pass pattern out
      this.enterEditMode(newMask, image)
    })
    canvas.remove(mask)
    canvas.remove(image)
    Events.bindEvents(window.vue.$children[0], newMask)
    canvas.add(newMask)
    canvas.setActiveObject(newMask)
    canvas.renderAll()
  }
}
