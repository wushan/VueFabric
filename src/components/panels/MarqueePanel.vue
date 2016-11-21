<template lang="pug">
  #marquee-settings.floating-menu
    .canvasconfig-wrapper
      h1 Marquee
      .canvasconfig-inner
        form#fromcustom.marquee-form(@submit.stop.prevent="addMarquee")
          .string-list-wrapper
            .string-settings.row
              .controlgroup
                label 持續時間
                .controls
                  input.marquee-leasttime(type='number', placeholder='3', v-model="marquee.leastTime")
            
              .controlgroup
                label 切換特效
                .controls
                  .select-wrapper
                    select.marquee-type(v-model="marquee.transitionType")
                        option(value='horizontal') 單行(水平)
                        option(value='vertical') 多行(垂直)
              
              .controlgroup
                label 特效時間
                .controls
                  input.marquee-transitionperiod(type='number', placeholder='3', v-model="marquee.transitionPeriod")
            .string-item
              .controlgroup
                textarea.marquee-string.full(placeholder='字串', v-model="marquee.source")
              p ( Enter 換行 )
          .call-action.centered
            button.btn.basic.full.js-sendToMarquee(type="submit") 建立跑馬燈
          
</template>

<script>
// import Api from '../../assets/canvascomposer/Api'
// import Loader from '../Loader'
// import Events from '../../assets/cc.objectEvents'
// Expose Jquery Globally.
// import $ from 'jquery'
// window.jQuery = window.$ = $
export default {
  components: {
  },
  props: ['width', 'height', 'baseUrl'],
  data () {
    return {
      marquee: {
        source: '',
        leastTime: '3',
        transitionType: 'default',
        transitionPeriod: '3'
      }
    }
  },
  created () {
  },
  methods: {
    addMarquee (e) {
      console.log(this.marquee)
      this.$parent.$emit('addMarquee', this.marquee)
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
