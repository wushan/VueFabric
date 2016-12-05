<template lang="pug">
  #canvasLayers
    .canvaslayer-wrapper
      draggable.obj-list(v-bind:list="viewLayers", :options="{handle:'.type'}", @start="startDragging", @end="endDragging")
        .obj-layer(v-for="layer in viewLayers", :key="layer.id", @click="getItem(layer.id)", :class="{active:compare(layer.id)}")
          .type
            .fa.fa-bars(title="layer.type")
          .name
            input(type='text', v-bind:value="layer.name || 'undefined'", readonly, @dblclick.prevent.stop="editable", @keyup.enter="confirmedInput")
          .control
            .fa.fa-lg.fa-trash(v-if="compare(layer.id)", @click.prevent.stop="deleteObject")
            .fa.fa-lg.fa-hand-pointer-o(v-else)
          transition(name="slide", mode="out-in")
            .additional(v-if="compare(layer.id)") {{layer.id}}
</template>

<script>
import draggable from 'vuedraggable'
import Utils from '../assets/canvascomposer/Utils'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports?$=jquery!../assets/vendor/jquery.mousewheel.js')
require('imports?$=jquery!../assets/vendor/jquery.mCustomScrollbar.js')
export default {
  name: 'Layers',
  components: {
    draggable
  },
  data () {
    return {
      layers: [],
      dragging: false
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
  computed: {
    viewLayers () {
      return this.layers.slice().reverse()
    }
  },
  methods: {
    startDragging () {
      this.dragging = true
    },
    endDragging () {
      this.dragging = false
      var canvas = window['canvas']
      // Save Current order back to canvas and remember the softcopy
      canvas._objects = this.viewLayers.slice().reverse()
      canvas.renderAll()
    },
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
      console.log('SCENE UPPPDATEEEEE!')
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
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      obj.set('name', e.target.value)
    },
    deleteObject () {
      Utils.removeObject()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "../assets/scss/buttons";
.slide-enter-active, .slide-leave-active {
  transition: .3s all ease;
}
.slide-enter, .slide-leave-active {
  // opacity: 0;
  transform: translateY(100%);
} 
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
    flex-wrap: wrap;
    -webkit-align-content: center;
    align-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    border-bottom: 1px solid darken($darkgray, 15%);
    transition: .3s all ease;
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
      .additional {
        display: block;
      }
    }
    div {
      padding: 0 .5em;
      box-sizing: border-box;
    }
    .type {
      text-align: center;
      width: 45px;
      flex: initial;
      align-self: center;
      padding: .5em;
      cursor: move;
    }
    .name {
      flex: 1;
      align-self: stretch;
      padding: .5em;
      border-right: 1px solid darken($darkgray, 15%);
      border-left: 1px solid darken($darkgray, 15%);
    }
    .control {
      padding: .5em;
      flex: initial;
      width: 45px; 
      overflow: hidden;
      white-space: nowrap;
      align-self: center;
    }
    .additional {
      display: none;
      width: 100%;
      padding: .8em 0 .8em 1em;
      // background-color: $darkgray;
      border-top: 1px solid darken($darkgray, 15%);
      background-color: lighten(#535353, 15%);
    }
  }
}
</style>
