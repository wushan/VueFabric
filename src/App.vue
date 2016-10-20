<template lang="pug">
  #canvaseditor
    main
      toolbar(v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl", v-bind:currentView="currentView")
      artboard(v-bind:currentObject="currentObject", v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl")
    contextmenu
    programlist
</template>

<script>
import Artboard from './components/Artboard'
import Toolbar from './components/Toolbar'
import Contextmenu from './components/Contextmenu'
import Programlist from './components/Programlist'
import Events from './assets/cc.objectEvents'
import Utils from './assets/canvascomposer/Utils'
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
      currentObject: null,
      initialRadius: 100,
      baseUrl: 'http://radi.4webdemo.com/',
      history: {
        redo: [],
        undo: [],
        state: null
      },
      currentView: ''
    }
  },
  created () {
    this.$on('updateHistory', function (res) {
      this.updateHistory()
      console.info('Canvas States Updated.')
    })
    this.$on('updateSubmenu', function (res) {
      this.currentView = res
    })
  },
  mounted () {
    // console.log('APP')
    this.initial()
  },
  methods: {
    initial () {
      console.log('initial')
      this.keyBoardControl()
    },
    updateHistory () {
      var canvas = window['canvas']
      // clear the redo stack
      this.history.redo = []
      // $('#redo').addClass('disabled')
      // initial call won't have a state
      // console.log(state)
      if (this.history.state) {
        this.history.undo.push(this.history.state)
      }
      this.history.state = JSON.stringify(canvas)
    },
    rePlayHistory (playStack, saveStack) {
      if (this.history.state) {
        this.history.redo.push(this.history.state)
      }
      this.history.state = this.history.undo.pop()
      // var on = $(buttonsOn)
      // var off = $(buttonsOff)
      // turn both buttons off for the moment to prevent rapid clicking
      // on.addClass('disabled')
      // off.addClass('disabled')
      // canvas.clear()
      if (this.history.state) {
        this.loadFromJSON(this.history.state)
      } else {
        console.log('Reach Limit')
      }
    },
    loadFromJSON (data) {
      var canvas = window['canvas']
      var component = this
      canvas.loadFromJSON(data, canvas.renderAll.bind(canvas), function (o, object) {
        canvas.renderAll()
        Events.bindEvents(component, object)
      })
    },
    keyBoardControl () {
      var map = {8: false, 91: false, 187: false, 189: false, 40: false, 38: false, 68: false, 16: false, 17: false, 76: false, 90: false}
      window.addEventListener('keydown', function (e) {
        var canvas = window['canvas']
        if (e.keyCode in map) {
          map[e.keyCode] = true
          var obj = canvas.getActiveObject()
          if (map[16] && map[90] && map[91]) {
            // Redo
            e.preventDefault(); e.stopPropagation()
            // CanvasComposer.History.rePlay(redo, undo, '#undo', this)
            map[90] = false
          } else if (map[90] && map[91] && !map[16]) {
            // Undo
            e.preventDefault(); e.stopPropagation()
            // CanvasComposer.History.rePlay(undo, redo, '#redo', this)
            map[90] = false
          } else if (map[8] && map[17] || map[46] && map[17]) {
            // Delete
            e.preventDefault(); e.stopPropagation()
            // CanvasComposer.Artboard.removeObject()
            Utils.removeObject()
            map[8] = false
            map[46] = false
            map[17] = false
          } else if (map[38] && map[91]) {
            // BringToFront
            e.preventDefault(); e.stopPropagation()
            // var obj = canvas.getActiveObject()
            obj.bringToFront()
            map[38] = false
          } else if (map[187] && map[91]) {
            // BringForward
            e.preventDefault(); e.stopPropagation()
            // var obj = canvas.getActiveObject()
            obj.bringForward()
            map[187] = false
          } else if (map[189] && map[91]) {
            // Send Backwards
            e.preventDefault(); e.stopPropagation()
            // var obj = canvas.getActiveObject()
            obj.sendBackwards()
            map[189] = false
          } else if (map[40] && map[91]) {
            // Send Bottom
            e.preventDefault(); e.stopPropagation()
            // var obj = canvas.getActiveObject()
            obj.sendToBack()
            map[40] = false
          } else if (map[68] && map[17]) {
            // Duplicate
            e.preventDefault(); e.stopPropagation()
            // CanvasComposer.Artboard.duplicateObject()
            map[68] = false
          } else if (map[76] && map[91]) {
            // Lock
            e.preventDefault(); e.stopPropagation()
            // CanvasComposer.Artboard.lockObject()
            map[76] = false
          }
        }
      })
      window.addEventListener('keyup', function (e) {
        if (e.keyCode in map) {
          map[e.keyCode] = false
        }
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
.fade-enter-active, .fade-leave-active {
  transition: .6s all ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  width: 0;
  padding: 0;
  // transform: translateX(40%)
}
.floating-menu {
  &.fly-enter-active, &.fly-leave-active {
  transition: .6s all ease;
}
  &.fly-enter, &.fly-leave-active {
    opacity: 0;
    padding: 0;
    width: 0;
    font-size: 0;
    // transform: translateX(-100%)
  } 
}
// Basic Style
a {
  color: $white;
  text-decoration: none;
}
// Layouts
#canvaseditor {
  height: 100vh ;
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
  // min-width: 60px
    }
    #artboard {
      flex: 1;
      display: flex;
      height: 100%;
    }
  }
}
#attributes {
  box-sizing: border-box;
  padding: 1em;
  flex: none;
  width: 260px;
  height: 100%;
}
</style>
