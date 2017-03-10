<template lang="pug">
  #canvasLayers
    .canvas-objectIsolation
      .isolation-handle(@click="toggleIsolation", :class="{active:isolated}")
        span ISOLATE
        .handle
    .canvaslayer-wrapper(v-show="isolated")
      .obj-list(v-bind:list="viewLayers", :options="{handle:'.type'}", @start="startDragging", @end="endDragging")
        .obj-layer(v-for="layer in viewLayers", :key="layer.id", @click="getItem(layer.id)", :class="{active:compare(layer.id), usbframe:layer.type === 'usbframe', www:layer.type === 'webview', rtsp:layer.type === 'rtspframe', marquee:layer.type === 'marquee', rss:layer.type === 'rss'}", v-if="compare(layer.id)")
          .type
            .button
              .fa.fa-lg.fa-chain(v-if="layer.lockUniScaling")
              .fa.fa-lg.fa-chain-broken(v-else)
          .name
            input(type='text', v-bind:value="layer.name || 'undefined'", readonly, @dblclick.prevent.stop="editable", @keyup.enter="confirmedInput")
          .control
            .fa.fa-lg.fa-trash(v-if="compare(layer.id)", @click.prevent.stop="deleteObject")
            .fa.fa-lg.fa-hand-pointer-o(v-else)
          transition(name="slide", mode="out-in")
            .additional(v-if="compare(layer.id)") {{layer.id}}
    .canvaslayer-wrapper(v-show="!isolated")
      draggable.obj-list(v-bind:list="viewLayers", :options="{handle:'.type'}", @start="startDragging", @end="endDragging")
        .obj-layer(v-for="layer in viewLayers", :key="layer.id", @click="getItem(layer.id)", :class="{active:compare(layer.id), usbframe:layer.type === 'usbframe', www:layer.type === 'webview', rtsp:layer.type === 'rtspframe', marquee:layer.type === 'marquee', rss:layer.type === 'rss'}")
          .type
            //- .fa.fa-bars(title="layer.type")
            .button
              .fa.fa-lg.fa-chain(v-if="layer.lockUniScaling")
              .fa.fa-lg.fa-chain-broken(v-else)
              span.lockUniScaling(v-if="layer.lockUniScaling") {{layer.ratio.w}}: {{layer.ratio.h}}
          .name
            input(type='text', v-bind:value="layer.name || 'undefined'", readonly, @dblclick.prevent.stop="editable", @keyup.enter="confirmedInput")
          .control
            .button
              .fa.fa-lg.fa-unlock(v-if="layer.selectable")
              .fa.fa-lg.fa-lock(v-else)
              .locktip 請先以圖層選取物件後，以快捷鍵(Ctrl + L)或右鍵選單解鎖物件。
          //- transition(name="slide", mode="out-in")
          //-   .additional(v-if="compare(layer.id)") {{layer.id}}
</template>

