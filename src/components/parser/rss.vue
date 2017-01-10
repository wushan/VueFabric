<template lang="pug">
  .rssobj(v-bind:style="attributes")
    .context
      .paragraph
        span(v-for="item in items") {{item.title}}
</template>

<script>
import request from 'superagent'
import Css from 'object-to-css'
var parser
var xmlDoc

export default {
  data () {
    return {
      items: []
    }
  },
  beforeDestroy () {
    this.items = []
  },
  created () {
    console.log(this.attr.rssmarquee.source)
    request.get('https://crossorigin.me/' + this.attr.rssmarquee.source)
    .accept('xml')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
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
  props: ['attr'],
  methods: {
    parseXML (data) {
      var itemArray = []
      // Parsing Results
      var context = data.getElementsByTagName('item')
      var i = 0
      for (var item of context) {
        var singleItem = {
          title: item.childNodes[0].innerHTML.replace('<![CDATA[', '').replace(']]>', '')
        }
        itemArray.push(singleItem)
        i++
        console.log(i)
        if (i >= 10) {
          break
        }
      }
      this.items = itemArray
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
.rssobj {
  padding: 1em;
  box-sizing: border-box;
  overflow-y: scroll;
  border: 1px solid $white;
  h4 {
    margin: 0;
  }
  .paragraph {
    span {
      white-space: nowrap;
    }
  }
}
</style>
