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
          button.basic.btn.basic(@click="triggerArrangement") 排程發佈
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['width', 'height'],
  methods: {
    triggerArrangement () {
      this.$parent.$emit('triggerArrangement', true)
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
</style>
