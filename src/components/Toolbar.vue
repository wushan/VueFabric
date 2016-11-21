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
        a.full.btn.basic.js-library(href="javascript:;" title="新增圖片或輪播圖", @click='addMedia')
          i.fa.fa-photo.fa-lg
      li
        a.full.btn.basic(href="javascript:;" title="新增跑馬燈", @click="updateSub('marqueepanel')", :class="{ active: currentView=='marqueepanel' }")
          i.fa.fa-text-width.fa-lg
      li
        a.full.btn.basic(href="javascript:;" title="新增RSS", @click="updateSub('rsspanel')", :class="{ active: currentView=='rsspanel' }") RSS
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時鐘", @click="updateSub('clockpanel')", :class="{ active: currentView=='clockpanel' }")
          i.fa.fa-clock-o.fa-lg
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時間", @click="updateSub('timepanel')", :class="{ active: currentView=='timepanel' }") 時間
      li
        a.full.btn.basic(href="javascript:;" title="新增天氣", @click="updateSub('weatherpanel')", :class="{ active: currentView=='weatherpanel' }")
          i.fa.fa-cloud.fa-lg
      li
        a.full.btn.basic(href="javascript:;" title="USB", @click="addUsb") USB
      li
        a.full.btn.basic(href="javascript:;" title="WWW", @click="addWeb") WWW
      li
        a.full.btn.basic(href="javascript:;" title="RTSP", @click="addRtsp") RTSP
      li
        a.full.btn.delete.js-dispose(href="javascript:;" title="清除所有物件", @click="disposeAll")
          i.fa.fa-eraser.fa-lg
    
    ul.tools
      li
        a.full.btn.edit.js-setting(href="javascript:;" title="版面設定", @click="updateSub('presetpanel')", :class="{ active: currentView=='presetpanel' }")
          i.fa.fa-cogs.fa-lg
      li
        a.full.btn.edit.js-save(href="javascript:;" title="儲存", @click="updateSub('savepanel')", :class="{ active: currentView=='savepanel' }")
          i.fa.fa-floppy-o.fa-lg
        //- .floating-menu
        //-   .canvasconfig-wrapper
        //-     .canvasconfig-inner
        //-       .row
        //-         a.btn.edit.full.js-save-svg(href='javascript:;', data-action='saveAsPreset') 儲存為版型
        //-         a.btn.edit.full.js-save-png(href='javascript:;', data-action='saveAsProgram') 儲存為節目
    transition(name="fly", mode="out-in")
      component(v-bind:is="currentView", v-bind:baseUrl="baseUrl", v-bind:width="width", v-bind:height="height")
</template>

