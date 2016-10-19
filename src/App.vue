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
    },
    updateHistory () {
      var canvas = window['canvas']
      // clear the redo stack
      this.history.redo = []
      // $('#redo').addClass('disabled')
      // initial call won't have a state
      // console.log(state);
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
      // var on = $(buttonsOn);
      // var off = $(buttonsOff);
      // turn both buttons off for the moment to prevent rapid clicking
      // on.addClass('disabled');
      // off.addClass('disabled');
      // canvas.clear();
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
  // transform: translateX(40%);
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
    // transform: translateX(-100%);
  } 
}
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
