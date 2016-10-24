<template lang="pug">
  #attributes
    .panels
      .attributes-wrapper.panel
        .attributes-inner(v-if="currentObject")
          .attribution-group.basics
            p Basics
            .row
              .controlgroup.type
                label 類型
                .controls
                  input(type='text' v-bind:value="currentObject.type" readonly)
              .width.controlgroup
                label 寬度
                .controls
                  input.objectSize#objectWidth(v-bind:value="currentObject.width", type='number')
              .height.controlgroup
                label 高度
                .controls
                  input.objectSize#objectHeight(type='number', v-bind:value="currentObject.height")
              .radius.controlgroup(v-if="currentObject.radius")
                label 半徑
                .controls
                  input#objectRadius(type='number', v-bind:value="currentObject.radius", readonly)
              
              .position.controlgroup
                label Y 軸
                .controls
                  input#objectTop(type='number', v-bind:value="currentObject.top")
              .position.controlgroup
                label X 軸
                .controls
                  input#objectLeft(type='number', v-bind:value="currentObject.left")
              .angle.controlgroup
                label 角度
                .controls
                  input#objectAngle(type='text', v-bind:value="currentObject.angle")
              .scalex.controlgroup
                label X 延展
                .controls
                  input#objectScaleX(type='text', v-bind:value="currentObject.scaleX")
              .scaley.controlgroup
                label Y 延展
                .controls
                  input#objectScaleY(type='text', v-bind:value="currentObject.scaleY")
              .color.controlgroup
                label 背景色
                .controls
                  input#objectColor(type='text')
          .attribution-group.fonts(v-if="typography")
            p Fonts Specific
            .controlgroup.text.text-attr
              label 文字
              .controls
                input#objectInput(type='text', v-bind:value="currentObject.text")
            .controlgroup.fontfamily
              label 字體
              .controls
                .select-wrapper
                  select#objectFontFamily(v-model="currentObject.fontFamily", @change="changeFontFamily")
                    option(value="Open Sans") 預設 (Open Sans)
                    option(value="DFYa-W3-WIN-BF") 華康雅風體
                    option(value="DFHuaZong-W5-WIN-BF") 華綜體體
                    option(value="DFJinWen-W3-WIN-BF") 華康金文體
                    option(value="DFXingShu-W5-WIN-BF") 華康行書體
                    option(value="DFYingHeiU-W7-WIN-BF") 華康硬黑體
                    option(value="DFYanKai-W5-WIN-BF") 華康正顏楷體
                    option(value="DFOYangXun-W5-WIN-BF") 華康歐陽詢體
                    option(value="DFFangYuan-W7-WIN-BF") 華康方圓體
                    option(value="DFWaWa-W5-WIN-BF") 娃娃體
                    option(value="DFLiHei-W5-WIN-BF") 華康儷中黑體
                    option(value="Verdana") Verdana
                    option(value="Times") Times
                    option(value="Strasua") Strasua
                    option(value="SegoeScript") Segoe Script
                    option(value="OratorStd") Orator Std
                    option(value="MicrosoftJhengHeiLight") 微軟正黑 Light
                    option(value="MicrosoftJhengHeiBold") 微軟正黑 Bold
                    option(value="Serif") 細明體
                    option(value="CopperplateGothic-Light") Copperplate Gothic Light
                    option(value="ComicSansMS") Comic Sans MS
                    option(value="BerlinSansFBDemi-Bold") Berlin Sans FB Demi-Bold
                    option(value="Arial") Arial
                    option(value="ARBERKLEY") ARBERKLEY
                    option(value="FuturaBT-Book") FuturaBT Book
            .row
              .controlgroup.color
                label 顏色
                .controls
                  input#objectTextColor(type='text')
            
              .controlgroup.fontsize
                label 尺寸
                .controls
                  .select-wrapper
                    select#objectFontSize(v-model="currentObject.fontSize", @change="changeFontSize")
                      option(value='14') 14
                      option(value='18') 18
                      option(value='24') 24
                      option(value='30') 30
                      option(value='36') 36
                      option(value='40') 40
                      option(value='44') 44
                      option(value='48') 48
                      option(value='56') 56
                      option(value='64') 64
                      option(value='72') 72
                      option(value='84') 84
                      option(value='96') 96
                      option(value='128') 128
                      option(value='144') 144
                      option(value='168') 168
                      option(value='192') 192
          .attribution-group.specials
            .controlgroup
              label 互動
              .controls.rich-control
                .select-wrapper
                  select#interactives
                    option(value='none' selected) 無互動
                    option(value='apps') 啟動 APP
                    option(value='slide') 滑動
                    option(value='slidewitharrow') 滑動 (有箭頭)
                    option(value='previous') 上一節目
                    option(value='escape') 退出互動
                    option(value='interactive') 互動節目
            //- .controlgroup.link
            //-   label 連結
            //-   .controls.rich-control
            //-     input#linkValue(type='text')
            //-     a.js-inbounds(href="javascript:;")
            //-       i.fa.fa-link.fa-2x
            //- .application
            //-   .controlgroup
            //-     label 套件名稱
            //-     .controls.rich-control
            //-       input#appName(type='text')
            //-   .controlgroup
            //-     label 退出方式
            //-     .controls.rich-control
            //-       .select-wrapper
            //-         select#appEscape
            //-           option(value="Manual") 手動退出
            //-           option(value="Force") 強制關閉
            //-   .controlgroup
            //-     .controls.rich-control
            //-       .row
            //-         .grid.g-6-12
            //-           input#appEscapeTime(type='number', value="30")
            //-         .grid.g-6-12
            //-           label 秒強制關閉
            //-   .controlgroup
            //-     label 懸浮按鈕
            //-     .controls.rich-control
            //-       .select-wrapper
            //-         select#appEscapeButton
            //-           option(value="ON") 啟用
            //-           option(value="OFF") 不啟用
            //-   .controlgroup
            //-     label 按鈕位置
            //-     .controls.rich-control
            //-       .select-wrapper
            //-         select#appEscapeButtonPos
            //-           option(value="lefttop") 左上
            //-           option(value="leftcenter") 左中
            //-           option(value="leftbottom") 左下
            //-           option(value="righttop") 右上
            //-           option(value="rightcenter") 右中
            //-           option(value="rightbottom") 右下
            //-           option(value="centertop") 中上
            //-           option(value="centercenter") 中中
            //-           option(value="centerbottom") 中下
            //-   .controlgroup
            //-     label 按鈕尺寸
            //-     .controls.rich-control
            //-       .select-wrapper
            //-         select#appEscapeButtonSize
            //-           option(value="L") 大
            //-           option(value="M") 中
            //-           option(value="S") 小
            //-   .controlgroup
            //-     button#appSave.btn.basic.full(type="button") 儲存 APP 設定
          //- .attribution-group.media
          //-   p Medias
          //-   .controlgroup.media
          //-     label 素材
          //-     .controls.rich-control
          //-       a.js-library(href="javascript:;")
          //-         i.fa.fa-cloud-upload.fa-2x
          //-       input#mediaValue(type='text' readonly)
          //-     .mediaPreview
          .attribution-group.webview(v-if="webview")
            p Webview Url
            .controlgroup.webview
              label 網址
              .controls
                input#webviewUrl(type="text", placeholder="http://google.com")
            p Placeholder
            .controlgroup.webview
              label 替代圖
              .controls.rich-control
                a.js-library(href="javascript:;")
                  i.fa.fa-cloud-upload.fa-2x
                input#webviewPlaceholder(type='text' readonly)

          .attribution-group.clock(v-if="clock")
            p Clock Specific
            .controlgroup.clock
              label 時區
              .controls
                .select-wrapper
                  select#gmt-time(v-model="currentObject.gmt", @change="changeTimeZone()")
                    option(value='Etc/GMT+12') [-01:00] Etc/GMT+12
                    option(value='Pacific/Midway') [-11:00] Pacific/Midway
                    option(value='Pacific/Honolulu') [-10:00] Pacific/Honolulu
                    option(value='Pacific/Gambier') [-09:00] Pacific/Gambier
                    option(value='Pacific/Pitcairn') [-08:00] Pacific/Pitcairn
                    option(value='America/Creston') [-07:00] America/Creston
                    option(value='America/Belize') [-06:00] America/Belize
                    option(value='America/Atikokan') [-05:00] America/Atikokan
                    option(value='America/Anguilla') [-04:00] America/Anguilla
                    option(value='America/Araguaina') [-03:00] America/Araguaina
                    option(value='America/Noronha') [-02:00] America/Noronha
                    option(value='America/Scoresbysund') [-01:00] America/Scoresbysund
                    option(value='Africa/Abidjan') [+00:00] Africa/Abidjan
                    option(value='Africa/Algiers') [+01:00] Africa/Algiers
                    option(value='Africa/Blantyre') [+02:00] Africa/Blantyre
                    option(value='Africa/Asmara') [+03:00] Africa/Asmara
                    option(value='Asia/Dubai') [+04:00] Asia/Dubai
                    option(value='Antarctica/Mawson') [+05:00] Antarctica/Mawson
                    option(value='Antarctica/Vostok') [+06:00] Antarctica/Vostok
                    option(value='Asia/Bangkok') [+07:00] Asia/Bangkok
                    option(value='Asia/Taipei') [+08:00] Asia/Taipei
                    option(value='Asia/Seoul') [+09:00] Asia/Seoul
                    option(value='Australia/Brisbane') [+10:00] Australia/Brisbane
                    option(value='Asia/Magadan') [+11:00] Asia/Magadan
                    option(value='Asia/Anadyr') [+12:00] Asia/Anadyr
                    option(value='Pacific/Enderbury') [+13:00] Pacific/Enderbury
                    option(value='Pacific/Kiritimati') [+14:00] Pacific/Kiritimati
          .attribution-group.sliders(v-if="slider")
            .row
              .grid.g-6-12
                p Sliders
              .grid.g-6-12.right
                a.btn.basic.js-library(href="javascript:;") 增加
            
            form#updateSlider
              ul#slidesOrder
              button.btn.edit.full(type="submit") 確定變更
          .attribution-group.rtsp(v-if="rtsp")
            p RTSP 資源
            .controlgroup.rtsp
              label 網址
              .controls
                input#rtspUrl(type="text", placeholder="rtsp://000.000.000.00")
          library(v-bind:baseUrl="baseUrl")
