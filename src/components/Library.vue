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
            option(v-for="category in computedCategory", :value="category.cateId", :key="category.cateId") {{ category.public==1 ? '[共用]-' : '[使用者]-' }}{{ category.name }} / {{category.cateId}}
    transition(name="fade", mode="out-in")
      .controlgroup(v-if="subCategory")
        .select-wrapper(v-if="subCategory.length > 0")
          select(@change="changed")
            option(v-for="sub in subCategory", :value="{sub}", :key="sub.cateId") {{ sub.name }}

    transition(name="fade", mode="out-in")
      .materials-wrapper
        .materials-list
          .material(v-for="item in items")
            img(:src="baseURL + item.thumbnail")

    #loading(v-if="loading")
      img(src="../assets/images/loader-s.gif")
      p 素材讀取中
</template>

<script>
import Api from '../assets/canvascomposer/Api'
export default {
  data () {
    return {
      selectedCategory: '9999',
      baseURL: 'http://radi.4webdemo.com/',
      loading: true,
      defaultCateId: 9999,
      categories: null,
      items: null,
      num: 0,
      limit: 10,
      isUser: false,
      isPublic: false
    }
  },
  beforeCreate () {
  },
  created () {
    this.fetchData(this.defaultCateId, null, this.num, this.limit, 1)
  },
  computed: {
    computedCategory () {
      var combinedArray = []
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
    },
    selectedCategoryObj () {
      if (this.computedCategory) {
        let selected = this.selectedCategory
        return this.computedCategory.filter(function (item) {
          if (item.cateId === selected) {
            return item
          } else {
            return false
          }
        })
      }
    },
    subCategory () {
      if (this.computedCategory) {
        let selected = this.selectedCategory
        return this.computedCategory.filter(function (item) {
          if (item.cateId === selected && item.hasOwnProperty('sub')) {
            return item
          } else {
            return false
          }
        })
      }
    }
  },
  methods: {
    changed (obj) {
      console.log(obj)
      if (this.subCategory.length > 0) {
        this.fetchData(this.selectedCategory, this.subCategory[0].cateId, this.num, this.limit, this.subCategory[0].public)
      } else {
        this.fetchData(this.selectedCategory, null, this.num, this.limit, this.selectedCategoryObj[0].public)
      }
    },
    fetchData (cateId, subId, num, limit, isPublic) {
      Api.getLibCategory(cateId, subId, num, limit, isPublic, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
          this.categories = data.category
          this.items = data.library
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
    background-color: $pureblack;
    border-radius: 6px;
    padding: .5em;
    margin: 1em 0;
    .materials-wrapper {
      .materials-list {
        @extend .clr;
        .material {
          @include gallery(6 of 12);
        }
      }
    }
  }
</style>
