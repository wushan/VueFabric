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
      timer: null
    }
  },
  created () {
    // if (this.$el.children[0].children[0].clientWidth)
  },
  mounted () {
    if (this.$el.children[0].clientWidth < this.$el.clientWidth) {
      this.$el.children[0].style.width = this.$el.clientWidth + 'px'
    }
    if (this.$el.children[0].clientHeight < this.$el.clientHeight) {
      this.$el.children[0].style.height = this.$el.clientHeight + 'px'
    }
    this.marquee(this.attr.marquee.transitionType, this.attr.marquee.leastTime, this.attr.marquee.transitionPeriod)
  },
  props: ['attr'],
  methods: {
    marquee (direction, leastTime, transitionPeriod) {
      var context = this.$el.children[0]
      // Initial Position
      if (direction === 'horizontal') {
        // 起始點
        context.style.transform = 'translateX(' + this.$el.clientWidth + 'px)'
        this.moveHorizontal(context, this.$el.clientWidth, this.$el.clientWidth)
      } else {
        context.style.transform = 'translateY(' + this.$el.clientHeight + 'px)'
        this.moveVertical(context, this.$el.clientHeight, this.$el.clientHeight)
      }
    },
    moveHorizontal (context, position, startpoint) {
      // 起始點
      if (position <= (startpoint + context.clientWidth) * -1) {
        context.style.transitionDuration = '0ms'
        context.style.transform = 'translateX(' + startpoint + 'px)'
        position = startpoint
        clearTimeout(this.timer)
        this.moveHorizontal(context, position, startpoint)
      }
      position = position - 100
      context.style.transitionProperty = 'all'
      context.style.transitionDuration = this.attr.marquee.speed * 100 + 'ms'
      context.style.transitionTimingFunction = 'linear'
      context.style.transform = 'translateX(' + position + 'px)'
      this.timer = setTimeout(() => {
        this.moveHorizontal(context, position, startpoint)
      }, this.attr.marquee.speed * 100)
    },
    moveVertical (context, position, startpoint) {
      // 起始點
      if (position <= (startpoint + context.clientHeight) * -1) {
        context.style.transitionDuration = '0ms'
        context.style.transform = 'translateY(' + startpoint + 'px)'
        position = startpoint
        clearTimeout(this.timer)
        this.moveVertical(context, position, startpoint)
      }
      position = position - 100
      context.style.transitionProperty = 'all'
      context.style.transitionDuration = this.attr.marquee.speed * 100 + 'ms'
      context.style.transitionTimingFunction = 'linear'
      context.style.transform = 'translateY(' + position + 'px)'
      this.timer = setTimeout(() => {
        this.moveVertical(context, position, startpoint)
      }, this.attr.marquee.speed * 100)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': this.attr.marquee.backgroundColor,
        'font-family': this.attr.marquee.fontface,
        'font-size': this.attr.marquee.size + 'px',
        color: this.attr.marquee.fontcolor
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
