<template lang="jade">
  #timesettings.floating-menu
    .timeconfig-wrapper
      h3 Time Format
      .timeconfig-inner
        .row
          a.format(href='javascript:;', @click="addTime('YYYY-MM-DD HH:mm:ss')") 2016-09-01 12:01:42
          a.format(href='javascript:;', @click="addTime('YYYY-MMM-DD HH:mm:ss')") 2016-Sep-01 12:02:26
</template>

<script>
import Loader from '../Loader'
import Events from '../../assets/cc.objectEvents'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
export default {
  components: {
    Loader
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    addTime (format, options) {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var _defaultSettings = {
        'gmt': 'Asia/Taipei'
      }
      var _settings = $.extend(_defaultSettings, options)
      console.log(_settings.gmt)
      // Make Time String
      var formatString = window.moment().format(format)
      var text = new fabric.Eclock(formatString, {
        format: format,
        gmt: _settings.gmt
      })
      text.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction,
            format: format,
            gmt: _settings.gmt
          })
        }
      })(text.toObject)
      canvas.add(text)
      text.center()
      text.setCoords()
      // Bind
      Events.bindEvents(this.$parent.$parent, text)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
#timesettings {
  a {
    display: block;
    padding: 2em 1em;
    background-color: darken($darkblue, 5%);
    margin-bottom: .5em;
    transition: .3s all ease;
    &:hover {
      background-color: darken($darkblue, 10%);
    }
  }
}
</style>
