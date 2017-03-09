<template lang="pug">
  .colorplate-wrapper(v-bind:style="'top:' + position + 'px;'", v-if="colors")
    color-picker(v-if="colorType === 'text'", v-bind:value="colors", @change-color="changeColor")
    color-picker(v-else, v-bind:value="colors", @change-color="changeColor")
</template>

<script>
import { Chrome } from 'vue-color'
// let defaultProps = {
//   hex: '#194d33',
//   hsl: {
//     h: 150,
//     s: 0.5,
//     l: 0.2,
//     a: 1
//   },
//   hsv: {
//     h: 150,
//     s: 0.66,
//     v: 0.30,
//     a: 1
//   },
//   rgba: {
//     r: 25,
//     g: 77,
//     b: 51,
//     a: 1
//   },
//   a: 1
// }
export default {
  components: {
    'color-picker': Chrome
  },
  data () {
    return {
      colors: null
    }
  },
  created () {
    window.bus.$on('updateSpectrum', (res) => {
      console.log('destroy')
      this.$destroy()
    })
  },
  mounted () {
    this.init()
    console.log('init')
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  props: ['colorType', 'initialColor', 'separator', 'colorpickerPosition'],
  methods: {
    init () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      console.log(this.colorType)
      switch (obj.type) {
        case 'marquee':
          if (this.colorType === 'text') {
            this.colors = {
              hex: obj.marquee.fontcolor,
              a: 1
            }
          } else {
            this.colors = {
              hex: obj.marquee.backgroundColor,
              a: 1
            }
          }
          break
      }
    },
    changeColor (val) {
      console.log(val)
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      var currentSetting
      switch (obj.type) {
        case 'marquee':
          if (this.colorType === 'text') {
            currentSetting = obj.get('marquee')
            currentSetting.fontcolor = 'rgba(' + val.rgba.r + ',' + val.rgba.g + ',' + val.rgba.b + ',' + val.rgba.a + ')'
            obj.set('marquee', currentSetting)
            canvas.renderAll()
          } else {
            currentSetting = obj.get('marquee')
            currentSetting.backgroundColor = 'rgba(' + val.rgba.r + ',' + val.rgba.g + ',' + val.rgba.b + ',' + val.rgba.a + ')'
            obj.set('marquee', currentSetting)
            canvas.renderAll()
          }
          break
      }
    }
  },
  computed: {
    position () {
      return this.colorpickerPosition - 310
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./node_modules/susy/sass/susy";
@import "./node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
.colorplate-wrapper {
  position: absolute;
  z-index: 99;
  left: 0;
  right: 0;
  margin: auto;
  .vue-color__chrome {
    margin: auto;
  }
}
</style>
