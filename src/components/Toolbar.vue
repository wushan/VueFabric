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
        a.full.btn.basic.js-add-text(href="javascript:;" title="新增文字", @click="addText")
          i.fa.fa-font.fa-lg
      li
        a.full.btn.basic.js-library(href="javascript:;" title="新增圖片或輪播圖", data-action='addMedia')
          i.fa.fa-photo.fa-lg
      li
        a.full.btn.basic(href="javascript:;" title="新增跑馬燈", data-action='addMarquee')
          i.fa.fa-text-width.fa-lg
        //- include marquee-settings
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時鐘", @click="updateSub('clockpanel')", :class="{ active: currentView=='clockpanel' }")
          i.fa.fa-clock-o.fa-lg
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時間", @click="updateSub('timepanel')", :class="{ active: currentView=='timepanel' }") 時間
      li
        a.full.btn.basic(href="javascript:;" title="新增天氣", @click="updateSub('weatherpanel')", :class="{ active: currentView=='weatherpanel' }")
          i.fa.fa-cloud.fa-lg
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
    transition(name="fly", mode="out-in")
      component(v-bind:is="currentView", v-bind:baseUrl="baseUrl")
</template>

<script>
import Events from '../assets/cc.objectEvents'
import Clockpanel from './panels/ClockPanel'
import Timepanel from './panels/TimePanel'
import Weatherpanel from './panels/WeatherPanel'
export default {
  name: 'Toolbar',
  components: {
    Clockpanel,
    Timepanel,
    Weatherpanel
  },
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  props: ['currentObject', 'initialRadius', 'baseUrl', 'currentView'],
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
    addText: function () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var text = new fabric.Textbox('Default Text', {
        // options
        left: 200,
        top: 200,
        width: 300,
        height: 300,
        fontSize: 24,
        fontFamily: 'Open Sans'
      })
      text.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction
          })
        }
      })(text.toObject)
      canvas.add(text)
      text.center()
      text.setCoords()
      // Bind
      this.bindEvents(text)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(text)
    },
    updateSub (subname) {
      this.$parent.$emit('updateSubmenu', subname)
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
    }
  }
}
.floating-menu {
  position: absolute;
  left: 90px;
  top: 0;
  bottom: 0;
  width: 260px;
  box-sizing: border-box;
  padding: 1em;
  background-color: $darkblue;
  box-shadow: 3px 0 3px $black;
  z-index: 1;
}
</style>
