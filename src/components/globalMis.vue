<template lang="pug">
  #globalMis
    .globalMis-wrapper
      .globalMis-inner
        .block
          button.basic.btn.delete 放棄編輯
        .block
          .resolution Program Name / Resolution: {{width}} x {{height}} / etc.
        .block
          //- .programname Program Name: 'some php string'
          //- button.basic.btn.edit 加入群組
          .canvaslayer-handle(@click="toggleCanvasLayer", :class="{active:canvasLayer}")
            span LAYER
            .handle
          button.edit.btn.basic(@click="triggerInteraction") 互動設定
          button.basic.btn.basic(@click="triggerArrangement") 排程發佈
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['width', 'height', 'canvasLayer'],
  methods: {
    triggerArrangement () {
      this.$parent.$emit('triggerArrangement', true)
    },
    triggerInteraction () {
      this.$parent.$emit('triggerInteraction', true)
    },
    toggleCanvasLayer () {
      this.$root.$children[0].$emit('toggleCanvasLayer')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
#globalMis {
  height: 50px;
  line-height: 50px;
  padding: 0 1em;
  background-color: $black;
}
.globalMis-inner {
  &:before, &:after {
    content: '';
    display: block;
    clear: both;
  }
  .block {
    @include gallery(4 of 12);
    &:last-child {
      text-align: right;
    }
    .btn {
      padding: .7em 1em;
    }
  }
}
.canvaslayer-handle {
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
</style>
