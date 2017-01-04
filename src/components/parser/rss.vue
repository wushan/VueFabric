<template lang="pug">
  .rss(v-bind:style="attributes")
    h4 RSS FRAME
    .attributes
      ul
        li
          span type:
          span {{attr.rssmarquee.type}}
        li
          span url:
          span {{attr.rssmarquee.source}}
        li
          span transitionType:
          span {{attr.rssmarquee.transitionType}}
        li
          span leastTime:
          span {{attr.rssmarquee.leastTime}}s
        li
          span transitionTime:
          span {{attr.rssmarquee.transitionTime}}s
        li
          span backgroundColor:
          span {{attr.rssmarquee.backgroundColor}}
        li
          span fontcolor:
          span {{attr.rssmarquee.fontcolor}}
        li
          span fontface:
          span {{attr.rssmarquee.fontface}}
        li
          span size:
          span {{attr.rssmarquee.size}}
    .attention IS affected by style.
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
  props: ['attr'],
  methods: {
  },
  computed: {
    attributes () {
      var style = {
        width: this.attr.width * this.attr.scaleX + 'px',
        height: this.attr.height * this.attr.scaleY + 'px',
        top: this.attr.top + 'px',
        left: this.attr.left + 'px',
        transform: 'rotate(' + this.attr.angle + 'deg)',
        'background-color': this.attr.rssmarquee.backgroundColor,
        'font-family': this.attr.rssmarquee.fontface,
        // 'font-size': this.attr.typography.size + 'px',
        color: this.attr.rssmarquee.fontcolor
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
.rss {
  padding: 1em;
  box-sizing: border-box;
  overflow-y: scroll;
  border: 1px solid $white;
  h4 {
    margin: 0;
  }
  .attributes {
    ul {
      display: block;
      margin: 1em 0;
      padding: 0;
      list-style-type: none;
      font-size: 12px;
      opacity: .8;
      color: $white;
      font-family: $sans-serif;
      li {
        border-bottom: 1px solid $white;
        display: block;
        padding: .5em 0;
        span {
          &:first-child {
            text-transform: uppercase;
            font-weight: 600;
            margin-right: 1em;
          }
        }
      }
    }
  }
  .attention {
    background-color: $black;
    color: $yellow;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    top: .5em;
    right: .5em;
  }
}
</style>
