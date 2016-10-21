<template lang="pug">
  #canvaseditor
    main
      toolbar(v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl", v-bind:currentView="currentView")
      artboard(v-bind:currentObject="currentObject", v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl")
    contextmenu
    programlist
    transition(name="fade", mode="out-in")
      #globalLoader(v-if="globalLoader")
        .content
          img(src="./assets/images/globalloader.gif")
          span loading
    transition(name="fade", mode="out-in")
      #globalError(v-if="globalError")
        .content
          .icon
            .fa.fa-exclamation.fa-lg
          span {{globalError}}
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
      currentView: '',
      globalLoader: false,
      globalError: null
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
    this.$on('globalLoad', function (res) {
      this.globalLoader = res
    })
    this.$on('globalError', function (res) {
      this.globalError = res
      setTimeout(() => (this.globalError = null), 3000)
    })
  },
  mounted () {
    // console.log('APP')
    this.initial()
    // Global Close SubMenu
    var instance = this
    var artBoard = document.getElementById('artboard')
    artBoard.addEventListener('mousedown', function () {
      instance.currentView = null
    })
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
      console.log(playStack)
      console.log(Array.isArray(saveStack))
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
      var instance = this
      var map = {8: false, 91: false, 187: false, 189: false, 40: false, 38: false, 68: false, 16: false, 17: false, 76: false, 90: false}
      window.addEventListener('keydown', function (e) {
        var canvas = window['canvas']
        if (e.keyCode in map) {
          map[e.keyCode] = true
          var obj = canvas.getActiveObject()
          if (map[16] && map[90] && map[91]) {
            // Redo
            e.preventDefault(); e.stopPropagation()
            instance.rePlayHistory(instance.history.redo, instance.history.undo)
            map[90] = false
          } else if (map[90] && map[91] && !map[16]) {
            // Undo
            e.preventDefault(); e.stopPropagation()
            console.log(instance.history.undo)
            console.log(instance.history.redo)
            instance.rePlayHistory(instance.history.undo, instance.history.redo)
            // CanvasComposer.History.rePlay(undo, redo, '#redo', this)
            map[90] = false
          } else if (map[8] && map[17] || map[46] && map[17]) {
            // Delete
            e.preventDefault(); e.stopPropagation()
            instance.$swal({
              title: '確定刪除？',
              text: '刪除後可使用 Ctrl + Z 組合鍵回復',
              type: 'warning',
              showCancelButton: true,
              cancelButtonText: '取消',
              confirmButtonText: '確定刪除'
            }).then(function () {
              Utils.removeObject(function () {
                instance.updateHistory()
              })
              instance.$swal(
                '已刪除',
                '所選項目已刪除',
                'success'
              )
            })
            // console.log(this)
            // var checkYourMind = window.confirm('確定刪除？')
            // if (checkYourMind === true) {
            //   Utils.removeObject()
            // }
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
#globalLoader {
  position: absolute;
  top: 0;
  right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    span {
      display: block;
    }
  }
}
#globalError {
  position: absolute;
  bottom: 2em;
  width: 100%; 
  text-align: center;
  .content {
    display: inline-block;
    vertical-align: middle;
    box-shadow: 0 1px 3px $pureblack;
    .icon {
      background-color: $red;
      color: $white;
      display: inline-block;
      vertical-align: middle;
      padding: 0.8em 1em;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      padding: 0.8em 1em;
      background-color: $white;
      color: $black;
    }
  }
}
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
