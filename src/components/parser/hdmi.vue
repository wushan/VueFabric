<template lang="pug">
  .hdmi(v-bind:style="attributes")
    h4 HDMI RESOURCE
    p {{attr.hdmi}}
</template>

<script>
// import * as rtsp from 'html5_rtsp_player'
import Css from 'object-to-css'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    // rtsp.RTSP_CONFIG['websocket.url'] = "ws://websocket_proxy_address/ws"; // You should specify address of proxy described below
    // rtsp.attach(document.getElementById('test'))
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
.hdmi {
  padding: 1em;
  box-sizing: border-box;
  background-color: rgba($smokygray, .66);
  p {
    word-break: break-all;
  }
}
</style>
