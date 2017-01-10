<template lang="pug">
  input.bs-color-picker(type="text", v-bind:id="currentObject.id", v-bind:class="separator")
</template>

<script>
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports?$=jquery!../assets/vendor/spectrum.js')
export default {
  data () {
    return {
    }
  },
  created () {
    console.log(this.initialColor)
    window.bus.$on('updateSpectrum', (res) => {
      this.updateSpectrum()
    })
  },
  beforeDestroy () {
    console.log('rebuild')
    this.destroySpectrum()
  },
  mounted () {
    this.$nextTick(() => {
      this.init(this.initialColor)
    })
  },
  props: ['currentObject', 'initialColor', 'separator'],
  methods: {
    init (color) {
      var instance = this
      var colorPicker = $('#' + this.currentObject.id + '.' + this.separator)
      var currentSetting
      colorPicker.spectrum({
        showInput: false,
        color: color,
        className: 'full-spectrum',
        showInitial: true,
        showPalette: true,
        showAlpha: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        localStorageKey: 'spectrum.demo',
        move: function (color) {
        },
        show: function () {
        },
        beforeShow: function () {
        },
        hide: function () {
        },
        change: function (color) {
          var canvas = window['canvas']
          var obj = canvas.getActiveObject()
          color = color.toRgbString()
          // Check if this represent Text Fill or Background
          if (instance.separator === 'text') {
            // Check Object Type
            if (obj.type === 'eclock' || obj.type === 'textbox' || obj.type === 'weather' || obj.type === 'location' || obj.type === 'temperature') {
              // 有文字的
              obj.setFill(color)
            } else if (obj.type === 'marquee') {
              // 特殊型態
              currentSetting = obj.get('marquee')
              currentSetting.fontcolor = color
              obj.set('marquee', currentSetting)
            } else if (obj.type === 'rss') {
              currentSetting = obj.get('marquee')
              currentSetting.fontcolor = color
              obj.set('rssmarquee', currentSetting)
            }
          } else {
            // 背景型
            if (obj.type === 'eclock' || obj.type === 'textbox' || obj.type === 'weather' || obj.type === 'location' || obj.type === 'temperature') {
              // 文字背景
              obj.setTextBackgroundColor(color)
            } else if (obj.type === 'marquee') {
              // 特殊型態
              currentSetting = obj.get('marquee')
              currentSetting.backgroundColor = color
              obj.set('marquee', currentSetting)
            } else if (obj.type === 'rss') {
              currentSetting = obj.get('marquee')
              currentSetting.backgroundColor = color
              obj.set('rssmarquee', currentSetting)
            } else {
              obj.setFill(color)
            }
          }
          canvas.renderAll()
          instance.$root.$children[0].$emit('updateHistory')
          colorPicker.spectrum('hide')
        },
        palette: [
          ['rgb(0, 0, 0)', 'rgb(67, 67, 67)', 'rgb(102, 102, 102)',
            'rgb(204, 204, 204)', 'rgb(217, 217, 217)', 'rgb(255, 255, 255)'],
          ['rgb(152, 0, 0)', 'rgb(255, 0, 0)', 'rgb(255, 153, 0)', 'rgb(255, 255, 0)', 'rgb(0, 255, 0)',
            'rgb(0, 255, 255)', 'rgb(74, 134, 232)', 'rgb(0, 0, 255)', 'rgb(153, 0, 255)', 'rgb(255, 0, 255)'],
          ['rgb(230, 184, 175)', 'rgb(244, 204, 204)', 'rgb(252, 229, 205)', 'rgb(255, 242, 204)', 'rgb(217, 234, 211)',
            'rgb(208, 224, 227)', 'rgb(201, 218, 248)', 'rgb(207, 226, 243)', 'rgb(217, 210, 233)', 'rgb(234, 209, 220)',
            'rgb(221, 126, 107)', 'rgb(234, 153, 153)', 'rgb(249, 203, 156)', 'rgb(255, 229, 153)', 'rgb(182, 215, 168)',
            'rgb(162, 196, 201)', 'rgb(164, 194, 244)', 'rgb(159, 197, 232)', 'rgb(180, 167, 214)', 'rgb(213, 166, 189)',
            'rgb(204, 65, 37)', 'rgb(224, 102, 102)', 'rgb(246, 178, 107)', 'rgb(255, 217, 102)', 'rgb(147, 196, 125)',
            'rgb(118, 165, 175)', 'rgb(109, 158, 235)', 'rgb(111, 168, 220)', 'rgb(142, 124, 195)', 'rgb(194, 123, 160)',
            'rgb(166, 28, 0)', 'rgb(204, 0, 0)', 'rgb(230, 145, 56)', 'rgb(241, 194, 50)', 'rgb(106, 168, 79)',
            'rgb(69, 129, 142)', 'rgb(60, 120, 216)', 'rgb(61, 133, 198)', 'rgb(103, 78, 167)', 'rgb(166, 77, 121)',
            'rgb(91, 15, 0)', 'rgb(102, 0, 0)', 'rgb(120, 63, 4)', 'rgb(127, 96, 0)', 'rgb(39, 78, 19)',
            'rgb(12, 52, 61)', 'rgb(28, 69, 135)', 'rgb(7, 55, 99)', 'rgb(32, 18, 77)', 'rgb(76, 17, 48)']
        ]
      })
    },
    destroySpectrum () {
      var colorPicker = $('#' + this.currentObject.id + '.' + this.separator)
      console.log(colorPicker)
      colorPicker.spectrum('destroy')
    },
    updateSpectrum () {
      console.log('updateSpe')
      this.destroySpectrum()
      this.init(this.initialColor)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
</style>
