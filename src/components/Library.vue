<template lang="jade">
  #library
    transition(name="fade", mode="out-in")
      .controlgroup(v-if="categories")
        label 素材
        .controls.check-group
          .check-item
            input#public(type="checkbox", v-model="isPublic")
            label(for="public") 共用
          .check-item
            input#user(type="checkbox", v-model="isUser")
            label(for="user") 使用者
        .select-wrapper
          select(v-model="selectedCategory", @change="changed")
            option(v-for="(category, index) in computedCategory", :value="category", :key="category.cateId") {{ category.public==1 ? '[共用]-' : '[使用者]-' }}{{ category.name }}
    transition(name="fade", mode="out-in")
      .controlgroup(v-if="subCategory")
        .select-wrapper(v-if="subCategory.length")
          select(@change="changed")
            option(v-for="sub in subCategory") {{ sub.name }} / {{ sub.cateId }}
    loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
    transition(name="fade", mode="out-in")
      .materials-wrapper
        .materials-list
          .material(v-for="item in items")
            img(:src="baseUrl + item.thumbnail")
</template>

<script>
import Api from '../assets/canvascomposer/Api'
import Loader from './Loader'
// Expose Jquery Globally.
import $ from 'jquery'
window.jQuery = window.$ = $
require('imports?$=jquery!../assets/vendor/jquery.mousewheel.js')
require('imports?$=jquery!../assets/vendor/jquery.mCustomScrollbar.js')
export default {
  components: {
    Loader
  },
  data () {
    return {
      selectedCategory: {},
      loading: true,
      loadingtext: '素材讀取中',
      defaultCateId: 9999,
      categories: null,
      items: null,
      num: 0,
      limit: 10,
      isUser: false,
      isPublic: true
    }
  },
  props: ['baseUrl'],
  beforeCreate () {
  },
  created () {
    this.fetchData(this.defaultCateId, null, this.num, this.limit, 1, true)
  },
  mounted () {
    this.$nextTick(function () {
      $('.materials-wrapper').mCustomScrollbar({
        theme: 'light'
      })
    })
  },
  computed: {
    computedCategory () {
      var combinedArray = []
      if (this.categories) {
        if (this.isPublic && !this.isUser) {
          combinedArray = this.categories.public
          return combinedArray
        } else if (!this.isPublic && this.isUser) {
          combinedArray = this.categories.user
          return combinedArray
        } else if (this.isPublic && this.isUser) {
          combinedArray = this.categories.public.concat(this.categories.user)
          return combinedArray
        }
      }
    },
    subCategory () {
      if (this.computedCategory && this.selectedCategory) {
        let selected = this.selectedCategory
        var passed = this.computedCategory.filter(function (item) {
          if (item.cateId === selected.cateId && item.public === selected.public && item.hasOwnProperty('sub')) {
            return true
          } else {
            return false
          }
        })
        if (passed.length > 0) {
          return passed[0].sub
        }
      }
    }
  },
  methods: {
    changed (obj) {
      // console.log(obj)
      if (this.selectedCategory) {
        if (this.subCategory) {
          this.fetchData(this.selectedCategory.cateId, this.subCategory[0].cateId, this.num, this.limit, this.subCategory[0].public, null)
        } else {
          this.fetchData(this.selectedCategory.cateId, null, this.num, this.limit, this.selectedCategory.public, null)
        }
      }
    },
    fetchData (cateId, subId, num, limit, isPublic, initial) {
      this.loading = true
      Api.getLibCategory(cateId, subId, num, limit, isPublic, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          this.categories = data.category
          this.items = data.library
          this.$nextTick(function () {
            if (initial) {
              this.selectedCategory = this.computedCategory[0]
            }
          })
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
  @import "../assets/scss/helpers";
  @import "../assets/scss/var";
  #library {
    text-align: center;
    background-color: $black;
    border-radius: 6px;
    margin: 1em 0;
    .materials-wrapper {
      height: 12em;
      overflow: hidden;
      .materials-list {
        @extend .clr;
        .material {
          @include gallery(6 of 12);
          margin-bottom: .3em;
        }
      }
    }
  }
</style>
