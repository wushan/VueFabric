<template lang="pug">
  #canvasParser
    .paintarea(:style="'width:' + paintarea.width + 'px; height:' + paintarea.height + 'px;'")
      component.object(v-for="obj in objects", v-bind:is="obj.type", v-bind:attr="obj")
      .mode PLAYING
    a.fa.fa-lg.fa-times.close(@click="leavePreview")
</template>

<script>
import slider from './parser/slider'
import sliderT from './parser/sliderT'
import sliderE from './parser/sliderE'
import plaintext from './parser/textbox'
import clock from './parser/clock'
import eclock from './parser/eclock'
import temperature from './parser/temperature'
import location from './parser/location'
import rss from './parser/rss'
import usbframe from './parser/usbframe'
import rtspframe from './parser/rtspframe'
import weatherimg from './parser/weatherimg'
import marquee from './parser/marquee'
import webview from './parser/webview'
// import Api from '../assets/canvascomposer/Api'
export default {
  components: {
    slider,
    plaintext,
    clock,
    eclock,
    weatherimg,
    sliderT,
    sliderE,
    temperature,
    location,
    rss,
    usbframe,
    rtspframe,
    marquee,
    webview
  },
  data () {
    return {
      paintarea: {
        width: 1024,
        height: 768
      },
      objects: null
    }
  },
  created () {
    this.getSource()
    // this.objects = source
  },
  beforeDestroy () {
    console.log('111')
  },
  methods: {
    getSource () {
      // Api.getSource((err, data) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //     console.log(err)
      //   } else {
      //     this.objects = data.objects
      //   }
      // })
      var canvas = window['canvas']
      this.objects = canvas._objects
      console.log(canvas._objects)
    },
    leavePreview () {
      this.$parent.$emit('closePreview')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
#canvasParser {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: $darkestgray;
  z-index: 99;
  display: flex;
  -webkit-align-content: center;
          align-content: center;
  -webkit-justify-content: center;
          justify-content: center;
  .close {
    position: absolute;
    right: 1em;
    top: 1em;
  }
  .paintarea {
    background-color: $white;
    align-self: center;
    box-shadow: 0 0 3px 3px rgba($black, .66);
    position: relative;
    color: $black;
    overflow: hidden;
    .object {
      position: absolute;
      // background-color: $gray;
      -webkit-transform-origin: left top;
         -moz-transform-origin: left top;
          -ms-transform-origin: left top;
           -o-transform-origin: left top;
              transform-origin: left top;
      // box-shadow: 0 3px 3px rgba($black, .66);
      // opacity: .8;
    }
    .mode {
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: $black;
      color: $red;
      padding: .3em 1em;
      font-weight: bold;
      opacity: .9;
    }
  }
}
</style>
