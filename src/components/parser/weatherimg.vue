<template lang="pug">
  .weatherimg(v-bind:style="attributes")
    img(v-bind:src="attr.toObject().src")
</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.attr.toObject().src)
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
        transform: 'rotate(' + this.attr.angle + 'deg);'
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

</style>
