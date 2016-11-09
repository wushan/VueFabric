<template lang="pug">
  #loading(v-if="loading")
    .loading-msg
      img(src="../assets/images/loader-s.gif")
      p {{ loadingtext }}
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['loading', 'loadingtext']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
#loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  z-index: 999;
	display: flex;
	align-items: center;
  justify-content: center;
  background-color: rgba($pureblack, .66);
  text-align: center;
}
</style>
