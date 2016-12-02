<template lang="pug">
  #canvasLayers
    .canvaslayer-wrapper
      .obj-list
        .obj-layer(v-for="layer in layers", :key="layer.id", @click="getItem(layer.id)", :class="{active:compare(layer.id)}")
          .type {{layer.type}}
          .name
            input(type='text', v-bind:value="layer.name || 'undefined'", readonly, @dblclick.prevent.stop="editable", @keyup.enter="confirmedInput")
          .id
            .fa.fa-lg.fa-trash
</template>

<script>
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports?$=jquery!../assets/vendor/jquery.mousewheel.js')
require('imports?$=jquery!../assets/vendor/jquery.mCustomScrollbar.js')
export default {
  name: 'Layers',
  components: {
  },
  data () {
    return {
      layers: null
    }
  },
  created () {
    this.$nextTick(() => {
      window.bus.$on('updateScene', () => {
        this.updateScene()
      })
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.updateScene()
      console.log($('.canvaslayer-wrapper'))
      $('.canvaslayer-wrapper').mCustomScrollbar({
        theme: 'light',
        alwaysShowScrollbar: 1
      })
    })
  },
  props: ['currentObject'],
  methods: {
    compare (id) {
      if (this.currentObject) {
        if (id === this.currentObject.id) {
          return true
        } else {
          return false
        }
      }
    },
    updateScene () {
      // this.$forceUpdate()
      var canvas = window['canvas']
      if (canvas) {
        this.layers = canvas._objects
      }
    },
    getItem (id) {
      console.log('trugg')
      var canvas = window['canvas']
      // Find Object has matched ID
      for (var i = 0; i < canvas._objects.length; i++) {
        if (canvas._objects[i].id === id) {
          canvas.setActiveObject(canvas._objects[i])
        }
      }
    },
    editable (e) {
      // e.target.
      e.target.readOnly = !e.target.readOnly
      // console.log(e)
      // console.log(e.target)
    },
    confirmedInput (e) {
      console.log(e)
      e.target.readOnly = true
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "../assets/scss/buttons";
#canvasLayers {
  box-sizing: border-box;
  flex: none;
  width: 310px;
  height: 100%;
  font-size: 13px;
  border-top: 2px solid $pureblack;
  background-color: #535353;
  position: relative;
  &.fade-enter-active, &.fade-leave-active {
    transition: .2s all ease;
  }
  input[readonly] {
    background-color: #535353;
    border: 0;
    border-color: transparent;
    color: $gray;
    text-shadow: none;
    transition: .3s all ease;
  }
  h3 {
    padding: 0 1em;
  }
  .mCSB_inside > .mCSB_container {
    margin-right: 16px;
  }
  .mCSB_scrollTools {
    background-color: darken(#535353, 10%);
    .mCSB_draggerContainer {
      top: 3px;
      bottom: 3px;
    }
    .mCSB_draggerRail {
      background: transparent;
    }
    .mCSB_dragger .mCSB_dragger_bar {
      width: 10px;
      background-color: lighten(#535353, 10%);
    }
  }
  .canvaslayer-wrapper {
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    color: $gray;
    .obj-list {
      background-color: #535353;
    }
  }
  .obj-layer {
    display: flex;
    -webkit-align-content: center;
    align-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    border-bottom: 1px solid darken($darkgray, 15%);
    transition: .3s all ease;
    padding: 0 0 0 1em;
    &:hover {
      cursor: pointer;
      background-color: lighten(#535353, 5%);
      input[readonly] {
        background-color: lighten(#535353, 5%);
        border: 1px dotted lighten(#535353, 15%);
      }
    }
    &:active, &.active {
      cursor: pointer;
      color: $white;
      background-color: lighten(#535353, 15%);
      input[readonly] {
        background-color: lighten(#535353, 15%);
        border: 1px dotted lighten(#535353, 25%);
        &:hover {
          box-shadow: inset 0px 0px 3px rgba($black, 10%);
        }
      }
    }
    div {
      padding: 0 .5em;
      box-sizing: border-box;
    }
    .type {
      width: 50px;
      flex: initial;
      align-self: center;
      padding: .5em;
    }
    .name {
      flex: 1;
      align-self: stretch;
      padding: .5em;
      border-right: 1px solid darken($darkgray, 15%);
    }
    .id {
      padding: .5em;
      flex: initial;
      overflow: hidden;
      white-space: nowrap;
      align-self: center;
    }
  }
}
</style>
