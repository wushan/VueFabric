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
          select(v-model="selectedSubCategory", @change="subChanged")
            option(v-for="sub in subCategory", :value="sub") {{ sub.name }} / {{ sub.cateId }}
    transition(name="fade", mode="out-in")
      .materials-wrapper
        transition-group.materials-list(name="list-complete", tag="div")
          .material(v-for="item in items", :key="item.LId", @click="insertMedia(item.thumbnail)")
            img(:src="baseUrl + item.thumbnail")
            .type(v-if="item.video_image")
              .fa.fa-play-circle.fa-lg
    loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")

</template>

<script>
import Api from '../assets/canvascomposer/Api'
import Loader from './Loader'
import Events from '../assets/cc.objectEvents'
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
      if (currentObject.type !== 'slider') {
        return
      }
      url = this.baseUrl + url
      var instance = this.$parent.$parent.$parent

      fabric.Image.fromURL(url, function (img) {
        img.scaleToWidth(currentObject.width)
        // Make a Pattern
        var patternSourceCanvas = new fabric.StaticCanvas()
        patternSourceCanvas.add(img)
        console.log('ImageCurrentWidth:' + img.getWidth())
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
        console.log('offsetX:' + pattern.offsetX)
        console.log('offsetY:' + pattern.offsetY)
        // console.log('ImageCurrentWidth:' + img.getWidth()) // 縮小後 (*scale)
        // console.log('ImageOriginalWidth:' + img.width) // 原尺寸
        // console.log('patterSourceWidth:' + patternSourceCanvas.getWidth())
        // console.log('patterSourceHeight:' + patternSourceCanvas.getHeight())
        // console.log('patterWidth:' + pattern.width)
        // console.log('patterHeight:' + pattern.height)
        // console.log('SourceEl:' + patternSourceCanvas.getElement())
        // console.log(patternSourceCanvas.getElement())
        // console.log(pattern.toObject())
        // Mask (can be any shape ex: Polygon, Circles....)
        var mask = currentObject.clone()
        canvas.remove(currentObject)
        // First Slide
        var slideObj = {
          width: img.getWidth(),
          height: img.getHeight(),
          patternWidth: patternSourceCanvas.getWidth(),
          patternHeight: patternSourceCanvas.getHeight(),
          offsetX: pattern.offsetX,
          offsetY: pattern.offsetY
        }
        if (!mask.slides) {
          mask.slides = []
        }
        var slidesArray = mask.slides
        slidesArray.push(slideObj)
        // Attributes
        mask.toObject = (function (toObject) {
          return function () {
            return fabric.util.object.extend(toObject.call(this), {
              visibleslide: slideObj,
              interaction: this.interaction,
              slides: slidesArray
            })
          }
        })(mask.toObject)
        mask.set('fill', pattern)
        mask.on('object:dblclick', function (options) {
          // Pass pattern out
          enterEditMode(mask, img)
        })
        console.log(mask)
        Events.bindEvents(instance, mask)
        canvas.add(mask)
        canvas.setActiveObject(mask)
      })

      function enterEditMode (mask, image) {
        image.left = mask.left
        image.top = mask.top
        // if (mask.type === 'circle') {
        //   image.scaleToWidth(mask.width * mask.scaleX)
        // }
        image.scaleToWidth(mask.width * mask.scaleX)
        // image.scaleToWidth(image.getWidth() * mask.scaleX)
        // console.log('GETNEW', mask.scaleX)
        // console.log('GETNEW', image.getWidth())
        image.set('opacity', 0.8)
        // New Image
        // Fake Crop Area (fixed)
        // var rect = new fabric.Rect({
        //   width: mask.width * mask.scaleX,
        //   height: mask.height * mask.scaleY,
        //   left: mask.left,
        //   top: mask.top,
        //   fill: 'rgba(0,0,0,0.25)',
        //   selectable: false,
        //   stroke: 'rgb(125,125,125)',
        //   strokeDashArray: [2],
        //   strokeWidth: 2
        // })
        var newMask = mask.clone()
        // newMask.set('width', mask.width * mask.scaleX)
        // newMask.set('height', mask.height * mask.scaleY)
        newMask.set('fill', 'rgba(0,0,0,0.25)')
        newMask.set('selectable', false)
        newMask.set('stroke', 'rgb(125,125,125)')
        newMask.set('strokeDashArray', [2])
        newMask.set('strokeWidth', 2)
        canvas.remove(mask)
        canvas.add(image)
        canvas.add(newMask)
        canvas.setActiveObject(image)
        image.on('object:dblclick', function (options) {
          // Flatten
          flatten(newMask, image)
        })
        canvas.renderAll()
        // console.log(JSON.stringify(canvas));
      }
      function flatten (mask, image) {
        console.log('Flattened')
        // img.scaleToWidth(currentObject.width * 1.2)
        console.log(image.scaleX)
        // unbind
        image.off('object:dblclick')
        image.set('opacity', 1)
        // Transform Scaled Image Size back
        image.set('width', image.width * image.scaleX)
        image.set('height', image.height * image.scaleY)
        image.set('scaleX', 1)
        image.set('scaleY', 1)
        console.log(image.scaleX)
        // Make a Pattern
        var patternSourceCanvas = new fabric.StaticCanvas()
        patternSourceCanvas.add(image)
        console.log('ImageCurrentWidth:' + image.getWidth())
        var pattern = new fabric.Pattern({
          source: function () {
            patternSourceCanvas.setDimensions({
              width: image.getWidth() + 500,
              height: image.getHeight() + 500
            })
            return patternSourceCanvas.getElement()
          },
          repeat: 'no-repeat'
        })
        pattern.offsetX = image.left - mask.left - image.left
        pattern.offsetY = image.top - mask.top - image.top
        // console.log('imageLeft:' + image.left)
        // console.log('imageTop:' + image.top)
        // console.log('MaskLeft:' + mask.left)
        // console.log('MaskTop:' + mask.top)
        // console.log('offsetX:' + pattern.offsetX)
        // console.log('offsetY:' + pattern.offsetY)
        // console.log('ImageCurrentWidth:' + image.getWidth()) // 縮小後 (*scale)
        // console.log('ImageOriginalWidth:' + image.width) // 原尺寸
        // console.log('patterSourceWidth:' + patternSourceCanvas.width)
        // console.log('patterSourceHeight:' + patternSourceCanvas.height)
        // console.log('patterWidth:' + pattern.width)
        // console.log('patterHeight:' + pattern.height)
        // console.log('SourceEl:' + patternSourceCanvas.getElement())
        // console.log(patternSourceCanvas.getElement())
        // console.log(pattern.toObject())

        // var rect = new fabric.Rect({
        //   width: mask.width * mask.scaleX,
        //   height: mask.width * mask.scaleY,
        //   left: mask.left,
        //   top: mask.top,
        //   fill: pattern
        // })
        var newMask = mask.clone()
        // First Slide
        // var slideObj = {
        //   width: image.getWidth(),
        //   height: image.getHeight(),
        //   patternWidth: patternSourceCanvas.getWidth(),
        //   patternHeight: patternSourceCanvas.getHeight(),
        //   offsetX: pattern.offsetX,
        //   offsetY: pattern.offsetY
        // }
        if (newMask.type === 'slider') {
          newMask.set('fill', pattern)
          newMask.set('strokeWidth', 0)
          newMask.set('scaleX', 1)
          newMask.set('scaleY', 1)
          newMask.set('width', mask.width * mask.scaleX)
          newMask.set('height', mask.height * mask.scaleY)
          // Attributes
          console.log(pattern.offsetX)
          newMask.visibleslide.offsetX = pattern.offsetX
        }
        // Circle Shape Will Encounter the Scale Issue
        // Bind Double Click Event from fabric.ext
        // https://github.com/mazong1123/fabric.ext
        newMask.on('object:dblclick', function (options) {
          // Pass pattern out
          enterEditMode(newMask, image)
        })
        canvas.remove(mask)
        canvas.remove(image)
        Events.bindEvents(instance, newMask)
        canvas.add(newMask)
        canvas.setActiveObject(newMask)
        canvas.renderAll()
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
        }
      }
    }
  }
</style>
