/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Event from './assets/cc.objectEvents'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

var canvas = new fabric.CanvasEx('c', {
  width: 500,
  height: 500,
  allowTouchScrolling: true
})
//Register to window.global
window.canvas = canvas;


//MASK RECT
var mask = new fabric.Rect({
    left: 0,
    top: 0,
    fill: '#ffcccc',
    width: 400,
    height: 400,
    padding: 0,
    strokeWidth: 0
    // clipTo: function (ctx) {
    //   // ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
    //   ctx.rect(-75,-50,300,100);
    // }
  });
  mask.toObject = (function(toObject) {
    return function() {
      return fabric.util.object.extend(toObject.call(this), {
        interaction: this.interaction
      });
    };
  })(mask.toObject);
  mask.perPixelTargetFind = true;
  // // canvas.add(rect);
  // canvas.renderAll();
  // //Programmatically Select Newly Added Object
  // canvas.setActiveObject(rect);
  // //Refresh log

var rect = new fabric.Rect({
    left: 25,
    top: 25,
    fill: 'green',
    width: 600,
    height: 100,
    padding: 0,
    strokeWidth: 0
    // clipTo: function (ctx) {
    //   // ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
    //   ctx.rect(-75,-50,300,100);
    // }
  });
  rect.toObject = (function(toObject) {
    return function() {
      return fabric.util.object.extend(toObject.call(this), {
        interaction: this.interaction
      });
    };
  })(rect.toObject);
  rect.perPixelTargetFind = true;
  // // canvas.add(rect);
  // canvas.renderAll();
  // //Programmatically Select Newly Added Object
  // canvas.setActiveObject(rect);
  // //Refresh log

var rect2 = new fabric.Rect({
    left: -50,
    top: 50,
    fill: '#ff0000',
    width: 300,
    height: 100,
    padding: 0,
    strokeWidth: 0,
    clipTo: function (ctx) {
      // ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
      ctx.rect(-100,-50,250,100);
    }
  });
  rect2.toObject = (function(toObject) {
    return function() {
      return fabric.util.object.extend(toObject.call(this), {
        interaction: this.interaction
      });
    };
  })(rect2.toObject);
  rect2.perPixelTargetFind = true;
  // canvas.add(rect2);
  // canvas.setActiveObject(rect2);

fabric.Image.fromURL('https://www.google.com/images/srpr/logo3w.png', function(oImg) {
  oImg.left = 100;
  oImg.top = 100;
  //GROUP 中心點
  var group = new fabric.Group([ mask, rect, rect2, oImg ], {
    left: 50,
    top: 0
  });
  canvas.add(group);
  canvas.setActiveObject(group);
  //Release Mask
  group.on('object:dblclick', function (options) {
    console.log(group);
    // for (var i=0; i < group._objects.length; i++) {
    //   group._objects[i].clipTo = '';
    //   canvas.renderAll();
    // }
    var obj = canvas.getActiveObject();
    Event.ungroup(obj);
  });
});


