<template lang="pug">
  .location(v-bind:style="attributes")
    span(v-bind:style="textboxStyles") {{attr.text}}
</template>

<script>
import Util from '../../assets/canvascomposer/parser/rgba'
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
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)'
      }
      // Get rid Brace
      var cssString = JSON.stringify(style).replace(/[{}]/g, '')
      // Replace comma
      cssString = cssString.replace(/[""]/g, '')
      // Remove ""
      cssString = cssString.replace(/[,]/g, ';')
      return cssString
    },
    textboxStyles () {
      var textColor = this.attr.fill
      textColor = textColor.replace(/[""]/g, '')
      textColor = Util.rgb2hex(textColor)
      var textBG = this.attr.textBackgroundColor
      textBG = textBG.replace(/[""]/g, '')
      textBG = Util.rgb2hex(textBG)
      var style = {
        'font-family': this.attr.fontFamily,
        'font-size': this.attr.fontSize + 'px',
        'color': textColor,
        'background-color': textBG
      }
      // Get rid Brace
      var cssString = JSON.stringify(style).replace(/[{}]/g, '')
      // Replace comma
      cssString = cssString.replace(/[""]/g, '')
      // Remove ""
      cssString = cssString.replace(/[,]/g, ';')
      console.log(cssString)
      return cssString
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../bower_components/susy/sass/susy";
@import "../../../bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";

</style>
