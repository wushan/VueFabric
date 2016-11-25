<template lang="pug">
  #artboard
    .canvas-wrapper(v-bind:class="{ pushed: currentObject || arrangement || interaction}", @click="deselectObject", @contextmenu.prevent="deselectObject")
      #canvas.task
        canvas#c
        .objectControl
          a.btn.js-reset(href='javascript:;', title="原始比例", data-action='reset')
              i.fa.fa-crosshairs
          a.btn.js-delete(href='javascript:;', title="刪除", data-action='delete')
              i.fa.fa-trash
        .sizeTag
          .tag.width
              span 800
          .tag.height
              span 600
    //- transition(name="fade", mode="out-in", v-on:after-enter="fitWindow", v-on:after-leave="fitWindow")
    interaction(v-if="interaction", v-bind:interaction="interaction")
    //- transition(name="fade", mode="out-in", v-on:after-enter="fitWindow", v-on:after-leave="fitWindow")
    arrangement(v-if="arrangement", v-bind:arrangement="arrangement")
    transition(name="fade", mode="out-in", v-on:after-enter="fitWindow", v-on:after-leave="fitWindow")
      attributes(v-if="currentObject", v-bind:currentObject="currentObject", v-bind:initialRadius="initialRadius", v-bind:baseUrl="baseUrl")
</template>

<script>
// var fabric = window['fabric']
import Attributes from '../components/Attributes'
import Arrangement from './Arrangement'
import Interaction from './Interaction'
import initCanvas from '../assets/canvascomposer/Initial'
export default {
  name: 'Artboard',
  components: {
    Attributes,
    Arrangement,
    Interaction
  },
  props: ['currentObject', 'initialRadius', 'baseUrl', 'arrangement', 'interaction'],
  mounted () {
    // console.log('ARTBOARD')
  },
  methods: {
    fitWindow () {
      console.log('Fitting the Artboard.')
      initCanvas.fit()
    },
    deselectObject (e) {
      console.log(e)
      if (e.type === 'contextmenu') {
        this.$parent.$emit('triggerContextMenu', [e.clientX, e.clientY])
        console.log('right')
      } else {
        this.$parent.$emit('closeContextMenu')
        if (e.target.childNodes.length === 0) {
          return true
        } else {
          var canvas = window['canvas']
          canvas.discardActiveObject()
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";

.canvas-wrapper {
  box-sizing: border-box;
  height: 100%;
  text-align: center;
  flex: 1;
  display: flex;
  align-items:center;
  justify-content:center;
  transition: .3s all ease;
  background-color: $darkestgray;
  border-right: 2px solid $pureblack;
  border-top: 2px solid $pureblack;
  border-left: 2px solid $pureblack;
  max-width: calc( 100vw - 90px );
  &.pushed {
    max-width: calc( 100vw - 400px );
  }
  #canvas {
    display: inline-block;
    vertical-align: middle;
  }
}
#canvas {
  position: relative;
  transform-origin: center center;
  transition: .3s all ease;
  .objectControl {
    @extend .transition;
    opacity: 0;
    position: absolute;
    font-size: 1rem;
    left: .2em;
    top: -40px;
    box-sizing: borde-box;
    z-index: 2;
    &.active {
      opacity: 1;
      top: .2em;
    }
    .btn {
      padding: .2em 1em;
    }
  }
  &:hover {
    .sizeTag {
      opacity: .2;
    }
  }
  .sizeTag {
    @extend .transition;
    margin: 2em;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    border-left: 1px solid $black;
    border-top: 1px solid $black;
    opacity: 0.1;
    .tag {
      background-color: $black;
      color: $white;
      padding: 0 1em;
      border-radius: 3px;
      font-size: .8em;
      &.height {
        position: absolute;
        bottom: 0;
        right: calc( 100% + .9em );
        transform: rotate(90deg);
        transform-origin: 100% 100%;
      }
      &.width {
        position: absolute;
        top: -.9em;
        right: 0;
      }
    }
  }
}
.canvas-container {
  margin: 0 auto;
  // background-color: $white;
  background-image: url(data:image/gif;base64,R0lGODlhCgAKAIAAAOLi4v///yH5BAAHAP8ALAAAAAAKAAoAAAIRhB2ZhxoM3GMSykqd1VltzxQAOw==);
  box-shadow: 0px 3px 3px rgba(0,0,0,.33);
  @extend .transition;
  &:hover {
    box-shadow: 0px 3px 3px rgba(0,0,0,.66);
  }
}
</style>