<script>
import Events from '../assets/cc.objectEvents'
import Clockpanel from './panels/ClockPanel'
import Timepanel from './panels/TimePanel'
import Weatherpanel from './panels/WeatherPanel'
import Presetpanel from './panels/PresetPanel'
import Savepanel from './panels/SavePanel'
import Marqueepanel from './panels/MarqueePanel'
import Rsspanel from './panels/RssPanel'
// UUID
import uuid from 'node-uuid'
export default {
  name: 'Toolbar',
  components: {
    Clockpanel,
    Timepanel,
    Weatherpanel,
    Presetpanel,
    Savepanel,
    Marqueepanel,
    Rsspanel
  },
  data () {
    return {
    }
  },
  created () {
    this.$on('addRss', function (src) {
      this.addRss(src)
    })
    this.$on('addMarquee', function (src) {
      this.addMarquee(src)
    })
  },
  mounted () {
  },
  props: ['currentObject', 'initialRadius', 'baseUrl', 'currentView', 'width', 'height'],
  methods: {
    addRect () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var rect = new fabric.Rect({
        id: uuid.v4(),
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
        id: uuid.v4(),
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
        id: uuid.v4(),
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
    addUsb () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var bg = new fabric.Rect({
        fill: '#333333',
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        padding: 0,
        strokeWidth: 0,
        originX: 'center',
        originY: 'center'
      })
      var text = new fabric.Text('<USB Frame>', {
        left: 0,
        top: 0,
        fontSize: '14',
        fontFamily: 'Open sans',
        textAlign: 'center',
        fill: '#cccccc',
        originX: 'center',
        originY: 'center'
      })
      var group = new fabric.Usbframe([bg, text], {
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100,
        top: canvas.getHeight() / 2 - 100,
        padding: 0,
        strokeWidth: 0
      })
      group.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction
          })
        }
      })(group.toObject)
      group.perPixelTargetFind = true
      canvas.add(group)
      canvas.renderAll()
      // CanvasComposer.History.Update()
      // Bind
      this.bindEvents(group)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(group)
      // Refresh log
    },
    addWeb () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var bg = new fabric.Rect({
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        padding: 0,
        strokeWidth: 0,
        fill: '#cccccc',
        originX: 'center',
        originY: 'center'
      })
      var text = new fabric.Text('<WebView>', {
        left: 0,
        top: 0,
        fontSize: '14',
        fontFamily: 'Open sans',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
      })
      var group = new fabric.Webview([bg, text], {
        id: uuid.v4(),
        left: 0,
        top: 0
      })
      group.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            webview: this.webview,
            interaction: this.interaction,
            placeholder: this.placeholder
          })
        }
      })(group.toObject)
      group.perPixelTargetFind = true
      canvas.add(group)
      // Bind
      this.bindEvents(group)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(group)
      // Refresh log
    },
    addRtsp () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var bg = new fabric.Rect({
        fill: '#1a1a1a',
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        padding: 0,
        strokeWidth: 0,
        originX: 'center',
        originY: 'center'
      })
      var text = new fabric.Text('<RTSP Frame>', {
        left: 0,
        top: 0,
        fontSize: '14',
        fontFamily: 'Open sans',
        textAlign: 'center',
        fill: '#cccccc',
        originX: 'center',
        originY: 'center'
      })
      var group = new fabric.Rtspframe([bg, text], {
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100,
        top: canvas.getHeight() / 2 - 100,
        padding: 0,
        strokeWidth: 0
      })
      group.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction,
            rtsp: this.rtsp
          })
        }
      })(group.toObject)
      group.perPixelTargetFind = true
      canvas.add(group)
      canvas.renderAll()
      // Bind
      this.bindEvents(group)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(group)
      // Refresh log
    },
    disposeAll () {
      this.$parent.$emit('disposeAll')
    },
    bindEvents (object) {
      Events.bindEvents(this.$parent, object)
      this.$parent.$emit('updateHistory')
    },
    addMedia () {
      const fabric = window['fabric']
      const canvas = window['canvas']
      var slider = new fabric.Slider({
        id: uuid.v4(),
        width: 200,
        height: 200,
        left: 250,
        top: 250,
        padding: 0,
        strokeWidth: 0,
        fill: '#cccccc'
      })
      canvas.add(slider)
      canvas.renderAll()
      // Bind
      this.bindEvents(slider)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(slider)
    },
    addRss (rsssource) {
      const fabric = window['fabric']
      const canvas = window['canvas']
      // Always Create Text Object from first string.
      var bg = new fabric.Rect({
        fill: '#ffffff',
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        padding: 0,
        strokeWidth: 0,
        originX: 'center',
        originY: 'center'
      })
      var text = new fabric.Text('<RSS Frame>', {
        left: 0,
        top: 0,
        fontSize: '14',
        fontFamily: 'Open sans',
        textAlign: 'center',
        fill: '#cccccc',
        originX: 'center',
        originY: 'center'
      })
      var group = new fabric.Rss([bg, text], {
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100,
        top: canvas.getHeight() / 2 - 100,
        padding: 0,
        strokeWidth: 0,
        rssmarquee: {
          source: rsssource.source,
          leastTime: rsssource.leastTime,
          transitionType: rsssource.transitionType,
          transitionPeriod: rsssource.transitionPeriod
        }
      })
      group.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction,
            rssmarquee: this.rssmarquee
          })
        }
      })(group.toObject)
      group.perPixelTargetFind = true
      canvas.add(group)
      canvas.renderAll()
      // Bind
      this.bindEvents(group)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(group)
    },
    addMarquee (marqueesource) {
      console.log('coming')
      const fabric = window['fabric']
      const canvas = window['canvas']
      // Always Create Text Object from first string.
      var bg = new fabric.Rect({
        fill: '#ffffff',
        width: 200,
        height: 200,
        left: 0,
        top: 0,
        padding: 0,
        strokeWidth: 0,
        originX: 'center',
        originY: 'center'
      })
      var text = new fabric.Text('<Marquee Frame>', {
        left: 0,
        top: 0,
        fontSize: '14',
        fontFamily: 'Open sans',
        textAlign: 'center',
        fill: '#cccccc',
        originX: 'center',
        originY: 'center'
      })
      var group = new fabric.Marquee([bg, text], {
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100,
        top: canvas.getHeight() / 2 - 100,
        padding: 0,
        strokeWidth: 0,
        marquee: {
          source: marqueesource.source,
          leastTime: marqueesource.leastTime,
          transitionType: marqueesource.transitionType,
          transitionPeriod: marqueesource.transitionPeriod
        }
      })
      group.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction,
            marquee: this.marquee
          })
        }
      })(group.toObject)
      group.perPixelTargetFind = true
      canvas.add(group)
      canvas.renderAll()
      // Bind
      this.bindEvents(group)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(group)
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
  border-top: 2px solid $pureblack;
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
  border-left: 2px solid $pureblack;
  box-shadow: 3px 0 3px $black;
  z-index: 1;
}
</style>
