<template lang="pug">
  .slider(v-bind:style="attributes")
    .slide(v-for="slide in attr.slides", v-bind:style="'background-size:' + slide.imgWidth * attr.scaleX + 'px ' + slide.imgHeight * attr.scaleY + 'px' + ';background-image: url(' + slide.url + '); background-position:' + slide.offsetX + 'px ' + slide.offsetY + 'px; opacity: 0;'")
      .video-wrapper(v-if="slide.video", v-bind:style="'width:' + slide.imgWidth * attr.scaleX + 'px; height:' + slide.imgHeight * attr.scaleY + 'px' + '; left:' + slide.offsetX + 'px; top:' + slide.offsetY + 'px;'")
        video(autoplay, loop, v-bind:style="styleObj", @loadedmetadata="loaded")
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
      if (object[0].leastTime === 0) {
        // Stop When first slide is infinity.
        context[0].style.transitionProperty = 'all'
        context[0].style.transitionDuration = object[0].transitionTime + 's'
        context[0].style.transitionTimingFunction = 'linear'
        context[0].style.opacity = 1
      } else {
        // 顯示最後一張
        context[0].style.transitionProperty = 'all'
        context[0].style.transitionDuration = object[0].transitionTime + 's'
        context[0].style.transitionTimingFunction = 'linear'
        context[0].style.opacity = 1
        var i = 1
        this.timer = setTimeout(() => {
          this.firstRun(i, context, object)
        }, object[0].leastTime * 1000)
      }
    },
    firstRun (i, context, object) {
      context[i].style.transitionProperty = 'all'
      context[i].style.transitionDuration = object[i].transitionTime + 's'
      context[i].style.transitionTimingFunction = 'linear'
      context[i].style.opacity = 1
      // Fade everything out
      for (var item of context) {
        if (context[i] !== item) {
          item.style.opacity = 0
        }
      }
      if (this.timer) {
        clearTimeout(this.timer)
        console.log('clearTimeout')
        console.log(i)
        if (object[i].leastTime === 0) {
          console.log('stop')
          return
        }
      }
      if (i === object.length - 1) {
        i = 0
      } else {
        i++
      }
      this.timer = setTimeout(() => {
        this.transition(i, context, object)
      }, object[i].leastTime * 1000 + object[i].transitionTime * 1000)
    },
    transition (i, context, object) {
      context[i].style.transitionProperty = 'all'
      context[i].style.transitionDuration = object[i].transitionTime + 's'
      context[i].style.transitionTimingFunction = 'linear'
      context[i].style.opacity = 1
      // Fade everything out
      for (var item of context) {
        if (context[i] !== item) {
          item.style.opacity = 0
        }
      }
      if (this.timer) {
        clearTimeout(this.timer)
        console.log('clearTimeout')
        console.log(i)
        if (object[i].leastTime === 0) {
          console.log('stop')
          return
        }
      }
      if (i === object.length - 1) {
        i = 0
      } else {
        i++
      }
      this.timer = setTimeout(() => {
        this.transition(i, context, object)
      }, object[i].leastTime * 1000 + object[i].transitionTime * 1000)
    }
  },
  computed: {
    attributes () {
      var flipX
      var flipY
      if (this.attr.flipX) {
        flipX = 'scaleX(-1)'
      }
      if (this.attr.flipY) {
        flipY = 'scaleY(-1)'
      }
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)' + flipX + flipY,
        'background-color': this.attr.fill
      }
      return Css(style)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../bower_components/susy/sass/susy";
@import "../../../bower_components/breakpoint-sass/stylesheets/breakpoint";
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
    }
  }
}
</style>
