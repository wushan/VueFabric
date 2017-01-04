<template lang="pug">
  .slider.triangle.wrap(v-bind:style="attributes")
    .slide(v-for="slide in attr.slides", v-bind:style="'background-size:' + slide.imgWidth * attr.scaleX + 'px ' + slide.imgHeight * attr.scaleY + 'px' + ';background-image: url(' + slide.url + '); background-position:' + slide.offsetX + 'px ' + slide.offsetY + 'px; opacity: 0;'")
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
      var i = 0
      this.transition(i, context, object)
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
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': this.attr.fill,
        'clip-path': 'polygon(50% 0%, 0% 100%, 100% 100%)'
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
