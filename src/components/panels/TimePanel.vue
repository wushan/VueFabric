<template lang="pug">
  #timesettings.floating-menu
    .timeconfig-wrapper
      h3 Time Format
      .timeconfig-inner
        .row
          a.format(href='javascript:;', @click="addTime('YYYY-MM-DD HH:mm:ss', {locale: 'en'})") 2016-09-01 12:01:42
          a.format(href='javascript:;', @click="addTime('YYYY-MMM-DD HH:mm:ss', {locale: 'en'})") 2016-Sep-01 12:02:26
          a.format(href='javascript:;', @click="addTime('LLL', {locale: 'zh-tw'})") YYYY 年 MMMD 日 Ah 點 mm 分
          a.format(href='javascript:;', @click="addTime('LL LTS', {locale: 'zh-tw'})") YYYY 年 MMMD 日 Ah 點 mm 分 ss 秒
          a.format(href='javascript:;', @click="addTime('LLLL', {locale: 'zh-tw'})") YYYY 年 MMMD 日 ddddAh 點 mm 分
</template>

<script>
// UUID
import uuid from 'node-uuid'
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
      console.log(options)
      // Make Time String
      var formatString = window.moment().locale(options.locale).format(format)
      console.log(formatString)
      var text = new fabric.Eclock(formatString, {
        format: format,
        fontFamily: 'Times New Roman',
        gmt: _settings.gmt,
        name: 'Time',
        id: uuid.v4(),
        locale: options.locale
      })
      // text.toObject = (function (toObject) {
      //   return function () {
      //     return fabric.util.object.extend(toObject.call(this), {
      //       interaction: this.interaction,
      //       format: format,
      //       gmt: _settings.gmt,
      //       id: this.id,
      //       locale: options.locale
      //     })
      //   }
      // })(text.toObject)
      canvas.add(text)
      text.center()
      text.setCoords()
      // Bind
      Events.bindEvents(this.$parent.$parent, text)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(text)
      this.$root.$children[0].$emit('updateSubmenu', null)
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
