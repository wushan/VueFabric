<template lang="pug">
  .slider(v-bind:style="attributes")
    .slide(v-for="slide in attr.slides", v-bind:style="'background-size:' + slide.imgWidth * attr.scaleX + 'px ' + slide.imgHeight * attr.scaleY + 'px' + ';background-image: url(' + slide.url + '); background-position:' + slide.offsetX + 'px ' + slide.offsetY + 'px; opacity: 1;'")
      .video-wrapper(v-if="slide.video")
        video(autoplay, loop)
          source(v-bind:src="slide.video")

</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
    }
  },
  props: ['attr'],
  created () {
  },
  mounted () {
    if (this.attr.slides) {
      this.slider(this.attr.slides)
    }
  },
  methods: {
    slider (object) {
      var context = this.$el.children
      console.log(context)
      console.log(this.attr.slides)
      var i = 0
      setTimeout(() => {
        this.transition(i, context, object)
      }, object[0].leastTime * 1000)
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
      if (i === object.length - 1) {
        i = 0
      } else {
        i++
      }
      setTimeout(() => {
        this.transition(i, context, object)
      }, object[i].leastTime * 1000 + object[i].transitionTime * 1000)
    }
  },
  beforeDestory () {
    console.log('leaving slider')
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
      background-color: $white;
      height: 100%;
      width: 100%;
    }
    video {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
