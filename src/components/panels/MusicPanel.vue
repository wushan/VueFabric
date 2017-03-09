<template lang="pug">
#musicPanel
  .musicpanel-inner
    .columns
      .column
        .title SOURCES
        .list.sources
          ul
            li(v-for="song in sources")
              span.name {{song.name}} / {{song.time}}
              span.tools
                a(href="javascript:;", @click="addToList(song)")
                  .fa.fa-plus
                  |  新增
      .column
        .title PLAYLIST
        .list.arranged
          ul(is="draggable", element="ul", v-bind:list="selected", @start="startDragging", @end="endDragging")
            li(v-for="(song, index) in selected")
              span.name {{index}}. {{song.name}} / {{song.time}}
              span.tools
                a(href="javascript:;", @click="removeFromList(index)")
                  .fa.fa-times
                  |  刪除
    .columns
      .column
        a.btn.basic.delete.full(href="javascript:;", @click="toggleMusic") 關閉
      .column
        a.btn.basic.full(href="javascript:;", @click="saveMusicList") 儲存播放清單
          
</template>

<script>
// import Api from '../../assets/canvascomposer/Api'
import Loader from '../Loader'
import draggable from 'vuedraggable'
// import Events from '../../assets/cc.objectEvents'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports-loader?$=jquery!../../assets/vendor/jquery.mousewheel.js')
require('imports-loader?$=jquery!../../assets/vendor/jquery.mCustomScrollbar.js')
export default {
  components: {
    Loader,
    draggable
  },
  data () {
    return {
      loading: true,
      loadingtext: '素材讀取中',
      presets: null,
      num: 0,
      limit: 10
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(function () {
      $('.musicpanel-inner .list').mCustomScrollbar({
        theme: 'light',
        alwaysShowScrollbar: 1,
        callbacks: {
          onTotalScroll: function () {
            // instance.fetchMoreData(instance.selectedCategory.cateId, instance.selectedSubCategory.cateId, instance.num, instance.limit, instance.selectedSubCategory.public)
          }
        }
      })
    })
  },
  methods: {
    toggleMusic () {
      this.$root.$children[0].$emit('updateSubmenu', null)
    },
    saveMusicList () {
      this.$root.$children[0].$emit('updateSubmenu', null)
    },
    addToList (obj) {
      this.$store.commit('addToMusicList', obj)
    },
    removeFromList (id) {
      this.$store.commit('removeFromList', id)
    },
    startDragging () {

    },
    endDragging () {
      this.$store.commit('replaceSelectMusic', this.selected)
    }
  },
  computed: {
    sources () {
      return this.$store.state.music.sources
    },
    selected () {
      return this.$store.state.music.selected
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./node_modules/susy/sass/susy";
@import "./node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
#musicPanel {
  position: absolute;
  bottom: 0;
  left: 75px;
  top: 52px;
  z-index: 2;
  width: 100%;
  max-width: 60%;
  background-color: #2d3235;
  border: 1px solid $pureblack;
  box-shadow: 3px 3px 36px rgba($black, .66);
  padding: 1em 1em 4em 1em;
  box-sizing: border-box;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-bottom: 1px solid lighten(#2d3235, 7%);
    li {
      padding: .4em 1em;
      display: flex;
      // border-top: 1px solid lighten(#2d3235, 5%);
      border-top: 1px solid lighten(#2d3235, 7%);
      border-right: 1px solid lighten(#2d3235, 7%);
      border-left: 1px solid lighten(#2d3235, 7%);
      span {
        flex: 1;
        text-align: left;
        &.tools {
          text-align: right;
        }
      }
      a {
        &:hover {
          color: $white;
        }
      }
    }
  }
  .musicpanel-inner {
    height: calc(100% - 25px);
    .list {
      margin-top: .5em;
      background-color: lighten(#2d3235, 10%);
      border-radius: 3px;
      padding: 1em;
      box-sizing: border-box;    
      box-shadow: inset 1px 1px 3px rgba($black, 66), 1px 1px 1px rgba($white, .2);
      &.arranged {
        ul {
          background-color: #2d3235;
          li {
            border-left: 0;
            border-right: 0;
            border-top: 0;
            border-bottom: 1px solid darken(#2d3235, 5%);
            &:hover {
              box-shadow: none;
            }
          }
        }
        a {
          color: $white;
        }
        span {
          opacity: 1;
        }
      }
      span {
        opacity: .3;
      }
      li {
        &:hover {
          background-color: #2d3235;
          box-shadow: 0 3px 12px rgba($black, .33);
          color: $white;
          span {
            opacity: 1;
          }
        }
      }
      &.sources {
        a {
          color: $gray;
        }
      }
    }
    .list {
      height: calc(100% - 40px);
    }
    .columns {
      height: 100%;
    }
    .columns, .list {
      .column {
        // align-self: strech;
        padding: 0 1em 0 0;
        box-sizing: border-box;
        &:last-child {
          padding: 0;
        }
      }
      .title {
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 0.1em;
        margin-right: 30px;
      }
    }
  }
}
</style>
