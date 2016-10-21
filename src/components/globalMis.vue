<template lang="jade">
  #globalMis
    button.btn.edit A
    button.btn.edit B
    button.btn.edit C
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!'
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
</style>
