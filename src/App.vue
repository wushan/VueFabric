<template lang="pug">
  #canvaseditor
    parser(v-if="preview")
    globalmis(v-bind:width="width", v-bind:height="height", v-bind:canvasLayer="canvasLayer")
    main
      toolbar(v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl", v-bind:currentView="currentView", v-bind:width="width", v-bind:height="height")
      artboard(v-bind:canvasLayer="canvasLayer", v-bind:currentObject="currentObject", v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl", v-bind:arrangement="arrangement", v-bind:interaction="interaction")
        .mouseplace(slot="mouseplace") {{mouseplace}}
    transition(name="normal", mode="out-in")
      contextmenu(v-if="iscontextMenu", v-bind:position="contextMenuPosition", v-bind:currentObject="currentObject")
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
import Parser from './components/Parser'
// import Events from './assets/cc.objectEvents'
import Load from './assets/canvascomposer/Load'
import Keyboard from './assets/canvascomposer/Keyboard'
export default {
  name: 'CanvasEditor',
  components: {
    Artboard,
    Toolbar,
    Contextmenu,
    Globalmis,
    Parser
  },
  data () {
    return {
      preview: false,
      arrangement: false,
      interaction: false,
      canvasLayer: false,
      autoSelection: false,
      currentObject: null,
      mouseplace: null,
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
    this.$on('closePreview', () => {
      this.preview = false
    })
    this.$on('AutoSelection', () => {
      this.autoSelection = !this.autoSelection
      // if (this.autoSelection) {
      //   var canvas = window['canvas']
      //   for (var i = 0; i < canvas._objects.length; i++) {
      //   }
      // }
    })
    this.$on('adjustPosition', (pos) => {
      console.log(pos)
      this.contextMenuPosition[1] = pos[0]
    })
    this.$on('toggleCanvasLayer', () => {
      this.canvasLayer = !this.canvasLayer
    })
    this.$on('undo', () => {
      this.rePlayHistory(this.history.undo, this.history.redo)
    })
    this.$on('redo', () => {
      this.rePlayHistory(this.history.redo, this.history.undo)
      console.log('redo')
    })
    this.$on('triggerPreview', function () {
      this.preview = true
    })
    this.$on('triggerContextMenu', function (position) {
      if (this.iscontextMenu) {
        // Context Menu is already there, update position
        this.contextMenuPosition = position
      } else {
        this.iscontextMenu = true
        this.contextMenuPosition = position
      }
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
      this.interaction = false
      this.arrangement = res
      // DeselectAll
      var canvas = window['canvas']
      canvas.deactivateAllWithDispatch()
      canvas.renderAll()
    })
    this.$on('triggerInteraction', function (res) {
      this.arrangement = false
      this.interaction = res
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
      Keyboard.onBind()
    },
    globalErrorProgressCountDown () {
      this.globalErrorProgress = 0
    },
    arrangementControl () {
      if (this.currentObject) {
        this.arrangement = false
        this.interaction = false
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
      if (this.history.state) {
        saveStack.push(this.history.state)
      }
      this.history.state = playStack.pop()
      if (this.history.state) {
        this.loadFromJSON(this.history.state)
      } else {
        // Reach Limit
        this.globalError = '沒有紀錄'
        this.globalErrorProgressCountDown()
        setTimeout(() => (this.globalError = null), 3000)
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
      // var canvas = window['canvas']
      // var component = this
      // canvas.loadFromJSON(data, canvas.renderAll.bind(canvas), function (o, object) {
      //   canvas.renderAll()
      //   Events.bindEvents(component, object)
      // })
      Load.fromJSON(data, () => {
        console.log('loaded.')
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
        canvas.renderAll()
        window.bus.$emit('updateScene')
        instance.updateHistory()
        instance.$swal(
          '已刪除',
          '畫面已清空',
          'success'
        )
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
      padding: 1em .5em;
      flex: initial;
      width: 75px;
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
