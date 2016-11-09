<template lang="pug">
  #inboundlist
    transition(name="fade", mode="out-in")
      loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
    .inboundlist-inner
      ul
        li(v-for="program in programs")
          a(@click="selectProgram(program.PID)")
            span.id {{program.PID}}
            span.name {{program.name}}
</template>

<script>
import Loader from './Loader'
import Api from '../assets/canvascomposer/Api'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports?$=jquery!../assets/vendor/jquery.mousewheel.js')
require('imports?$=jquery!../assets/vendor/jquery.mCustomScrollbar.js')
export default {
  name: 'Programlist',
  components: {
    Loader
  },
  created () {
    this.getProgramList(this.num, this.limit)
  },
  mounted () {
    var instance = this
    this.$nextTick(function () {
      $('.inboundlist-inner').mCustomScrollbar({
        theme: 'light',
        callbacks: {
          onTotalScroll: function () {
            console.log('what')
            instance.getMoreData(instance.num, instance.limit)
          }
        }
      })
    })
  },
  props: ['currentObject'],
  data () {
    return {
      programs: null,
      num: 0,
      limit: 10,
      loading: false,
      loadingtext: '節目讀取中'
    }
  },
  methods: {
    getProgramList (num, limit) {
      this.loading = true
      Api.getProgramList(num, limit, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          this.programs = data.program
        }
      })
    },
    getMoreData (num, limit) {
      this.loading = true
      this.num = this.num + this.limit
      Api.getProgramList(this.num, limit, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          if (data.program) {
            for (var i = 0; i < data.program.length; i++) {
              this.programs.push(data.program[i])
            }
          } else {
            this.$parent.$parent.$parent.$emit('globalError', '該分類已經沒有更多資料')
          }
        }
      })
    },
    selectProgram (id) {
      this.currentObject.interaction.link.url = id
      this.$parent.$emit('programSelected', false)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
#inboundlist {
  position: relative;
}
.inboundlist-inner {
  height: 18em;
  background-color: lighten($darkestgray, 5%);
  padding: 1em;
  margin-bottom: 2em;
  border-radius: 6px;
  overflow: hidden;
  ul {
    display: block;
    margin: 0;
    padding: 0;
    li {
      display: block;
      a {
        display: flex;
        padding: 0.5em 1em;
        cursor: pointer;
        &:hover {
          background-color: $darkgray;
        }
      }
      span {
        &.id {
          flex: initial;
          width: 40px; 
        }
        &.name {
          flex: 1;
        }
      }
    }
  }
}
</style>
