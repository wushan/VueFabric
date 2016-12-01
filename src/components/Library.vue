<template lang="pug">
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
          select(v-model="selectedSubCategory", @change="subChanged")
            option(v-for="sub in subCategory", :value="sub") {{ sub.name }} / {{ sub.cateId }}
    transition(name="fade", mode="out-in")
      .materials-container
        loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
        .materials-wrapper
          transition-group.materials-list(name="list-complete", tag="div")
            .material(v-for="item in items", :key="item.LId", @click="insertMedia(item.thumbnail)")
              img(:src="baseUrl + item.thumbnail")
              .type(v-if="item.video_image")
                .fa.fa-play-circle.fa-lg
              .overlay
                .fa.fa-plus.fa-lg

</template>

<script>
import Api from '../assets/canvascomposer/Api'
import Loader from './Loader'
import Events from '../assets/cc.objectEvents'
import Slider from '../assets/canvascomposer/Slider'
// UUID
import uuid from 'node-uuid'
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
      selectedSubCategory: {},
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
    var instance = this
    this.$nextTick(function () {
      $('.materials-wrapper').mCustomScrollbar({
        theme: 'light',
        alwaysShowScrollbar: 1,
        callbacks: {
          onTotalScroll: function () {
            instance.fetchMoreData(instance.selectedCategory.cateId, instance.selectedSubCategory.cateId, instance.num, instance.limit, instance.selectedSubCategory.public)
          }
        }
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
    insertMedia (url) {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var currentObject = canvas.getActiveObject()
      var instance = this.$parent.$parent.$parent
      // If Slider Rectangle
      if (currentObject.type === 'slider' || currentObject.type === 'sliderT') {
        url = this.baseUrl + url

        fabric.Image.fromURL(url, function (img) {
          // Default to Fit the Frame
          if (currentObject.width - img.width >= currentObject.height - img.height) {
            img.scaleToWidth(currentObject.width)
          } else {
            img.scaleToHeight(currentObject.height)
          }
          // img.scaleToWidth(currentObject.width)
          // Make a Pattern
          var patternSourceCanvas = new fabric.StaticCanvas()
          patternSourceCanvas.add(img)
          // console.log('ImageCurrentWidth:' + img.getWidth())
          var pattern = new fabric.Pattern({
            source: function () {
              patternSourceCanvas.setDimensions({
                width: img.getWidth() + 500,
                height: img.getHeight() + 500
              })
              return patternSourceCanvas.getElement()
            },
            repeat: 'no-repeat'
          })
          // Mask (can be any shape ex: Polygon, Circles....)
          var mask = currentObject.clone()
          canvas.remove(currentObject)
          // First Slide
          var slideObj = {
            // Generate an Unique Id for the slide
            id: uuid.v4(),
            imgWidth: img.getWidth(),
            imgHeight: img.getHeight(),
            offsetX: pattern.offsetX,
            offsetY: pattern.offsetY,
            maskWidth: mask.width * mask.scaleX,
            maskHeight: mask.height * mask.scaleY,
            url: url,
            // Default Transition Settings
            leastTime: 3,
            transitionType: 'random',
            transitionTime: 3
          }
          if (!mask.slides) {
            mask.slides = []
          }
          var slidesArray = mask.slides
          slidesArray.push(slideObj)
          mask.visibleslide = slideObj

          mask.set('visibleslide', slideObj)
          mask.set('slides', slidesArray)
          mask.set('fill', pattern)
          mask.on('object:dblclick', function (options) {
            // Pass pattern out
            Slider.enterEditMode(mask, img)
          })
          // console.log(mask)
          Events.bindEvents(instance, mask)
          canvas.add(mask)
          canvas.setActiveObject(mask)
          canvas.renderAll()
          instance.$emit('updateHistory')
        }, { crossOrigin: 'Anonymous' })
      } else if (currentObject.type === 'sliderE') {
        // slider Ellipse
        url = this.baseUrl + url
        fabric.Image.fromURL(url, function (img) {
          // Default to Fit the Frame
          if (currentObject.width - img.width >= currentObject.height - img.height) {
            img.scaleToWidth(currentObject.width)
          } else {
            img.scaleToHeight(currentObject.height)
          }

          // Make a Pattern
          var patternSourceCanvas = new fabric.StaticCanvas()
          patternSourceCanvas.add(img)
          // console.log('ImageCurrentWidth:' + img.getWidth())
          var pattern = new fabric.Pattern({
            source: function () {
              patternSourceCanvas.setDimensions({
                width: img.getWidth() + 500,
                height: img.getHeight() + 500
              })
              return patternSourceCanvas.getElement()
            },
            repeat: 'no-repeat'
          })
          // Mask (can be any shape ex: Polygon, Circles....)
          var mask = currentObject.clone()
          canvas.remove(currentObject)
          // First Slide
          var slideObj = {
            // Generate an Unique Id for the slide
            id: uuid.v4(),
            imgWidth: img.getWidth(),
            imgHeight: img.getHeight(),
            offsetX: pattern.offsetX,
            offsetY: pattern.offsetY,
            maskWidth: mask.width * mask.scaleX,
            maskHeight: mask.height * mask.scaleY,
            url: url,
            // Default Transition Settings
            leastTime: 3,
            transitionType: 'random',
            transitionTime: 3
          }
          if (!mask.slides) {
            mask.slides = []
          }
          var slidesArray = mask.slides
          slidesArray.push(slideObj)
          mask.visibleslide = slideObj

          mask.set('visibleslide', slideObj)
          mask.set('slides', slidesArray)
          mask.set('fill', pattern)
          mask.on('object:dblclick', function (options) {
            // Pass pattern out
            Slider.enterEditMode(mask, img)
          })
          // console.log(mask)
          Events.bindEvents(instance, mask)
          canvas.add(mask)
          canvas.setActiveObject(mask)
          canvas.renderAll()
          instance.$emit('updateHistory')
        }, { crossOrigin: 'Anonymous' })
      } else if (currentObject.type === 'webview') {
        currentObject.set('placeholder', url)
        canvas.renderAll()
        instance.$emit('updateHistory')
      } else {
        return
      }
    },
    changed (obj) {
      // console.log(obj)
      this.num = 0
      if (this.selectedCategory) {
        if (this.subCategory) {
          this.selectedSubCategory = this.subCategory[0]
          this.fetchData(this.selectedCategory.cateId, this.selectedSubCategory.cateId, this.num, this.limit, this.selectedSubCategory.public, null)
        } else {
          this.fetchData(this.selectedCategory.cateId, null, this.num, this.limit, this.selectedCategory.public, null)
        }
      }
    },
    subChanged () {
      this.num = 0
      this.fetchData(this.selectedCategory.cateId, this.selectedSubCategory.cateId, this.num, this.limit, this.selectedSubCategory.public, null)
    },
    fetchData (cateId, subId, num, limit, isPublic, initial) {
      this.loading = true
      Api.getLibCategory(cateId, subId, num, limit, isPublic, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          this.categories = data.category
          this.items = data.library
          this.$nextTick(function () {
            if (initial) {
              this.selectedCategory = this.computedCategory[0]
            }
          })
        }
      })
    },
    fetchMoreData (cateId, subId, num, limit, isPublic) {
      this.loading = true
      this.num = this.num + this.limit
      Api.getLibCategory(cateId, subId, this.num, limit, isPublic, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          if (data.library) {
            for (var i = 0; i < data.library.length; i++) {
              this.items.push(data.library[i])
            }
          } else {
            this.$parent.$parent.$parent.$emit('globalError', '該分類已經沒有更多資料')
          }
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
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  #library {
    text-align: center;
    background-color: $black;
    border-radius: 6px;
    margin: 1em 0;
    .materials-container {
      position: relative;
    }
    .materials-wrapper {
      height: 18em;
      background-color: lighten($darkestgray, 5%);
      padding: 1em;
      margin-bottom: 2em;
      border-radius: 6px;
      overflow: hidden;
      .materials-list {
        margin-right: .5em;
        @extend .clr;
        .material {
          cursor: pointer;
          transition: .3s all ease;
          @include gallery(6 of 12 2);
          margin-bottom: 1em;
          box-shadow: 0 3px 3px rgba($pureblack, .33);
          position: relative;
          img {
            width: 100%; 
          }
          &:hover {
            box-shadow: 2px 3px 3px $pureblack;
            .overlay {
              opacity: 1; 
            }
          }
          .type {
            pointer-events: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            color: $white;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .overlay {
            opacity: 0;
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: darken($blue, 10%);
            border-radius: 50%;
            width: 30px;
            height: 30px;
            margin: auto;
            box-shadow: 0 1px 3px $pureblack;
            transition: .3s all ease;
            .fa {
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
</style>
