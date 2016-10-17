<template lang="pug">
  #toolbar
    ul.tools
      li
        a.full.btn.basic.js-add-rect(href="javascript:;" title="新增矩形" @click="addRect")
          i.fa.fa-object-group.fa-lg
      li
        a.full.btn.basic.js-add-circle(href="javascript:;" title="新增圓形", @click="addCircle")
          i.fa.fa-circle-thin.fa-lg
      li
        a.full.btn.basic.js-add-text(href="javascript:;" title="新增文字", data-action='addText')
          i.fa.fa-font.fa-lg
      li
        a.full.btn.basic.js-library(href="javascript:;" title="新增圖片或輪播圖", data-action='addMedia')
          i.fa.fa-photo.fa-lg
      li
        a.full.btn.basic(href="javascript:;" title="新增跑馬燈", data-action='addMarquee')
          i.fa.fa-text-width.fa-lg
        //- include marquee-settings
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時鐘", data-action='addClock')
          i.fa.fa-clock-o.fa-lg
        //- include clock-presets
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時間", data-action='addTime') 時間
        //- #timesettings.floating-menu
        //-   .timeconfig-wrapper
        //-     .timeconfig-inner
        //-       .row
        //-         // moment().format('YYYY-MM-DD HH:mm:ss')
        //-         a.format(href='javascript:;', data-format="YYYY-MM-DD HH:mm:ss") 2016-09-01 12:01:42
        //-         // moment().format('YYYY-MMM-DD HH:mm:ss')
        //-         a.format(href='javascript:;', data-format="YYYY-MMM-DD HH:mm:ss") 2016-Sep-01 12:02:26
      li
        a.full.btn.basic(href="javascript:;" title="新增天氣", data-action='addWeather')
          i.fa.fa-cloud.fa-lg
        //- #weatherSettings.floating-menu
        //-   .canvasconfig-wrapper
        //-     .canvasconfig-inner
        //-       .row
        //-         .controlgroup
        //-           label 群組
        //-           .controls
        //-             .select-wrappper
        //-               select#weatherGroup
        //-                 option(value='1') 共用群組
        //-                 option(value='0') 使用者群組
        //-         .controlgroup
        //-           label 分類：
        //-           .controls
        //-             .select-wrapper
        //-               select#weatherCate(data-selected='9999')
        //-         .controlgroup
        //-           label 城市：
        //-           .controls
        //-             .select-wrapper
        //-               select#weatherCity
        //-         .call-action
        //-           a.btn.basic.full(href='javascript:;') 置入
      li
        a.full.btn.basic(href="javascript:;" title="USB", data-action='addUsb') USB
      li
        a.full.btn.basic(href="javascript:;" title="WWW", data-action='addWeb') WWW
      li
        a.full.btn.basic(href="javascript:;" title="RTSP", data-action='addRtsp') RTSP
      li
        a.full.btn.delete.js-dispose(href="javascript:;" title="清除所有物件", data-action='disposeAll')
          i.fa.fa-eraser.fa-lg
    
    ul.tools
      li
        a.full.btn.edit.js-setting(href="javascript:;" title="版面設定", data-action='artboardSettings')
          i.fa.fa-cogs.fa-lg
        //- include canvassettings
      li
        a.full.btn.edit.js-save(href="javascript:;" title="儲存", data-action='saveState')
          i.fa.fa-floppy-o.fa-lg
        //- .floating-menu
        //-   .canvasconfig-wrapper
        //-     .canvasconfig-inner
        //-       .row
        //-         a.btn.edit.full.js-save-svg(href='javascript:;', data-action='saveAsPreset') 儲存為版型
        //-         a.btn.edit.full.js-save-png(href='javascript:;', data-action='saveAsProgram') 儲存為節目
</template>

<script>
import Events from '../assets/cc.objectEvents'
export default {
  name: 'Toolbar',
  components: {
  },
  created () {
  },
  mounted () {
  },
  props: ['currentObject', 'initialRadius'],
  methods: {
    addRect () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var rect = new fabric.Rect({
        left: canvas.getWidth() / 2 - 100 / 2,
        top: canvas.getHeight() / 2 - 100 / 2,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        width: this.initialRadius,
        height: this.initialRadius,
        padding: 0,
        strokeWidth: 0
      })
      rect.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction
          })
        }
      })(rect.toObject)
      rect.perPixelTargetFind = true
      canvas.add(rect)
      // CanvasComposer.History.Update()
      canvas.renderAll()
      // Bind
      this.bindEvents(rect)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(rect)
    },
    addCircle: function () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var circle = new fabric.Circle({
        left: canvas.getWidth() / 2 - this.initialRadius / 2,
        top: canvas.getHeight() / 2 - this.initialRadius / 2,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        radius: this.initialRadius / 2
      })
      circle.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction
          })
        }
      })(circle.toObject)
      circle.perPixelTargetFind = true
      canvas.add(circle)
      canvas.renderAll()
      // CanvasComposer.History.Update()
      // Bind
      this.bindEvents(circle)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(circle)
      // Refresh log
    },
    bindEvents (object) {
      Events.bindEvents(this.$parent, object)
      this.$parent.$emit('updateHistory')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "../assets/scss/buttons";
#toolbar {
  text-align: center;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      margin: 5px 0;
      // a {
      //   padding: .9em .4em;
      //   display: block;
      //   &.btn {
      //     border-radius: 3px;
      //   }
      //   &.basic {
      //     background-color: $blue;
      //   }
      // }
    }
  }  
}
</style>
