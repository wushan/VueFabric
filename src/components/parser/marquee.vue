<template lang="pug">
  .marquee(v-bind:style="attributes")
    .context(v-bind:class="{vertical: attr.marquee.transitionType === 'vertical', horizontal: attr.marquee.transitionType === 'horizontal'}", style="left: 0; top: 0; transform: translateX(0px)")
      .paragraph(v-html="attr.marquee.source")
      //- .paragraph {{attr.marquee.source}}

    //- // Attributes
    //- ul
    //-   li(v-for="(key, value) in attr") {{key}}:{{value}}
</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.marquee(this.attr.marquee.transitionType, this.attr.marquee.leastTime, this.attr.marquee.transitionPeriod)
  },
  props: ['attr'],
  methods: {
    marquee (direction, leastTime, transitionPeriod) {
      var context = this.$el.children[0]
      var paragraph = this.$el.children[0].children[0]
      var timegap = paragraph.clientWidth / (transitionPeriod * 1000)
      // Initial Position
      if (direction === 'horizontal') {
        context.style.transform = 'translateX(' + this.$el.clientWidth + 'px)'
        this.moveHorizontal(context, this.$el.clientWidth, timegap)
      } else {
        context.style.transform = 'translateY(' + this.$el.clientHeight + 'px)'
        this.moveVertical(context, this.$el.clientHeight, timegap)
      }
    },
    moveHorizontal (context, position, timegap) {
      var timer
      if (position <= context.children[0].clientWidth * -1) {
        clearTimeout(timer)
        context.style.transitionDuration = '0ms'
        context.style.transform = 'translateX(' + this.$el.clientWidth + 'px)'
        this.moveHorizontal(context, this.$el.clientWidth, timegap)
      } else {
        clearTimeout(timer)
        position = position - timegap * 100
        context.style.transitionProperty = 'all'
        context.style.transitionDuration = '100ms'
        context.style.transitionTimingFunction = 'linear'
        context.style.transform = 'translateX(' + position + 'px)'
        timer = setTimeout(() => {
          this.moveHorizontal(context, position, timegap)
        }, 100)
      }
    },
    moveVertical (context, position, timegap) {
      var timer
      if (position <= context.children[0].clientHeight * -1) {
        clearTimeout(timer)
        context.style.transitionDuration = '0ms'
        context.style.transform = 'translateY(' + this.$el.clientHeight + 'px)'
        this.moveVertical(context, this.$el.clientHeight, timegap)
      } else {
        clearTimeout(timer)
        position = position - timegap * 100
        context.style.transitionProperty = 'all'
        context.style.transitionDuration = '100ms'
        context.style.transitionTimingFunction = 'linear'
        context.style.transform = 'translateY(' + position + 'px)'
        timer = setTimeout(() => {
          this.moveVertical(context, position, timegap)
        }, 100)
      }
    }
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)'
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
.object.marquee {
  position: relative;
  overflow: hidden;
  .context {
    position: absolute;
    &.horizontal {
      white-space: nowrap;
      div {
        display: inline-block;
        vertical-align: middle;
      }
    }
    &.vertical {
      white-space: pre-wrap;
      div {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
</style>
