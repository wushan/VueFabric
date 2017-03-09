<template lang="pug">
  .slider(v-bind:style="attributes")
    .slide(v-for="slide in attr.slides", v-bind:style="'background-size:' + slide.imgWidth * attr.scaleX + 'px ' + slide.imgHeight * attr.scaleY + 'px' + ';background-image: url(' + slide.url + '); background-position:' + slide.offsetX + 'px ' + slide.offsetY + 'px;'")
      .video-wrapper(v-if="slide.video")
        video(loop, v-bind:id="'video-' + slide.id")
          source(v-bind:src="slide.video")

</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
      timer: null,
      styleObj: null
    }
  },
  props: ['attr'],
  created () {
    console.log('component created')
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  mounted () {
    if (this.attr.slides) {
      this.slider(this.attr.slides)
    }
  },
  methods: {
    loaded (e) {
      console.log(e)
      console.log(e.target.clientHeight)
      this.videoSizing(e.target.parentElement.clientWidth, e.target.parentElement.clientHeight, e.target.clientHeight)
      this.$nextTick(() => {
        this.videoSizing(e.target.parentElement.clientWidth, e.target.parentElement.clientHeight, e.target.clientHeight)
      })
      // console.log(e.target.clientHeight)
      // this.videoScale(e.target.clientHeight)
    },
    videoSizing (ww, wh, h) {
      console.log(wh, h)
      var style = {
        width: ww + 'px',
        transform: 'scaleY(' + wh / h + ')'
      }
      console.log(Css(style))
      this.styleObj = Css(style)
    },
    videoScale (h) {
      // var style = {
      //   transform: scaleY()
      // }
      // return Css(style)
    },
    slider (object) { // 從 0 開始
      var context = this.$el.children
      // 全部設定
      for (var index = 0; index < object.length; index++) {
        context[index].style.transitionProperty = 'all'
        context[index].style.transitionDuration = object[index].transitionTime + 's'
        context[index].style.transitionTimingFunction = 'linear'
        context[index].style.opacity = 0
      }
      var i = 0
      this.timer = setTimeout(() => {
        // 顯示第一張
        if (object[0].leastTime === 0) {
          if (object[0].video) {
            document.getElementById('video-' + object[i].id).play()
          }
          context[0].style.opacity = 1
        } else {
          this.exeSlide(i, context, object)
        }
      }, 1100)
    },
    exeSlide (i, context, object) {
      context[i].style.opacity = 1
      // 如果是影片
      if (object[i].video) {
        document.getElementById('video-' + object[i].id).load()
        document.getElementById('video-' + object[i].id).play()
      }
      this.timer = setTimeout(() => {
        // 準備淡出
        context[i].style.opacity = 0
        if (object[i].video) {
          document.getElementById('video-' + object[i].id).pause()
        }
        // 淡出完畢跳下一則
        if (object[i].leastTime === 0) {
          context[i].style.opacity = 1
          if (object[i].video) {
            document.getElementById('video-' + object[i].id).play()
          }
        } else {
          this.timer = setTimeout(() => {
            if (i === context.length - 1) {
              i = 0
            } else {
              i++
            }
            this.exeSlide(i, context, object)
          }, object[i].transitionTime * 1000)
        }
      }, object[i].leastTime * 1000 + object[i].transitionTime * 1000)
    }
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': this.attr.fill
      }
      return Css(style)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../node_modules/susy/sass/susy";
@import "../../../node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
.slider {
  overflow: hidden;
  .slide {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-repeat: no-repeat;
    .video-wrapper {
      position: absolute;
      background-color: $white;
      height: 100%;
      width: 100%;
    }
    video {
      display: block;
      position: absolute;
      transform-origin: left top;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
