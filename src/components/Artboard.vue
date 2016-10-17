<template lang="pug">
  #artboard
    .canvas-wrapper
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
    transition(name="fade", mode="out-in")
      attributes(v-if="currentObject", v-bind:currentObject="currentObject", v-bind:initialRadius="initialRadius")
</template>

<script>
var fabric = window['fabric']
import Attributes from '../components/Attributes'
export default {
  name: 'Artboard',
  components: {
    Attributes
  },
  props: ['currentObject', 'initialRadius'],
  mounted () {
    console.log('ARTBOARD')
    // Register Canvas Globally
    var canvas = new fabric.CanvasEx('c', {
      width: 500,
      height: 500,
      allowTouchScrolling: true
    })
    // Register to window.global
    window.canvas = canvas
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";

.canvas-wrapper {
  height: 100%;
  text-align: center;
  flex: 1;
  display: flex;
  align-items:center;
  justify-content:center;
  transition: 3s all ease;
  #canvas {
    display: inline-block;
    vertical-align: middle;
  }
}
#canvas {
  position: relative;
  transform-origin: center center;
  @extend .transition;
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
