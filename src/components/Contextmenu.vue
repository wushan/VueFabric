<template lang="pug">
  #context-menu.context-menu(:style="'left:' + position[0] + 'px;top:' + position[1] + 'px;'")
    ul.context-menu__items
      li.context-menu__item(v-if="tuneable")
        a.context-menu__link(href='#', @click="lockRatio({w: 16, h: 9})")
          i.fa.fa-angle-double-up
          |  16:9
      li.context-menu__item(v-if="tuneable")
        a.context-menu__link(href='#', @click="lockRatio({w: 5, h: 4})")
          i.fa.fa-angle-double-up
          |  5:4
      li.context-menu__item(v-if="tuneable")
        a.context-menu__link(href='#', @click="lockRatio({w: 4, h: 3})")
          i.fa.fa-angle-double-up
          |  4:3
      li.context-menu__item(v-if="tuneable")
        a.context-menu__link(href='#', @click="unLockRatio")
          i.fa.fa-angle-double-up
          |  解除比例鎖定
      li.context-menu__item
        a.context-menu__link(href='#', @click="layertop")
          i.fa.fa-angle-double-up
          |  移至頂層 ( &#8984;&nbsp;&#8593; )
      li.context-menu__item
        a.context-menu__link(href='#', @click="layerup")
          i.fa.fa-angle-up
          |  上移一層 ( &#8984;&nbsp;+ )
      li.context-menu__item
        a.context-menu__link(href='#', @click="layerdown")
          i.fa.fa-angle-down
          |  下移一層 ( &#8984;&nbsp;- )
      li.context-menu__item
        a.context-menu__link(href='#', @click="layerbottom")
          i.fa.fa-angle-double-down
          |  移至底層 ( &#8984;&nbsp;&#8595; )
      li.context-menu__item
        a.context-menu__link(href='#', @click="duplicate")
          i.fa.fa-times
          |  Duplicate ( &#8963;&nbsp;D )
      li.context-menu__item
        a.context-menu__link(href='#', @click="lock")
          i.fa.fa-times
          |  鎖定/解鎖 ( &#8984;&nbsp;L )
      li.context-menu__item
        a.context-menu__link(href='#', @click="deleteobj")
          i.fa.fa-times
          |  刪除物件 ( &#8984;&nbsp;Delete )
</template>

<script>
import Utils from '../assets/canvascomposer/Utils'
export default {
  name: 'Contextmenu',
  components: {
  },
  props: ['position', 'currentObject'],
  data () {
    return {
    }
  },
  computed: {
    tuneable () {
      if (this.currentObject) {
        if (this.currentObject.type === 'slider' || this.currentObject.type === 'rect' || this.currentObject.type === 'image') {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    layertop () {
      Utils.layertop()
    },
    layerup () {
      Utils.layerup()
    },
    layerdown () {
      Utils.layerdown()
    },
    layerbottom () {
      Utils.layerbottom()
    },
    duplicate () {
      Utils.duplicate()
    },
    lock () {
      Utils.lock()
    },
    deleteobj () {
      Utils.removeObject()
    },
    lockRatio (ratio) {
      Utils.lockRatio(ratio)
    },
    unLockRatio () {
      Utils.unLockRatio()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
#context-menu {
  position: fixed;
  top: 0;
  left: 0;
}
.context-menu {
  background-color: #b9b9b9;
  border-radius: 6px;
  box-shadow: 3px 3px 9px rgba($black, 1);
  box-sizing: border-box;
  padding: .3em 0;
  font-size: 14px;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: block;
      &:nth-last-child(2) {
        margin-bottom: .3em;
      }
      &:last-child {
        border-top: 1px solid darken($gray, 15%);
        a {
          padding-top: .5em;
        }
      }
    }
  }
  a {
    color: $black;
    display: block;
    padding: .3em .5em;
    i {
      margin: 0 .5em 0 0;
      visibility: hidden;
    }
    &:hover {
      background-color: darken($blue, 5%);
      color: $white;
      i {
        visibility: visible;
      }
    }
  }
}
</style>
