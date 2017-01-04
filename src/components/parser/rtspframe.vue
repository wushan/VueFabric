<template lang="pug">
  .rtsp(v-bind:style="attributes")
    h4 RTSP RESOURCE
    p {{attr.rtsp}}
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
.rtsp {
  padding: 1em;
  box-sizing: border-box;
}
</style>
