<template lang="pug">
  #canvaseditor
    main
      toolbar
      artboard(v-bind:currentObject="currentObject")
    contextmenu
    programlist
</template>

<script>
import Artboard from './components/Artboard'
import Toolbar from './components/Toolbar'
import Contextmenu from './components/Contextmenu'
import Programlist from './components/Programlist'
var fabric = window['fabric']
export default {
  name: 'CanvasEditor',
  components: {
    Artboard,
    Toolbar,
    Contextmenu,
    Programlist
  },
  data () {
    return {
      currentObject: null
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    initial () {
      // refer root component
      var rootapp = this
      var canvas = new fabric.CanvasEx('c', {
        width: 500,
        height: 500,
        allowTouchScrolling: true
      })
      // Register to window.global
      window.canvas = canvas

      // Canvas Events
      canvas.on('before:selection:cleared', function () {
        rootapp.currentObject = null
      })
      // MASK RECT
      var rect = new fabric.Rect({
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
      canvas.renderAll()
      this.bindEvents(rect)
    },
    bindEvents (obj) {
      var rootapp = this
      obj.on('selected', function () {
        console.log('selected')
        console.log(this)
        rootapp.currentObject = obj.toObject()
        console.log(rootapp)
      })
      obj.on('moved', function () {
        console.log('selected')
        console.log(this)
        rootapp.currentObject = obj.toObject()
        console.log(rootapp)
      })
    }
  }
}
</script>

<style lang="scss">
@import "./node_modules/font-awesome/scss/font-awesome";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "./bower_components/normalize-css/normalize";
@import "./assets/scss/var";
@import "./assets/scss/base";
@import "./assets/scss/helpers";
@import "./assets/scss/forms";
@import "./assets/scss/typography";
@import "./assets/scss/dependencies/jquery.mCustomScrollbar";
// Basic Style
a {
  color: $white;
  text-decoration: none;
}
// Layouts
#canvaseditor {
  height: 100vh; 
  background-color: $black;
  color: $white;
  main {
    height: 100%; 
    display: flex; 
    #toolbar {
      box-sizing: border-box;
      padding: 1em;
      flex: initial;
      width: 90px;
  // min-width: 60px;
    }
    #artboard {
      flex: 1;
      display: flex;
      height: 100%; 
      .canvas-wrapper {
        flex: 1;
        background-color: $darkestgray;
        box-shadow: inset 0px 0px 12px $pureblack;
      }
      #attributes {
        box-sizing: border-box;
        padding: 1em;
        flex: none;
        width: 260px;
        height: 100%;
        transition: 3s all ease;
      }
    }
  }
}
</style>
