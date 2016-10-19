<template lang="jade">
  #timesettings.floating-menu
    .timeconfig-wrapper
      .timeconfig-inner
        .row
          a.format(href='javascript:;', data-format="YYYY-MM-DD HH:mm:ss") 2016-09-01 12:01:42
          a.format(href='javascript:;', data-format="YYYY-MMM-DD HH:mm:ss") 2016-Sep-01 12:02:26
</template>

<script>
import Loader from '../Loader'
export default {
  components: {
    Loader
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
#timesettings {
  a {
    display: block;
    padding: 2em 1em;
    background-color: darken($darkblue, 5%);
    margin-bottom: .5em;
    transition: .3s all ease;
    &:hover {
      background-color: darken($darkblue, 10%);
    }
  }
}
</style>
