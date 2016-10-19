<template lang="jade">
  #clocksettings.floating-menu
    .canvasconfig-wrapper
      .canvasconfig-inner
        loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
        transition(name="fade", mode="out-in")
          .row.componentpresets(v-if="clockpresets")
            .block(v-for="clock in clockpresets")
              a(@click="addClock")
                .thumbnail
                  img(:src="baseUrl + clock.image")
                .name {{ clock.name }}
</template>

<script>
import Api from '../../assets/canvascomposer/Api'
import Events from '../../assets/cc.objectEvents'
import Loader from '../Loader'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
export default {
  components: {
    Loader
  },
  data () {
    return {
      clockpresets: null,
      loading: false,
      loadingtext: '素材讀取中'
    }
  },
  created () {
    this.fetchData()
  },
  props: ['baseUrl'],
  methods: {
    fetchData () {
      this.loading = true
      Api.getLibClock((err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          this.clockpresets = data
        }
      })
    },
    bindEvents (object) {
      Events.bindEvents(this.$parent.$parent, object)
      this.$parent.$parent.$emit('updateHistory')
    },
    addClock (options) {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var instance = this
      var _defaultSettings = {
        'frame': './static/assets/images/clock/style-6/frame.svg',
        'hour': './static/assets/images/clock/style-6/hour.svg',
        'min': './static/assets/images/clock/style-6/min.svg',
        'sec': './static/assets/images/clock/style-6/sec.svg',
        'gmt': 'Asia/Taipei'
      }
      var _settings = $.extend(_defaultSettings, options)
      // Var
      var canvasClock
      var canvasClockFrame
      var canvasClockHour
      var canvasClockMin
      var canvasClockSec
      fabric.loadSVGFromURL(_settings.frame, function (objects, options) {
        canvasClockFrame = fabric.util.groupSVGElements(objects, options)
        // Sec
        fabric.loadSVGFromURL(_settings.sec, function (objects, options) {
          canvasClockSec = fabric.util.groupSVGElements(objects, options)
          canvasClockSec.set({
            left: canvasClockFrame.getWidth() / 2,
            top: canvasClockFrame.getHeight() / 2
          })
          canvasClockSec.setOriginX('center')
          canvasClockSec.setOriginY('center')
          // Min
          fabric.loadSVGFromURL(_settings.min, function (objects, options) {
            canvasClockMin = fabric.util.groupSVGElements(objects, options)
            canvasClockMin.set({
              left: canvasClockFrame.getWidth() / 2,
              top: canvasClockFrame.getHeight() / 2
            })
            canvasClockMin.setOriginX('center')
            canvasClockMin.setOriginY('center')
            // Hour
            fabric.loadSVGFromURL(_settings.hour, function (objects, options) {
              canvasClockHour = fabric.util.groupSVGElements(objects, options)
              canvasClockHour.set({
                left: canvasClockFrame.getWidth() / 2,
                top: canvasClockFrame.getHeight() / 2
              })
              canvasClockHour.setOriginX('center')
              canvasClockHour.setOriginY('center')
              // Clock Group
              canvasClock = new fabric.Clock([canvasClockFrame, canvasClockHour, canvasClockMin, canvasClockSec], {
                left: 0,
                top: 0
              })
              canvasClock.toObject = (function (toObject) {
                return function () {
                  return fabric.util.object.extend(toObject.call(this), {
                    interaction: this.interaction,
                    frame: _settings.frame,
                    hour: _settings.hour,
                    minute: _settings.min,
                    second: _settings.sec,
                    gmt: _settings.gmt
                  })
                }
              })(canvasClock.toObject)
              canvasClock.setOriginX('center')
              canvasClock.setOriginY('center')
              canvas.add(canvasClock)
              canvasClock.center()
              canvasClock.setCoords()
              // Render
              canvas.renderAll()
              // Bind
              instance.bindEvents(canvasClock)
              // Programmatically Select Newly Added Object
              canvas.setActiveObject(canvasClock)
            })
          })
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
.canvasconfig-inner {
  .block {
    @include gallery(6 of 12 2);
    margin-bottom: 1em;
    .name {
      margin-top: 1em;
    }
  }
}
</style>
