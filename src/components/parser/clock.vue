<template lang="pug">
  .clock(v-bind:style="attributes")
    .clock-object
      .frame
        img(v-bind:src="'/static/assets/' + attr.frame")
      .hour(v-bind:style="'transform: rotate(' + this.hour + 'deg);'")
        img(v-bind:src="'/static/assets/' + attr.hour")
      .minute(v-bind:style="'transform: rotate(' + this.minute + 'deg);'")
        img(v-bind:src="'/static/assets/' + attr.minute")
      .second(v-bind:style="'transform: rotate(' + this.second + 'deg);'")
        img(v-bind:src="'/static/assets/' + attr.second")
</template>

<script>
import Css from 'object-to-css'
export default {
  data () {
    return {
      currentTime: null,
      second: 0,
      minute: 0,
      hour: 0
    }
  },
  props: ['attr'],
  created () {
    this.second = 6 * window.moment().tz(this.attr.gmt).format('ss')
    this.minute = 6 * window.moment().tz(this.attr.gmt).format('mm')
    this.hour = 30 * window.moment().tz(this.attr.gmt).format('H') + 6 * window.moment().tz(this.attr.gmt).format('mm') / 360 * 30
    this.mountClock()
  },
  methods: {
    mountClock () {
      this.currentTime = window.moment()
      this.second = this.second + 6
      this.minute = 6 * window.moment().tz(this.attr.gmt).format('mm')
      this.hour = 30 * window.moment().tz(this.attr.gmt).format('H') + 6 * window.moment().tz(this.attr.gmt).format('mm') / 360 * 30
      setTimeout(() => {
        this.mountClock()
      }, 1000)
    }
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width + 'px',
        height: this.attr.height + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg) ' + 'scaleX(' + this.attr.scaleX + ') ' + 'scaleY(' + this.attr.scaleY + ')'
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
.clock {
  .clock-object {
    position: relative;
    height: 100%;
    width: 100%;
    div {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
}
</style>
