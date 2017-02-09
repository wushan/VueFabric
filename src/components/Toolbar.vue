<template lang="pug">
  #toolbar
    ul.tools
      li
        a.full.btn.basic.js-add-rect(href="javascript:;" title="新增形狀", @click="updateSub('shapepanel')", :class="{ active: currentView=='shapepanel' }")
          i.fa.fa-object-group.fa-lg
      li
        a.full.btn.basic.js-add-text(href="javascript:;" title="新增文字", @click="addText")
          i.fa.fa-font.fa-lg
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時鐘", @click="updateSub('clockpanel')", :class="{ active: currentView=='clockpanel' }")
          i.fa.fa-clock-o.fa-lg
      li
        a.full.btn.basic.js-add-clock(href="javascript:;" title="新增時間", @click="updateSub('timepanel')", :class="{ active: currentView=='timepanel' }") 時間
      li
        a.full.btn.basic(href="javascript:;" title="新增天氣", @click="updateSub('weatherpanel')", :class="{ active: currentView=='weatherpanel' }")
          i.fa.fa-cloud.fa-lg
      li
        a.full.btn.basic.marquee(href="javascript:;" title="新增跑馬燈", @click="addMarquee")
          i.fa.fa-text-width.fa-lg
      li
        a.full.btn.basic.rss(href="javascript:;" title="新增RSS", @click="addRss") RSS
      li
        a.full.btn.basic.usb(href="javascript:;" title="USB", @click="addUsb") USB
      li
        a.full.btn.basic.www(href="javascript:;" title="WWW", @click="addWeb") WWW
      li
        a.full.btn.basic.rtsp(href="javascript:;" title="RTSP", @click="addRtsp") RTSP
      li
        a.full.btn.basic.delete.js-dispose(href="javascript:;" title="清除所有物件", @click="disposeAll")
          i.fa.fa-eraser.fa-lg
    
    ul.tools
      li
        a.full.btn.basic(href="javascript:;" title="背景音樂", @click="updateSub('musicpanel')", :class="{ active: currentView=='musicpanel' }")
          i.fa.fa-music.fa-lg
      li
        a.full.btn.basic.js-setting(href="javascript:;" title="版面設定", @click="updateSub('presetpanel')", :class="{ active: currentView=='presetpanel' }")
          i.fa.fa-cogs.fa-lg
      li
        a.full.btn.basic.js-save(href="javascript:;" title="儲存", @click="updateSub('savepanel')", :class="{ active: currentView=='savepanel' }")
          i.fa.fa-floppy-o.fa-lg
        //- .floating-menu
        //-   .canvasconfig-wrapper
        //-     .canvasconfig-inner
        //-       .row
        //-         a.btn.edit.full.js-save-svg(href='javascript:;', data-action='saveAsPreset') 儲存為版型
        //-         a.btn.edit.full.js-save-png(href='javascript:;', data-action='saveAsProgram') 儲存為節目
    transition(name="fly", mode="out-in")
      component(v-bind:is="currentView", v-bind:width="width", v-bind:height="height")
</template>

