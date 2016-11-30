<template lang="pug">
  #canvassetting.floating-menu
    .canvasconfig-wrapper
      h3 選擇版型
      span ({{width}}x{{height}})
      .canvasconfig-inner
        loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
        transition(name="fade", mode="out-in")
          .row.layoutpresets(v-if="presets")
            .block(v-for="preset in presets")
              a(href="javascript:;", @click="loadPreset(preset.content)")
                .thumbnail
                  img(v-bind:src="baseUrl + preset.image")
                .name {{preset.name}}
          
</template>

<script>
import Api from '../../assets/canvascomposer/Api'
import Loader from '../Loader'
// import Events from '../../assets/cc.objectEvents'
// Expose Jquery Globally.
// import $ from 'jquery'
// window.jQuery = window.$ = $
export default {
  components: {
    Loader
  },
  props: ['width', 'height', 'baseUrl'],
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
    this.getPresets()
  },
  methods: {
    getPresets (num, limit, width, height) {
      Api.getPresets(num, limit, width, height, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          this.presets = data
        }
      })
    },
    loadPreset (data) {
      this.$parent.$parent.$emit('loadPreset', data)
      this.$root.$children[0].$emit('updateSubmenu', null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
#canvassetting {
  .canvasconfig-inner {
    margin-top: 2em;
    .block {
      .thumbnail {
        background-color: $white;
        box-shadow: 0 3px 3px rgba($pureblack, .33);
        transition: .3s all ease;
        &:hover {
          box-shadow: 2px 3px 3px $pureblack;
        }
      }
    }
  }
}
</style>
