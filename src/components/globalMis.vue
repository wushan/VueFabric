<template lang="pug">
  #globalMis
    .globalMis-wrapper
      .globalMis-inner
        .block
          button.basic.btn.delete 放棄編輯
        .block
          .resolution
            span {{canvas.name}}
            span  / {{canvas.width}} x {{canvas.height}}
        .block
          //- .programname Program Name: 'some php string'
          //- button.basic.btn.edit 加入群組
          //- span 自由選取：
          //- .auto-select(@click="toggleAutoSelection", :class="{active:autoSelection}")
          //-   span AUTO
          //-   .handle
          span 顯示圖層：
          .canvaslayer-handle(@click="toggleCanvasLayer", :class="{active:canvasLayer}")
            span LAYER
            .handle
          button.edit.btn.basic(@click="triggerInteraction") 互動設定
          button.basic.btn.basic(@click="triggerArrangement") 排程發佈
          button.basic.btn.basic(@click="triggerPreview") 預覽
      //- .globalCounter
      //-   ul
      //-     li
      //-       span S
      //-       span {{object.slider}}
      //-     li
      //-       span ST
      //-       span {{object.sliderT}}
      //-     li
      //-       span SE
      //-       span {{object.sliderE}}
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  props: ['canvasLayer', 'autoSelection'],
  methods: {
    triggerArrangement () {
      this.$parent.$emit('triggerArrangement', true)
    },
    triggerInteraction () {
      this.$parent.$emit('triggerInteraction', true)
    },
    toggleCanvasLayer () {
      this.$root.$children[0].$emit('toggleCanvasLayer')
    },
    toggleAutoSelection () {
      this.$root.$children[0].$emit('toggleAutoSelection')
    },
    triggerPreview () {
      this.$root.$children[0].$emit('triggerPreview')
    }
  },
  computed: {
    object () {
      return this.$store.state.objects
    },
    // height () {
    //   return this.$store.state.canvas.height
    // },
    // width () {
    //   return this.$store.state.canvas.width
    // }
    ...mapState([
    // ...
      'canvas'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./node_modules/susy/sass/susy";
@import "./node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
#globalMis {
  height: 50px;
  line-height: 50px;
  padding: 0 .5em;
  position: relative;
  background-color: $black;
}
.globalMis-inner {
  display: flex;
  &:before, &:after {
    content: '';
    display: block;
    clear: both;
  }
  .block {
    flex: 1;
    text-align: center;
    margin-right: .5em;
    .btn {
      padding: .7em 1em;
    }
    &:first-child {
      flex: initial;
    }
    &:nth-child(2) {
      display: none;
      @include breakpoint(768px) {
        display: block;
      }
    }
    &:last-child {
      flex: 1;
      text-align: right;
      margin-right: 0;
    }
  }
  .resolution {
    // padding: 5px 0;
    span {
      // display: block;
      font-size: 12px;
      // line-height: 20px;
    }
  }
}
.canvaslayer-handle, .auto-select {
  display: inline-block;
  vertical-align: middle;
  line-height: 1; 
  transition: .3s all ease;
  cursor: pointer;
  text-align: center;
  background-color: $gray;
  color: $darkgray;
  border-radius: 15px;
  width: 56px; 
  position: relative;
  margin-right: .5em;
  &.active {
    color: $white;
    .handle {
      margin-left: 28px;
      background-color: lighten($green, 10%);
    }
  }
  span {
    display: block;
    font-size: 12px;
    letter-spacing: 2px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 30px; 
  }
  .handle {
    position: relative;
    border-radius: 50%;
    background-color: rgba(#535353, 1);
    transition: .3s all ease;
    width: 26px;
    height: 26px;
    margin: 2px;
  }
  &:hover {
    // color: $white;
    .handle {
      // background-color: rgba(#535353, 1);
    }
  }
}
.globalCounter {
  position: absolute;
  top: 100%;
  left: 0;
  max-width: 300px;
  background-color: $pureblack;
  right: 0;
  z-index: 9;
  margin: auto;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      margin: 0 .5em;
      & > span {
        &:first-child {
          &:after {
            content: ' : '
          }
        }
      }
    }
  }
}
</style>