<script>
import Events from '../assets/cc.objectEvents'
import Clockpanel from './panels/ClockPanel'
import Timepanel from './panels/TimePanel'
import Weatherpanel from './panels/WeatherPanel'
import Presetpanel from './panels/PresetPanel'
import Savepanel from './panels/SavePanel'
import Shapepanel from './panels/ShapePanel'
import Musicpanel from './panels/MusicPanel'
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
    Shapepanel,
    Musicpanel
  },
  data () {
    return {
    }
  },
  created () {
    this.$on('addMedia', () => {
      this.addMedia()
    })
    this.$on('addCircle', () => {
      this.addCircle()
    })
    this.$on('addTriangle', () => {
      this.addTriangle()
    })
  },
  mounted () {
  },
  props: ['currentObject', 'initialRadius', 'currentView', 'width', 'height'],
  methods: {
    addCircle: function () {
      const fabric = window['fabric']
      const canvas = window['canvas']
      var slider = new fabric.SliderE({
        name: '圓形 - ' + this.$store.state.objects.sliderE,
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100 / 2,
        top: canvas.getHeight() / 2 - 100 / 2,
        padding: 0,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        rx: this.initialRadius / 2,
        ry: this.initialRadius / 2,
        ratio: {w: 'free', h: 'free'}
      })
      canvas.add(slider)
      canvas.renderAll()
      this.$store.commit('increment', 'sliderE')
      // Bind
      this.bindEvents(slider)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(slider)
    },
    addTriangle () {
      const fabric = window['fabric']
      const canvas = window['canvas']
      var slider = new fabric.SliderT({
        name: '三角形 - ' + this.$store.state.objects.sliderT,
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100 / 2,
        top: canvas.getHeight() / 2 - 100 / 2,
        width: this.initialRadius,
        height: this.initialRadius,
        padding: 0,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        ratio: {w: 'free', h: 'free'}
      })
      canvas.add(slider)
      canvas.renderAll()
      this.$store.commit('increment', 'sliderT')
      // Bind
      this.bindEvents(slider)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(slider)
    },
    addText: function () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var text = new fabric.Plaintext('Default Text', {
        // options
        id: uuid.v4(),
        left: 200,
        top: 200,
        width: 300,
        height: 300,
        fontSize: 24,
        fontFamily: 'Open Sans',
        name: '靜態文字 - ' + this.$store.state.objects.plaintext
      })
      // text.toObject = (function (toObject) {
      //   return function () {
      //     return fabric.util.object.extend(toObject.call(this), {
      //       interaction: this.interaction,
      //       id: this.id,
      //       name: this.name
      //     })
      //   }
      // })(text.toObject)
      console.log(text)
      console.log(text.toObject())
      canvas.add(text)
      this.$store.commit('increment', 'plaintext')
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
      var exam = false
      var createUSB = () => {
        if (!exam) {
          var bg = new fabric.Usbframe({
            id: uuid.v4(),
            fill: '#bba60c',
            width: 200,
            height: 200,
            left: canvas.getWidth() / 2,
            top: canvas.getHeight() / 2,
            padding: 0,
            originX: 'center',
            originY: 'center',
            name: 'Usb Frame - ' + this.$store.state.objects.usbframe,
            ratio: {w: 'free', h: 'free'}
          })
          canvas.add(bg)
          this.$store.commit('increment', 'usbframe')
          canvas.renderAll()
          // CanvasComposer.History.Update()
          // Bind
          this.bindEvents(bg)
          // Programmatically Select Newly Added Object
          canvas.setActiveObject(bg)
          // Refresh log
        }
      }
      if (canvas._objects.length > 0) {
        for (var object of canvas._objects) {
          if (object.type === 'usbframe') {
            this.$parent.$emit('globalError', '節目中已有 USB 框架，請勿重複加入。')
            exam = true
            break
          }
        }
        createUSB()
      } else {
        createUSB()
      }
    },
    addWeb () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var bg = new fabric.Webview({
        id: uuid.v4(),
        fill: '#5e7e29',
        width: 200,
        height: 200,
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        padding: 0,
        originX: 'center',
        originY: 'center',
        name: '網頁 -' + this.$store.state.objects.webview,
        ratio: {w: 'free', h: 'free'},
        webview: {
          url: '',
          placeholder: '',
          refreshRate: ''
        },
        toolbox: {
          enable: false,
          position: 'lefttop',
          size: 'medium'
        }
      })
      bg.toObject = (function (toObject) {
        return function () {
          return fabric.util.object.extend(toObject.call(this), {
            interaction: this.interaction,
            webview: {
              url: this.webview.url,
              placeholder: this.webview.placeholder,
              refreshRate: this.webview.refreshRate
            }
          })
        }
      })(bg.toObject)
      canvas.add(bg)
      this.$store.commit('increment', 'webview')
      // Bind
      this.bindEvents(bg)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(bg)
      // Refresh log
    },
    addRtsp () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var bg = new fabric.Rtspframe({
        id: uuid.v4(),
        fill: '#b46b7b',
        width: 200,
        height: 200,
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        padding: 0,
        originX: 'center',
        originY: 'center',
        name: '視訊 - ' + this.$store.state.objects.rtspframe,
        ratio: {w: 'free', h: 'free'}
      })
      canvas.add(bg)
      this.$store.commit('increment', 'rtspframe')
      // Bind
      this.bindEvents(bg)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(bg)
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
        name: '矩形 - ' + this.$store.state.objects.slider,
        id: uuid.v4(),
        left: canvas.getWidth() / 2 - 100 / 2,
        top: canvas.getHeight() / 2 - 100 / 2,
        width: this.initialRadius,
        height: this.initialRadius,
        padding: 0,
        fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
        ratio: {w: 'free', h: 'free'}
      })
      canvas.add(slider)
      // Add Count to Store
      this.$store.commit('increment', 'slider')
      canvas.renderAll()
      // Bind
      this.bindEvents(slider)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(slider)
    },
    addRss (rsssource) {
      const fabric = window['fabric']
      const canvas = window['canvas']
      var bg = new fabric.Rss({
        id: uuid.v4(),
        fill: '#508590',
        width: 200,
        height: 200,
        left: canvas.getWidth() / 2 - 100,
        top: canvas.getHeight() / 2 - 100,
        padding: 0,
        originX: 'center',
        originY: 'center',
        name: 'RSS - ' + this.$store.state.objects.rss,
        rssmarquee: {
          type: 'custom',
          source: '',
          fontface: 'Open Sans',
          size: 14,
          speed: 5,
          fontcolor: 'rgba(0,0,0,1)',
          backgroundColor: 'transparent'
        }
      })
      canvas.add(bg)
      this.$store.commit('increment', 'rss')
      // Bind
      this.bindEvents(bg)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(bg)
      // Refresh log
    },
    addMarquee () {
      const fabric = window['fabric']
      const canvas = window['canvas']
      var bg = new fabric.Marquee({
        id: uuid.v4(),
        fill: '#63513d',
        width: 200,
        height: 200,
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        padding: 0,
        originX: 'center',
        originY: 'center',
        name: '跑馬燈文字 - ' + this.$store.state.objects.marquee,
        marquee: {
          source: '跑馬燈預設文字',
          transitionType: 'horizontal',
          speed: '5',
          size: 14,
          fontface: 'Open Sans',
          fontcolor: 'rgba(0,0,0,1)',
          backgroundColor: 'transparent'
        }
      })
      canvas.add(bg)
      this.$store.commit('increment', 'marquee')
      // Bind
      this.bindEvents(bg)
      // Programmatically Select Newly Added Object
      canvas.setActiveObject(bg)
      // Refresh log
    },
    toggleMusic () {
      this.$parent.$emit('toggleMusic')
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
  border-top: 1px solid $pureblack;
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
  left: 75px;
  top: 52px;
  bottom: 0;
  width: 260px;
  box-sizing: border-box;
  padding: 1em;
  background-color: darken($black, 3%);
  border-left: 1px solid $pureblack;
  box-shadow: 3px 0 3px $black;
  z-index: 1;
}
</style>
