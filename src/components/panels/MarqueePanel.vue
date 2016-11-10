<template lang="pug">
  #marquee-settings.floating-menu
    .canvasconfig-wrapper
      h1 Marquee
      .canvasconfig-inner
        .row
          .controlgroup
            label 來源：
            .controls
              .select-wrapper
                select#marquee-source
                  option(value="fromrss") RSS 目錄
                  option(value="fromcustom") 自訂字串
          .datas
            #fromcustom.marquee-form
              
              .string-list-wrapper
                .string-settings.row
                  
                  .controlgroup
                    label 持續時間：
                    .controls
                      input.marquee-leasttime(type='number', placeholder='3')
                
                  .controlgroup
                    label 切換特效：
                    .controls
                      .select-wrapper
                        select.marquee-type
                            option(value='horizontal') 單行(水平)
                            option(value='vertical') 多行(垂直)
                  
                  .controlgroup
                    label 特效時間：
                    .controls
                      input.marquee-transitionperiod(type='number', placeholder='3')
                .string-item
                  .controlgroup
                    label 字串：
                    textarea.marquee-string.full(placeholder='字串')
              
              .call-action.centered
                a.btn.basic.full.js-sendToMarquee(href="javascript:;") 建立跑馬燈
          
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
