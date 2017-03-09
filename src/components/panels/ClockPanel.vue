<template lang="pug">
  #clocksettings.floating-menu
    .canvasconfig-wrapper
      h3 Clock Type
      .canvasconfig-inner
        loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
        transition(name="fade", mode="out-in")
          .row.componentpresets(v-if="clockpresets")
            .block(v-for="clock in clockpresets")
              a(@click="addClock(clock.ClockID)")
                .thumbnail
                  img(:src="baseUrl + clock.image")
                .name {{ clock.name }}
</template>

<script>
import Api from '../../assets/canvascomposer/Api'
import Events from '../../assets/cc.objectEvents'
import Loader from '../Loader'
import Utils from '../../assets/canvascomposer/Utils'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
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
    },
    bindEvents (object) {
      Events.bindEvents(this.$parent.$parent, object)
      this.$parent.$parent.$emit('updateHistory')
    },
    addClock (id) {
      this.$parent.$parent.$emit('globalLoad', true)
      var instance = this
      Api.getClock(id, (err, data) => {
        this.loading = false
        this.$parent.$parent.$emit('globalLoad', false)
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          Utils.loadClock(data, function (o) {
            instance.bindEvents(o)
            instance.$store.commit('increment', 'clock')
          })
          this.$root.$children[0].$emit('updateSubmenu', null)
        }
      })
    }
  },
  computed: {
    baseUrl () {
      return this.$store.state.baseurl
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./node_modules/susy/sass/susy";
@import "./node_modules/breakpoint-sass/stylesheets/breakpoint";
.canvasconfig-inner {
  .block {
    @include gallery(6 of 12 2);
    margin-bottom: 1em;
    cursor: pointer;
    .name {
      margin-top: 1em;
    }
  }
}
</style>
