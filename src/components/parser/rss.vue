<template lang="pug">
  .rssobj(v-bind:style="attributes")
    .context(style="left: 0; top: 0; transform: translateX(0px)")
      .paragraph(v-if="combineStrings") {{combineStrings}}
      .paragraph(v-else) RSS 資源擷取失敗
        //- span(v-for="item in items") {{item.title}}
</template>

<script>
import request from 'superagent'
import Css from 'object-to-css'
var parser
var xmlDoc

export default {
  data () {
    return {
      items: [],
      timer: null
    }
  },
  beforeDestroy () {
    this.items = []
    clearTimeout(this.timer)
  },
  created () {
    var source = this.attr.rssmarquee.source
    if (source) {
      console.log(source)
    } else {
      source = 'http://www.appledaily.com.tw/rss/newcreate/kind/rnews/type/new'
    }
    request.get('https://crossorigin.me/' + source)
    .accept('xml')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.text)
        if (window.DOMParser) {
          parser = new window.DOMParser()
          xmlDoc = parser.parseFromString(res.text, 'text/xml')
        } else {
          xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM')
          xmlDoc.async = false
          xmlDoc.loadXML(res.text)
        }
        // xmlDoc = [].slice.call(xmlDoc.getElementsByTagName('item'))
        // this.items = xmlDoc
        this.parseXML(xmlDoc)
      }
    })
  },
  mounted () {
  },
  props: ['attr'],
  methods: {
    marquee () {
      var context = this.$el.children[0]
      // 起始點
      context.style.transform = 'translateX(' + this.$el.clientWidth + 'px)'
      this.moveHorizontal(context, this.$el.clientWidth, this.$el.clientWidth)
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
      context.style.transitionDuration = this.attr.rssmarquee.speed * 100 + 'ms'
      context.style.transitionTimingFunction = 'linear'
      context.style.transform = 'translateX(' + position + 'px)'
      this.timer = setTimeout(() => {
        this.moveHorizontal(context, position, startpoint)
      }, this.attr.rssmarquee.speed * 100)
    },
    parseXML (data) {
      var itemArray = []
      // Parsing Results
      var context = data.getElementsByTagName('item')
      var i = 0
      for (var item of context) {
        var title = item.getElementsByTagName('title')
        for (var titleText of title) {
          var singleItem = {
            title: titleText.innerHTML.replace('<![CDATA[', '').replace(']]>', '')
          }
          itemArray.push(singleItem)
          i++
          console.log(i)
          if (i >= 10) {
            break
          }
        }
      }
      this.items = itemArray
      this.$nextTick(() => {
        this.marquee()
      })
      // var item = {
      //   title: xmlDoc.getElementsByTagName('item').childNodes.title
      // }
      // console.log(item)
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
        'background-color': this.attr.rssmarquee.backgroundColor,
        'font-family': this.attr.rssmarquee.fontface,
        'font-size': this.attr.rssmarquee.size + 'px',
        color: this.attr.rssmarquee.fontcolor
      }
      return Css(style)
    },
    combineStrings () {
      var concatString = ''
      for (var item of this.items) {
        concatString = concatString + item.title + '   /   '
      }
      return concatString
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../../node_modules/susy/sass/susy";
@import "../../../node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
.rssobj {
  padding: 1em;
  box-sizing: border-box;
  overflow: hidden;
  h4 {
    margin: 0;
  }
  .context {
    white-space: nowrap;
    position: absolute;
    .paragraph {
      display: inline-block;
      vertical-align: middle;
      white-space: pre;
    }
    // span {
    //   white-space: nowrap;
    // }
  }
}
</style>
