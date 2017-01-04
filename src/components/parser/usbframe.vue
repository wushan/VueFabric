<template lang="pug">
  .usb(v-bind:style="attributes")
    h4 USB FRAME
    .attributes
      ul
        li
          span type:
          span {{attr.usbframe.type}}
        li
          span transitionType:
          span {{attr.usbframe.transitionType}}
        li
          span fillType:
          span {{attr.usbframe.fillType}}
        li
          span leastTime:
          span {{attr.usbframe.leastTime}}s
        li
          span transitionTime:
          span {{attr.usbframe.transitionTime}}s
    .attention NOT affected by style.
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
@import "../../../bower_components/susy/sass/susy";
@import "../../../bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
.usb {
  padding: 1em;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba($smokygray, .66);
  border: 1px solid $white;
  h4 {
    margin: 0;
  }
  .attributes {
    ul {
      display: block;
      margin: 1em 0;
      padding: 0;
      list-style-type: none;
      font-size: 12px;
      opacity: .8;
      li {
        border-bottom: 1px solid $darkgray;
        display: block;
        padding: .5em 0;
        span {
          &:first-child {
            text-transform: uppercase;
            font-weight: 600;
            margin-right: 1em;
          }
        }
      }
    }
  }
  .attention {
    background-color: $black;
    color: $yellow;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    top: .5em;
    right: .5em;
  }
}
</style>
