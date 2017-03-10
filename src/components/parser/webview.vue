<template lang="pug">
  .web(v-bind:style="attributes")
    transition(name="fade", mode='out-in')
      .placeholder(v-show="denied")
        p {{attr.webview.url}} can't be framed.
    transition(name="fade", mode='out-in')
      template(v-show="denied === false")
        iframe(v-bind:src="attr.webview.url", frameborder="0", scrolling="no", v-bind:id="attr.id")/
    iframe#hiddenTester(src="")/
</template>

<script>
// var $ = window.jQuery
// import request from 'superagent'
import Css from 'object-to-css'
export default {
  data () {
    return {
      denied: true
    }
  },
  created () {
  },
  mounted () {
    this.detectUrl()
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
    },
    detectUrl () {
      var instance = this
      var iframeLoaded = false
      var iframe = document.getElementById('hiddenTester')

      // ***** SWAP THE `iframe.src` VALUE BELOW FOR DIFFERENT RESULTS ***** //
      // iframe.src = "https://davidsimpson.me"; // This will work. There is no 'X-Frame-Options' header.
      iframe.src = this.attr.webview.url // This won't work. 'X-Frame-Options' is set to 'SAMEORIGIN'.

      var iframeOnloadEvent = function () {
        iframeLoaded = true
        if (iframe.contentWindow.length > 0) {
          console.log('YYYY')
          instance.denied = false
        } else {
          instance.denied = true
          console.log('NNNN')
        }
      }

      if (iframe.attachEvent) {
        iframe.attachEvent('onload', iframeOnloadEvent)
      } else {
        iframe.onload = iframeOnloadEvent
      }
      // document.body.appendChild(iframe)

      // iframe.onload event doesn't trigger in firefox if loading mixed content (http iframe in https parent) and it is blocked.
      setTimeout(function () {
        if (iframeLoaded === false) {
          instance.denied = true
          console.log('NNNN')
        }
      }, 5000)
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
@import "../../../node_modules/susy/sass/susy";
@import "../../../node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
.web {
  iframe {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .placeholder {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $red;
    color: $white;
    display: flex;
    justify-content: center;
    align-content: center;
    p {
      align-self: center;
      padding: 0 2em;
    }
  }
  #hiddenTester {
    width: 0;
    height: 0;
    border: 0;
  }
}
</style>