<script>
import draggable from 'vuedraggable'
import Utils from '../assets/canvascomposer/Utils'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports-loader?$=jquery!../assets/vendor/jquery.mousewheel.js')
require('imports-loader?$=jquery!../assets/vendor/jquery.mCustomScrollbar.js')
export default {
  name: 'Layers',
  components: {
    draggable
  },
  data () {
    return {
      layers: [],
      dragging: false,
      isolated: false
    }
  },
  created () {
    // this.$nextTick(() => {
    //   window.bus.$on('updateScene', () => {
    //     console.log('sceneupdate')
    //     this.updateScene()
    //   })
    // })
    window.bus.$on('updateScene', () => {
      console.log('sceneupdate')
      this.$nextTick(() => {
        this.updateScene()
      })
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.updateScene()
      $('.canvaslayer-wrapper').mCustomScrollbar({
        theme: 'light',
        alwaysShowScrollbar: 1
      })
    })
  },
  props: ['currentObject'],
  computed: {
    viewLayers () {
      console.log('computed')
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
      var canvas = window['canvas']
      if (canvas) {
        // a shallow copy
        this.layers = canvas._objects.slice()
        this.$forceUpdate()
      }
    },
    getItem (id) {
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
      e.target.readOnly = true
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      obj.set('name', e.target.value)
    },
    deleteObject () {
      Utils.removeObject()
    },
    toggleIsolation () {
      this.isolated = !this.isolated
      Utils.isolation(this.isolated)
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
  background-color: $darkestgray;
  position: relative;
  &.fade-enter-active, &.fade-leave-active {
    transition: .2s all ease;
  }
  .mCSB_container {
    overflow: auto;
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
  .canvas-objectIsolation {
    padding: .5em 1em;
    border-bottom: 2px solid $pureblack;
    background-color: darken($darkestgray, 5%);
    text-align: right;
  }
  .isolation-handle {
    display: inline-block;
    vertical-align: middle;
    line-height: 1; 
    transition: .3s all ease;
    cursor: pointer;
    text-align: center;
    background-color: $gray;
    color: $darkgray;
    border-radius: 15px;
    width: 76px; 
    position: relative;
    margin-right: .5em;
    &.active {
      color: $white;
      background-color: darken($red, 20%);
      .handle {
        margin-left: 48px;
        background-color: lighten($red, 10%);
      }
    }
    span {
      display: block;
      font-size: 12px;
      letter-spacing: 2px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      line-height: 30px; 
    }
    .handle {
      position: relative;
      border-radius: 50%;
      background-color: rgba(#535353, 1);
      transition: .3s all ease;
      width: 26px;
      height: 26px;
      margin: 2px;
    }
    &:hover {
      // color: $white;
      .handle {
        // background-color: rgba(#535353, 1);
      }
    }
  }
  .mCSB_inside > .mCSB_container {
    margin-right: 10px;
  }
  .mCSB_scrollTools {
    background-color: darken($darkestgray, 3%);
    width: 10px;
    .mCSB_draggerContainer {
      top: 3px;
      bottom: 3px;
    }
    .mCSB_draggerRail {
      background: transparent;
    }
    .mCSB_dragger .mCSB_dragger_bar {
      width: 4px;
      background-color: lighten($darkestgray, 3%);
    }
  }
  .canvaslayer-wrapper {
    box-sizing: border-box;
    height: calc( 100% - 45px );
    overflow: hidden;
    color: $gray;
    .obj-list {
      background-color: $darkestgray;
    }
  }
  .obj-layer {
    display: flex;
    flex-wrap: wrap;
    -webkit-align-content: center;
    align-content: center;
    -webkit-justify-content: center;
    justify-content: center;
    border-top: 1px solid lighten($darkestgray, 5%);
    border-bottom: 1px solid darken($darkestgray, 5%);
    transition: .3s all ease;
    &:hover {
      cursor: pointer;
      background-color: lighten($darkestgray, 5%);
      input[readonly] {
        background-color: lighten($darkestgray, 5%);
        border: 1px dotted lighten($darkestgray, 15%);
      }
    }
    &:active, &.active {
      cursor: pointer;
      color: $white;
      background-color: lighten($darkestgray, 15%);
      .name {
        input {
          pointer-events: auto;
        }
      }
      // Layer Specific Colours
      &.usbframe {
        background-color: #bba60c;
      }
      &.www {
        background-color: #5e7e29;
      }
      &.rtsp {
        background-color: #b46b7b;
      }
      &.rss {
        background-color: #508590;
      }
      &.marquee {
        background-color: #63513d;
      }
      input[readonly] {
        background-color: lighten($darkestgray, 15%);
        border: 1px dotted lighten($darkestgray, 25%);
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
    .button {
      display: inline-block;
      vertical-align: middle;
      padding: 0;
      color: $darkgray;
      position: relative;
      &:hover {
        .locktip {
          display: block;
        }
      }
      .fa-lock, .fa-chain {
        color: $white;
      }
      .locktip {
        display: none;
        position: absolute;
        width: 150px;
        right: 100%;
        top: 0;
        // margin-left: -100px;
        background-color: $darkgray;
        color: $white;
        z-index: 99;
        white-space: initial;
        padding: .5em;
      }
      .lockUniScaling {
       color: $white;
       font-size: 10px;
       position: absolute;
       top: 100%;
       left: 0;
       right: 0;
       margin: auto;
       text-align: center;
       
      }
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
      border-right: 1px solid darken($darkestgray, 5%);
      border-left: 1px solid lighten($darkestgray, 5%);
      input {
        pointer-events: none;
      }
    }
    .control {
      padding: .5em;
      flex: initial;
      width: 45px; 
      // overflow: hidden;
      white-space: nowrap;
      align-self: center;
      .button {
        padding: 0;
      }
    }
    .additional {
      display: none;
      width: 100%;
      padding: .8em 0 .8em 1em;
      // background-color: $darkgray;
      border-top: 1px solid darken($darkestgray, 15%);
      background-color: lighten(#535353, 15%);
    }
  }
}
</style>
