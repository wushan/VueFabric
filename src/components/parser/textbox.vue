<template lang="pug">
  .textbox(v-bind:style="attributes")
    span(v-bind:style="textboxStyles") {{attr.text}}
</template>

<script>
import Css from 'object-to-css'
// import Util from '../../assets/canvascomposer/parser/rgba'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  props: ['attr'],
  methods: {
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX,
        height: this.attr.height * this.attr.scaleY,
        top: this.attr.top,
        left: this.attr.left,
        transform: 'rotate(' + this.attr.angle + 'deg) scaleX(' + this.attr.scaleX + ') scaleY(' + this.attr.scaleY + ');'
      }
      return Css(style)
    },
    textboxStyles () {
      var style = {
        'font-family': this.attr.fontFamily,
        'font-size': this.attr.fontSize + 'px',
        'color': this.attr.fill,
        'background-color': this.attr.textBackgroundColor
      }
      return Css(style)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../node_modules/susy/sass/susy";
@import "../../../node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
.textbox {
  span {
    white-space: pre;
  }
}
</style>
