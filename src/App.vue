<template lang="pug">
  #canvaseditor
    globalmis(v-bind:width="width", v-bind:height="height")
    main
      toolbar(v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl", v-bind:currentView="currentView", v-bind:width="width", v-bind:height="height")
      artboard(v-bind:currentObject="currentObject", v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl", v-bind:arrangement="arrangement")
    transition(name="normal", mode="out-in")
      contextmenu(v-if="iscontextMenu", v-bind:position="contextMenuPosition")
    transition(name="fade", mode="out-in")
      #globalLoader(v-if="globalLoader")
        .content
          img(src="./assets/images/globalloader.gif")
          span Progressing
    transition(name="fade", mode="out-in")
      #globalError(v-if="globalError")
        .content
          .icon
            .fa.fa-exclamation.fa-lg
          span {{globalError}}
          .timer-wrapper
            .timer(:style="'width:' + globalErrorProgress + '%;'")
</template>

<script>
import Artboard from './components/Artboard'
import Toolbar from './components/Toolbar'
import Contextmenu from './components/Contextmenu'
import Globalmis from './components/globalMis'
import Events from './assets/cc.objectEvents'
import Load from './assets/canvascomposer/Load'
import Utils from './assets/canvascomposer/Utils'
export default {
  name: 'CanvasEditor',
  components: {
    Artboard,
    Toolbar,
    Contextmenu,
    Globalmis
  },
  data () {
    return {
      arrangement: false,
      currentObject: null,
      initialRadius: 100,
      width: null,
      height: null,
      baseUrl: 'http://radi.4webdemo.com/',
      history: {
        redo: [],
        undo: [],
        state: null
      },
      currentView: '',
      globalLoader: false,
      globalError: null,
      globalErrorProgress: 100,
      iscontextMenu: false,
      contextMenuPosition: [0, 0]
    }
  },
  created () {
    this.$on('triggerContextMenu', function (position) {
      this.iscontextMenu = true
      this.contextMenuPosition = position
    })
    this.$on('closeContextMenu', function () {
      this.iscontextMenu = false
    })
    this.$on('updateHistory', function (res) {
      this.updateHistory()
      console.info('Canvas States Updated.')
    })
    this.$on('updateSubmenu', function (res) {
      this.currentView = res
    })
    this.$on('disposeAll', function (res) {
      this.dispose()
    })
    this.$on('globalLoad', function (res) {
      this.globalLoader = res
    })
    this.$on('globalError', function (res) {
      this.globalError = res
      this.globalErrorProgressCountDown()
      setTimeout(() => (this.globalError = null), 3000)
    })
    this.$on('loadPreset', (res) => {
      this.$swal({
        title: '確定刪除？',
        text: '這個動作會清除畫面中所有物件',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定刪除'
      }).then(() => {
        this.loadFromPreset(res)
        this.updateHistory()
        this.$swal(
          '已刪除',
          '畫面已清空',
          'success'
        )
      })
    })
    this.$on('triggerArrangement', function (res) {
      this.arrangement = res
      // DeselectAll
      var canvas = window['canvas']
      canvas.deactivateAllWithDispatch()
      canvas.renderAll()
    })
  },
  mounted () {
    this.initial()
    // Global Close SubMenu
    var instance = this
    var artBoard = document.getElementById('artboard')
    artBoard.addEventListener('mousedown', function () {
      instance.currentView = null
    })
  },
  watch: {
    'currentObject': 'arrangementControl'
  },
  methods: {
    initial () {
      this.keyBoardControl()
    },
    globalErrorProgressCountDown () {
      this.globalErrorProgress = 0
    },
    arrangementControl () {
      if (this.currentObject) {
        this.arrangement = false
      }
    },
    updateCanvasSize () {
      var canvas = window['canvas']
      this.width = canvas.width
      this.height = canvas.height
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
    loadFromPreset (data) {
      var component = this
      this.globalLoader = true
      Load.fromJSON(data, function (res) {
        component.globalLoader = false
      })
    },
    loadFromJSON (data) {
      var canvas = window['canvas']
      var component = this
      canvas.loadFromJSON(data, canvas.renderAll.bind(canvas), function (o, object) {
        canvas.renderAll()
        Events.bindEvents(component, object)
      })
    },
    dispose () {
      var instance = this
      var canvas = window['canvas']
      instance.$swal({
        title: '確定刪除？',
        text: '這個動作會清除畫面中所有物件',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定刪除'
      }).then(function () {
        for (var i = 0; i < canvas._objects.length; i++) {
          // obj = canvas._objects[i];
          if (canvas._objects[i]._element !== undefined && canvas._objects[i]._element.localName === 'video') {
            canvas._objects[i].getElement().pause()
          }
        }
        canvas.clear()
        instance.updateHistory()
        instance.$swal(
          '已刪除',
          '畫面已清空',
          'success'
        )
      })
    },
    keyBoardControl () {
      var instance = this
      var map = {8: false, 91: false, 187: false, 189: false, 40: false, 38: false, 68: false, 16: false, 17: false, 76: false, 90: false}
      window.addEventListener('keydown', function (e) {
        if (e.keyCode in map) {
          map[e.keyCode] = true
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
            Utils.removeObject()
            map[8] = false
            map[46] = false
            map[17] = false
          } else if (map[38] && map[91]) {
            // //////////////////////
            // Command + Arrow Up ///
            // //////////////////////
            // BringToFront
            e.preventDefault(); e.stopPropagation()
            Utils.layertop()
            map[38] = false
          } else if (map[187] && map[91]) {
            // /////////////////
            // Command + '+' ///
            // /////////////////
            // BringForward
            e.preventDefault(); e.stopPropagation()
            Utils.layerup()
            map[187] = false
          } else if (map[189] && map[91]) {
            e.preventDefault(); e.stopPropagation()
            // Send Backwards
            // /////////////////
            // Command + '-' ///
            // /////////////////
            Utils.layerdown()
            map[189] = false
          } else if (map[40] && map[91]) {
            e.preventDefault(); e.stopPropagation()
            // Send Bottom
            // ////////////////////////
            // Command + Arrow Down ///
            // ////////////////////////
            Utils.layerbottom()
            map[40] = false
          } else if (map[68] && map[17]) {
            e.preventDefault(); e.stopPropagation()
            // Duplicate
            // ////////////////
            // Control + D ///
            // ///////////////
            Utils.duplicate()
            map[68] = false
          } else if (map[76] && map[91]) {
            e.preventDefault(); e.stopPropagation()
            // Lock
            // ////////////////
            // Command + L ///
            // ///////////////
            Utils.lock()
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
// @import "../node_modules/font-awesome/scss/font-awesome";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "./bower_components/normalize-css/normalize";
@import "./assets/scss/var";
@import "./assets/scss/base";
@import "./assets/scss/helpers";
@import "./assets/scss/forms";
@import "./assets/scss/typography";
@import "./assets/scss/dependencies/jquery.mCustomScrollbar";
@import "./assets/scss/dependencies/spectrum";
#globalLoader {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darken($darkestgray, 10%);
  box-shadow: 0 3px 3px $pureblack;
  z-index: 99;
  .content {
    padding: .5em 0 1em 0;
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
  z-index: 999;
  .content {
    display: inline-block;
    vertical-align: middle;
    color: $white;
    box-shadow: 0 1px 3px $pureblack;
    .icon {
      background-color: $red;
      display: inline-block;
      vertical-align: middle;
      padding: 0.8em 1em;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      padding: 0.8em 1em;
      background-color: $red;
      // color: $black;
    }
  }
  .timer-wrapper {
    background-color: darken($red, 20%);
  }
  .timer {
    width: 100%; 
    height: 5px;
    background-color: darken($red, 15%);
    transition: 3s all ease;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: .6s all ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  // width: 0;
  // padding: 0;
  // transform: translateX(40%)
}
.normal-enter-active, .normal-leave-active {
  transition: .1s all ease;
}
.normal-enter, .normal-leave-active {
  // opacity: 0;
  // padding: 0;
  transform-origin: left top;
  transform: scale(0);
}
.floating-menu {
  &.fly-enter-active, &.fly-leave-active {
  transition: .2s all ease;
}
  &.fly-enter, &.fly-leave-active {
    opacity: 0;
    padding: 0;
    transform: rotate3d(0, 1, 0, 90deg) translate3d(0, 0, -130px);
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
    height: calc( 100% - 50px );
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

</style>
