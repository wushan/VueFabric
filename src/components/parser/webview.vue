<template lang="pug">
  .web(v-bind:style="attributes")
    iframe(v-bind:src="attr.webview.url", frameborder="0", scrolling="no", v-bind:id="attr.id")
</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.readyToRefresh()
  },
  props: ['attr'],
  methods: {
    readyToRefresh () {
      var item
      if (this.attr) {
        console.log(this.attr.id)
        item = document.getElementById(this.attr.id)
        setTimeout(() => {
          item.parentNode.replaceChild(item.cloneNode(), item)
        }, this.attr.webview.refreshRate * 1000)
      }
    }
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': '#ffffff'
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
.web {
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  } 
}
</style>
