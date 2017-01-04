<template lang="pug">
  #marquee-settings.floating-menu
    .canvasconfig-wrapper
      h3 RSS 文字跑馬
      .canvasconfig-inner
        .row
          .datas
            form#fromrss.marquee-form(@submit.stop.prevent="addRss")
              .row
                .controlgroup
                  label 來源
                  .controls
                    .select-wrapper
                      select(v-model="rss.type")
                        option(value="dynamic") 多媒體通道
                        option(value="custom") 自訂來源
                .controlgroup
                  label 資源網址
                  .controls
                    input(v-model="rss.source", type="text", name="source", placeholder="http://....")
                .controlgroup
                  label 持續時間
                  .controls
                    input.marquee-leasttime(v-model="rss.leastTime", type='number', name="leastTime")
              
                .controlgroup
                  label 切換特效
                  .controls
                    .select-wrapper
                      select.marquee-type(v-model="rss.transitionType")
                        option(v-for="type in transitionType", :value="type.value") {{type.name}}
              
                .controlgroup
                  label 特效時間
                  .controls
                    input.marquee-transitionperiod(v-model="rss.transitionPeriod", type='number')
              .call-action.centered
                button.btn.basic.full(type="submit") 建立 RSS 跑馬燈
          
</template>

<script>
// import Events from '../../assets/cc.objectEvents'
// Expose Jquery Globally.
// import $ from 'jquery'
// window.jQuery = window.$ = $
export default {
  components: {
  },
  data () {
    return {
      rss: {
        type: 'custom',
        source: '',
        leastTime: '10',
        transitionType: 'random',
        transitionPeriod: '3'
      },
      transitionType: [
        {
          value: 'default',
          name: '預設'
        },
        {
          value: 'random',
          name: '隨機'
        },
        {
          value: 'rightleft',
          name: '由右至左'
        },
        {
          value: 'leftright',
          name: '由左至右'
        },
        {
          value: 'topbottom',
          name: '由上至下'
        },
        {
          value: 'bottomtop',
          name: '由下至上'
        },
        {
          value: 'fade',
          name: '淡入淡出'
        }
      ]
    }
  },
  created () {
  },
  methods: {
    addRss (e) {
      this.$parent.$emit('addRss', this.rss)
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
