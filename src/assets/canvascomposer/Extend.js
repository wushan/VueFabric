// import Slider from './Slider'
var fabric = window.fabric
// var canvas = window.canvas
// fabric.Object.prototype.stroke = '#333333'
fabric.Object.prototype.strokeWidth = 0
fabric.Object.prototype.interaction = {
  type: 'none',
  app: {
    appName: '',
    appEscape: '',
    appEscapeTime: '',
    appEscapeButton: '',
    appEscapeButtonPos: '',
    appEscapeButtonSize: ''
  },
  link: {
    url: '',
    name: ''
  }
}
// fabric.Object.prototype.toObject = (function (toObject) {
//   return function () {
//     return fabric.util.object.extend(toObject.call(this), {
//       interaction: this.interaction,
//       id: this.id,
//       name: this.name
//     })
//   }
// })(fabric.Object.prototype.toObject)

fabric.Object.prototype.set({
  borderColor: 'orange',
  cornerColor: 'red',
  cornerStyle: 'circle',
  cornerSize: 14,
  borderScaleFactor: 3,
  transparentCorners: false
})

// Video Class
fabric.Video = fabric.util.createClass(fabric.Image, {
  type: 'video',
  initialize: function (element, options) {
    options || (options = {})
    this.callSuper('initialize', element, options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      interaction: this.interaction,
      media: this.media,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Video.async = true
fabric.Video.fromURL = function (url, callback, imgOptions) {
  fabric.util.loadImage(url, function (img) {
    callback(new fabric.Video(img, imgOptions))
  }, null, imgOptions && imgOptions.crossOrigin)
}
fabric.Video.fromObject = function (object, callback) {
  fabric.util.loadImage(object.src, function (img) {
    fabric.Image.prototype._initFilters.call(object, object, function (filters) {
      object.filters = filters || []
      var instance = new fabric.Video(img, object)
      callback && callback(instance)
    })
  }, null, object.crossOrigin)
}

// Create Fabric Slider Class
fabric.Slider = fabric.util.createClass(fabric.Rect, {
  type: 'slider',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      visibleslide: this.visibleslide,
      slides: this.slides,
      interaction: this.interaction,
      name: this.name,
      selectable: this.selectable,
      ratio: this.ratio
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
// https://gitlab.com/wushan/radi/blob/master/frontend-dev/app/scripts/CanvasComposer.js
// fabric.Slider.fromObject = function(objects, callback, options) {
fabric.Slider.fromObject = function (options) {
  if (typeof options.fill === 'object') {
    options.fill = '#cccccc'
  }
  return new fabric.Slider(options)
}

// Create Fabric Slider Class
fabric.SliderE = fabric.util.createClass(fabric.Ellipse, {
  type: 'sliderE',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      visibleslide: this.visibleslide,
      slides: this.slides,
      interaction: this.interaction,
      name: this.name,
      selectable: this.selectable,
      ratio: this.ratio
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
// https://gitlab.com/wushan/radi/blob/master/frontend-dev/app/scripts/CanvasComposer.js
// fabric.Slider.fromObject = function(objects, callback, options) {
fabric.SliderE.fromObject = function (options) {
  if (typeof options.fill === 'object') {
    options.fill = '#cccccc'
  }
  return new fabric.SliderE(options)
}

// Create Fabric Slider Class
fabric.SliderT = fabric.util.createClass(fabric.Triangle, {
  type: 'sliderT',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      visibleslide: this.visibleslide,
      slides: this.slides,
      interaction: this.interaction,
      name: this.name,
      selectable: this.selectable,
      ratio: this.ratio
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
// https://gitlab.com/wushan/radi/blob/master/frontend-dev/app/scripts/CanvasComposer.js
// fabric.Slider.fromObject = function(objects, callback, options) {
fabric.SliderT.fromObject = function (options) {
  if (typeof options.fill === 'object') {
    options.fill = '#cccccc'
  }
  return new fabric.SliderT(options)
}
// Custom Controller
// fabric.Slider.prototype.customiseCornerIcons({
//   settings: {
//     borderColor: 'orange',
//     cornerSize: 25,
//     cornerShape: 'circle',
//     cornerBackgroundColor: 'red',
//     cornerPadding: 10
//   },
//   tl: {
//     icon: '/static/assets/images/icons/rotate.svg'
//   },
//   tr: {
//     icon: '/static/assets/images/icons/resize.svg'
//   },
//   bl: {
//     icon: '/static/assets/images/icons/remove.svg'
//   },
//   br: {
//     icon: '/static/assets/images/icons/up.svg'
//   },
//   mb: {
//     icon: '/static/assets/images/icons/down.svg'
//   }
// })

// EClock Class
fabric.Eclock = fabric.util.createClass(fabric.Text, {
  type: 'eclock',
  initialize: function (element, options) {
    options || (options = {})
    this.callSuper('initialize', element, options)
      // Change it on the fly
    var instance = this
    console.log(instance)
      // Init Now
    eclockSimulate(instance)
    function eclockSimulate (instance) {
      instance.set('text', window.moment().tz(options.gmt).locale(options.locale).format(options.format))
      // Do not renderAll for performance.
      // window.canvas.renderAll()
      setTimeout(function () {
        eclockSimulate(instance)
      }, 1000)
    }
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      interaction: this.interaction,
      format: this.format,
      gmt: this.gmt,
      name: this.name,
      locale: this.locale,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Eclock.fromObject = function (object) {
  return new fabric.Eclock(object.text, object)
}

fabric.Eclock.async = false

// Create Fabric Clock Class
fabric.Clock = fabric.util.createClass(fabric.Group, {
  type: 'clock',
  initialize: function (objects, options, alreadyGrouped) {
    this.callSuper('initialize', objects, options, alreadyGrouped)
    this.originX = 'left'
    this.originY = 'top'
    // Clock Sync
    console.log(objects)
    // var canvasClock,
    var canvasClockHour
    var canvasClockMin
    var canvasClockSec
    var canvasClockTimeZone
    canvasClockHour = objects[1]
    canvasClockMin = objects[2]
    canvasClockSec = objects[3]
    canvasClockTimeZone = options.gmt
      // Init Now
    clockSimulate()
      // Routine
    setTimeout(function () {
      clockSimulate()
    }, 1000)

    function clockSimulate () {
      canvasClockHour.setAngle(30 * window.moment().tz(canvasClockTimeZone).format('H') + 6 * window.moment().tz(canvasClockTimeZone).format('mm') / 360 * 30)
      canvasClockMin.setAngle(6 * window.moment().tz(canvasClockTimeZone).format('mm'))
      canvasClockSec.setAngle(6 * window.moment().tz(canvasClockTimeZone).format('ss'))
      // window.canvas.renderAll()
      setTimeout(function () {
        clockSimulate()
      }, 1000)
    }
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      interaction: this.interaction,
      frame: this.frame,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      gmt: this.gmt,
      name: this.name,
      id: this.id,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Clock.fromObject = function (object, callback) {
  var _enlivenedObjects
  fabric.util.enlivenObjects(object.objects, function (enlivenedObjects) {
    delete object.objects
    _enlivenedObjects = enlivenedObjects
  })
  return new fabric.Clock(_enlivenedObjects, object, true)
}
// Create Fabric Marquee Class
// http://stackoverflow.com/questions/20407546/scale-some-object-but-not-others-in-a-fabric-group
fabric.Marquee = fabric.util.createClass(fabric.Rect, {
  type: 'marquee',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
    this.originX = 'left'
    this.originY = 'top'
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      interaction: this.interaction,
      name: this.name,
      marquee: this.marquee,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Marquee.fromObject = function (options) {
  console.log(options)
  options.fill = '#63513d'
  return new fabric.Marquee(options)
}
fabric.Marquee.prototype.marquee = {
  source: '跑馬燈預設文字',
  transitionType: 'horizontal',
  speed: '5',
  size: 14,
  fontface: 'Open Sans',
  fontcolor: 'rgba(0,0,0,1)',
  backgroundColor: 'transparent'
}
// Create Fabric Rss Class
// http://stackoverflow.com/questions/20407546/scale-some-object-but-not-others-in-a-fabric-group
fabric.Rss = fabric.util.createClass(fabric.Rect, {
  type: 'rss',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
    this.originX = 'left'
    this.originY = 'top'
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      interaction: this.interaction,
      name: this.name,
      rssmarquee: this.rssmarquee,
      selectable: this.selectable,
      typography: this.typography
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Rss.prototype.rssmarquee = {
  type: 'custom',
  source: '',
  leastTime: '10',
  transitionType: 'random',
  transitionPeriod: '3',
  fontface: 'Open Sans',
  size: 14,
  speed: 5,
  fontcolor: 'rgba(0,0,0,1)',
  backgroundColor: 'transparent'
}
fabric.Rss.fromObject = function (options) {
  console.log(options)
  options.fill = '#508590'
  return new fabric.Rss(options)
}
// Create Fabric USB Class
fabric.Usbframe = fabric.util.createClass(fabric.Rect, {
  type: 'usbframe',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
    this.originX = 'left'
    this.originY = 'top'
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      interaction: this.interaction,
      name: this.name,
      selectable: this.selectable,
      ratio: this.ratio,
      usbframe: this.usbframe
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Usbframe.prototype.usbframe = {
  type: 'usb',
  transitionType: 'random',
  fillType: 'autoFill',
  leastTime: 10,
  transitionTime: 3
}
fabric.Usbframe.fromObject = function (options) {
  console.log(options)
  options.fill = '#bba60c'
  return new fabric.Usbframe(options)
}
// Create Fabric Webview Class
fabric.Webview = fabric.util.createClass(fabric.Rect, {
  type: 'webview',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
    this.originX = 'left'
    this.originY = 'top'
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      interaction: this.interaction,
      name: this.name,
      webview: this.webview,
      placeholder: this.placeholder,
      selectable: this.selectable,
      ratio: this.ratio,
      toolbox: this.toolbox
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Webview.fromObject = function (options) {
  console.log(options)
  options.fill = '#5e7e29'
  return new fabric.Webview(options)
}
fabric.Webview.prototype.webview = {
  url: '',
  placeholder: '',
  refreshRate: ''
}
fabric.Webview.prototype.toolbox = {
  enable: false,
  position: 'lefttop',
  size: 'medium'
}
// RTSP Class
// Create Fabric USB Class
fabric.Rtspframe = fabric.util.createClass(fabric.Rect, {
  type: 'rtspframe',
  initialize: function (options) {
    options = options || { }
    this.callSuper('initialize', options)
    this.originX = 'left'
    this.originY = 'top'
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      id: this.id,
      interaction: this.interaction,
      name: this.name,
      rtsp: this.rtsp,
      selectable: this.selectable,
      ratio: this.ratio
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Rtspframe.fromObject = function (options) {
  console.log(options)
  options.fill = '#b46b7b'
  return new fabric.Rtspframe(options)
}
// 天氣系列
// 溫度(Temperature - Text)
fabric.Temperature = fabric.util.createClass(fabric.Text, {
  type: 'temperature',
  initialize: function (element, options) {
    options || (options = {})
    this.callSuper('initialize', element, options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      interaction: this.interaction,
      location: this.location,
      name: this.name,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Temperature.fromObject = function (object) {
  return new fabric.Temperature(object.text, object)
}
// 城市(Location - Text)
fabric.Location = fabric.util.createClass(fabric.Text, {
  type: 'location',
  initialize: function (element, options) {
    options || (options = {})
    this.callSuper('initialize', element, options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      interaction: this.interaction,
      location: this.location,
      name: this.name,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Location.fromObject = function (object) {
  return new fabric.Location(object.text, object)
}
// 天氣圖片(Image)
// Video Class
fabric.Weatherimg = fabric.util.createClass(fabric.Image, {
  type: 'weatherimg',
  initialize: function (element, options) {
    options || (options = {})
    this.callSuper('initialize', element, options)
  },
  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      interaction: this.interaction,
      location: this.location,
      name: this.name,
      selectable: this.selectable
    })
  },
  _render: function (ctx) {
    this.callSuper('_render', ctx)
  }
})
fabric.Weatherimg.async = true
fabric.Weatherimg.fromURL = function (url, callback, imgOptions) {
  fabric.util.loadImage(url, function (img) {
    callback(new fabric.Weatherimg(img, imgOptions))
  }, null, imgOptions && imgOptions.crossOrigin)
}
fabric.Weatherimg.fromObject = function (object, callback) {
  fabric.util.loadImage(object.src, function (img) {
    fabric.Image.prototype._initFilters.call(object, object, function (filters) {
      object.filters = filters || []
      var instance = new fabric.Weatherimg(img, object)
      callback && callback(instance)
    })
  }, null, object.crossOrigin)
}
