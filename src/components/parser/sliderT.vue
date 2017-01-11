<template lang="pug">
  .slider.triangle.wrap(v-bind:style="attributes")
    .slide(v-for="slide in attr.slides", v-bind:style="'background-size:' + slide.imgWidth * attr.scaleX + 'px ' + slide.imgHeight * attr.scaleY + 'px' + ';background-image: url(' + slide.url + '); background-position:' + slide.offsetX + 'px ' + slide.offsetY + 'px; opacity: 0;'")
      .video-wrapper(v-if="slide.video")
        video(autoplay, loop)
          source(v-bind:src="slide.video")
</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
      timer: null
    }
  },
  props: ['attr'],
  created () {
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
        context[context.length - 1].style.transitionProperty = 'all'
        context[context.length - 1].style.transitionDuration = object[object.length - 1].transitionTime + 's'
        context[context.length - 1].style.transitionTimingFunction = 'linear'
        context[context.length - 1].style.opacity = 1
        var i = 0
        this.timer = setTimeout(() => {
          this.transition(i, context, object)
        }, object[0].leastTime * 1000)
      }
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
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': this.attr.fill,
        'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)',
        '-webkit-clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)'
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
@import "../../../bower_components/bourbon/app/assets/stylesheets/bourbon";
@import "../../assets/scss/var";
</style>
