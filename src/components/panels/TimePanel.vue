<template lang="pug">
  #timesettings.floating-menu
    .timeconfig-wrapper
      h3 Time Format
      .timeconfig-inner
        .row
          a.btn.basic.full.format(href='javascript:;', @click="addTime('YYYY-MM-DD HH:mm:ss', {locale: 'en'})") 2016-09-01 12:01:42
          a.btn.basic.full.format(href='javascript:;', @click="addTime('YYYY-MMM-DD HH:mm:ss', {locale: 'en'})") 2016-Sep-01 12:02:26
          a.btn.basic.full.format(href='javascript:;', @click="addTime('LLL', {locale: 'zh-tw'})") 2016年12月14日上午9點54分
          a.btn.basic.full.format(href='javascript:;', @click="addTime('LL LTS', {locale: 'zh-tw'})") 2016年12月14日 上午9點55分18秒
          a.btn.basic.full.format(href='javascript:;', @click="addTime('LLLL', {locale: 'zh-tw'})") 2016年12月14日星期三上午9點55分
          a.btn.basic.full.format(href='javascript:;', @click="addTime('YYYY-MM-DD', {locale: 'zh-tw'})") 2016-12-14
          a.btn.basic.full.format(href='javascript:;', @click="addTime('HH:mm:ss', {locale: 'zh-tw'})") 09:55:43
          a.btn.basic.full.format(href='javascript:;', @click="addTime('dddd', {locale: 'zh-tw'})") 星期三
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
        name: '時間 - ' + this.$store.state.objects.eclock,
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
      this.$store.commit('increment', 'eclock')
      text.center()
      text.setCoords()
      // Bind
      this.$root.$children[0].$emit('updateHistory')
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
  // font-size: 12px;
  // a {
  //   display: block;
  //   padding: 2em 1em;
  //   background-color: darken($darkblue, 5%);
  //   margin-bottom: .5em;
  //   transition: .3s all ease;
  //   &:hover {
  //     background-color: darken($darkblue, 10%);
  //   }
  // }
}
</style>
