<template lang="jade">
  #globalMis
    .globalMis-wrapper
      .globalMis-inner
        .block
          a(href="javascript:;") 放棄編輯
        .block
          .resolution Resolution: {{width}} x {{height}}
        .block
          .programname Program Name: 'some php string'
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['width', 'height']
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
  }
}
</style>
