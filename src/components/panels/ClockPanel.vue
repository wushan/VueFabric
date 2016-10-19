<template lang="jade">
  #clocksettings.floating-menu
    .canvasconfig-wrapper
      .canvasconfig-inner
        loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
        transition(name="fade", mode="out-in")
          .row.componentpresets(v-if="clockpresets")
            .block(v-for="clock in clockpresets")
              a(href="javascript:;")
                .thumbnail
                  img(:src="baseUrl + clock.image")
                .name {{ clock.name }}
</template>

<script>
import Api from '../../assets/canvascomposer/Api'
import Loader from '../Loader'
export default {
  components: {
    Loader
  },
  data () {
    return {
      clockpresets: null,
      loading: false,
      loadingtext: '素材讀取中'
    }
  },
  created () {
    this.fetchData()
  },
  props: ['baseUrl'],
  methods: {
    fetchData () {
      this.loading = true
      Api.getLibClock((err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          this.clockpresets = data
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
.canvasconfig-inner {
  .block {
    @include gallery(6 of 12 2);
    margin-bottom: 1em;
    .name {
      margin-top: 1em;
    }
  }
}
</style>
