<template lang="pug">
  .slider.ellipse(v-bind:style="attributes") THIS IS SLIDER
</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
    }
  },
  props: ['attr'],
  created () {
  },
  methods: {
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': this.attr.fill
      }
      return Css(style)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../bower_components/susy/sass/susy";
@import "../../../bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
.slider.ellipse {
  border-radius: 50%;
}
</style>