</template>

<script>
import Library from './Library'
import Events from '../assets/cc.objectEvents'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports?$=jquery!../assets/vendor/jquery.mousewheel.js')
require('imports?$=jquery!../assets/vendor/jquery.mCustomScrollbar.js')
require('imports?$=jquery!../assets/vendor/spectrum.js')
export default {
  name: 'Attributes',
  components: {
    Library
  },
  props: ['currentObject', 'initialRadius', 'baseUrl'],
  computed: {
    typography () {
      if (this.currentObject.type === 'eclock' || this.currentObject.type === 'textbox' || this.currentObject.type === 'weather' || this.currentObject.type === 'location' || this.currentObject.type === 'temperature') {
        return true
      } else {
        return false
      }
    },
    clock () {
      if (this.currentObject.type === 'eclock' || this.currentObject.type === 'clock') {
        return true
      } else {
        return false
      }
    },
    webview () {
      if (this.currentObject.type === 'webview') {
        return true
      } else {
        return false
      }
    },
    rtsp () {
      if (this.currentObject.type === 'rtspframe') {
        return true
      } else {
        return false
      }
    },
    slider () {
      if (this.currentObject.type === 'slider') {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      $('#attributes').mCustomScrollbar({
        theme: 'light'
      })
      $('#objectColor').spectrum({
        showInput: false,
        className: 'full-spectrum',
        showInitial: true,
        // showPalette: true,
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
          if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'marquee') {
            obj.setTextBackgroundColor(color)
            console.log(color)
          } else {
            obj.setFill(color)
          }
          canvas.renderAll()
          $('#objectColor').spectrum('hide')
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
    })
  },
  methods: {
    changeFontFamily () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      if (obj) {
        obj.setFontFamily(this.currentObject.fontFamily)
        obj.setCoords()
        canvas.renderAll()
      }
    },
    changeFontSize () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      if (obj) {
        obj.setFontSize(this.currentObject.fontSize)
        obj.setCoords()
        canvas.renderAll()
      }
    },
    changeTimeZone () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      if (obj) {
        var newVal = this.currentObject.gmt
        obj.set('gmt', newVal)
        var newObj = obj.clone()
        canvas.add(newObj)
        Events.bindEvents(this.$parent.$parent, newObj)
        canvas.remove(obj)
        // Programmatically Select Newly Added Object
        canvas.setActiveObject(newObj)
        canvas.renderAll()
      }
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
// Transitions
#attributes {
  font-size: 13px;
  border-top: 2px solid $pureblack;
  &.fade-enter-active, &.fade-leave-active {
  transition: .6s all ease;
}
.attribution-group {
  .row {
    .controlgroup {
      @include gallery(6 of 12 1);
    } 
  }
}
  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    width: 0;
    padding: 0;
    // transform: translateX(40%);
  } 
}
</style>
