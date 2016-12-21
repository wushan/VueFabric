import Events from '../cc.objectEvents'
export default {
  enterEditMode (mask, image) {
    // var fabric = window['fabric']
    var canvas = window['canvas']
    var currentObject = canvas.getActiveObject()
    var targetObj = currentObject.visibleslide
    var index
    for (var i = 0; i < canvas._objects.length; i++) {
      if (mask.id === canvas._objects[i].id) {
        index = i
      }
    }
    if (image.getWidth() - mask.getWidth() >= image.getHeight() - mask.getHeight()) {
      image.scaleToHeight(mask.getHeight())
    } else {
      image.scaleToWidth(mask.width * mask.scaleX)
    }
    image.angle = mask.angle
    image.setPositionByOrigin(mask.getCenterPoint(), 'center', 'center')
    image.setControlsVisibility({
      mtr: false
    })
    image.lockRotation = true
    image.name = 'Source'
    // Set Image Opacity
    image.set('opacity', 0.6)
    // Style Fixed Image Position
    var newMask = mask.clone()
    newMask.set('fill', 'rgba(0,0,0,0.25)')
    newMask.set('selectable', false)
    newMask.set('stroke', 'rgb(125,125,125)')
    newMask.set('strokeDashArray', [2])
    newMask.set('strokeWidth', 2)
    canvas.remove(mask)
    canvas.add(newMask)
    canvas.add(image)
    canvas.setActiveObject(image)
    console.log(targetObj.id)
    // Arrow function to get 'this'
    image.on('object:dblclick', (options) => {
      // Flatten
      this.flatten(newMask, image, targetObj, index)
    })
    canvas.renderAll()
    // console.log(JSON.stringify(canvas));
  },
  flatten (mask, image, targetObj, index) {
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
    // Make a Group
    var tempGroup = new fabric.Group([image, mask])
    canvas.setActiveGroup(tempGroup)
    var savedAngle = image.angle
    tempGroup.angle = image.angle * -1
    canvas.renderAll()
    canvas.discardActiveGroup()
    // Save Image Left/Image Top for Pattern Offset
    var offsetXTranslate = image.left - mask.left
    var offsetYTranslate = image.top - mask.top
    // Set Image left/top to 0 (Matching the Mask left/top)
    image.left = 0
    image.top = 0
    image.angle = 0
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
    var i
    if (newMask.type === 'slider' || newMask.type === 'sliderT') {
      // Style Mask style back
      newMask.set('fill', pattern)
      newMask.set('strokeWidth', 0)
      newMask.set('scaleX', 1)
      newMask.set('scaleY', 1)
      newMask.set('width', mask.width * mask.scaleX)
      newMask.set('height', mask.height * mask.scaleY)
      newMask.set('angle', savedAngle)
      // Update Attributes Back to 'visibleslide'
      newMask.visibleslide.maskWidth = newMask.width
      newMask.visibleslide.maskHeight = newMask.height
      newMask.visibleslide.offsetX = pattern.offsetX
      newMask.visibleslide.offsetY = pattern.offsetY
      newMask.visibleslide.imgWidth = image.getWidth()
      newMask.visibleslide.imgHeight = image.getHeight()
      newMask.visibleslide.id = targetObj.id
      newMask.visibleslide.url = targetObj.url
      console.log(newMask.visibleslide)
      // Find slide in slides
      if (newMask.slides) {
        for (i = 0; i < newMask.slides.length; i++) {
          // Update Specific slide
          if (newMask.slides[i].id === targetObj.id) {
            newMask.slides[i] = newMask.visibleslide
          }
        }
      }
    } else if (newMask.type === 'sliderE') {
      // Style Mask style back
      newMask.set('fill', pattern)
      newMask.set('strokeWidth', 0)
      newMask.set('scaleX', 1)
      newMask.set('scaleY', 1)
      newMask.set('rx', mask.rx * mask.scaleX)
      newMask.set('ry', mask.ry * mask.scaleY)
      newMask.set('width', mask.width * mask.scaleX)
      newMask.set('height', mask.height * mask.scaleY)
      newMask.set('angle', savedAngle)
      // Update Attributes Back to 'visibleslide'
      newMask.visibleslide.maskWidth = newMask.width
      newMask.visibleslide.maskHeight = newMask.height
      newMask.visibleslide.offsetX = pattern.offsetX
      newMask.visibleslide.offsetY = pattern.offsetY
      newMask.visibleslide.imgWidth = image.getWidth()
      newMask.visibleslide.imgHeight = image.getHeight()
      newMask.visibleslide.id = targetObj.id
      newMask.visibleslide.url = targetObj.url
      console.log(newMask.visibleslide)
      // Find slide in slides
      if (newMask.slides) {
        for (i = 0; i < newMask.slides.length; i++) {
          // Update Specific slide
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
    newMask.moveTo(index)
    if (newMask.angle !== 0) {
      newMask.center()
    }
    newMask.setCoords()
    newMask.selectable = true
    canvas.setActiveObject(newMask)
    canvas.renderAll()
  }
}
