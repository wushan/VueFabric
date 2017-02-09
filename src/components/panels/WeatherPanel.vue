<template lang="pug">
  #weatherSettings.floating-menu
    .canvasconfig-wrapper
      h3 Select Place
      .canvasconfig-inner
        transition(name="fade", mode="out-in")
          loader(v-bind:loading="loading", v-bind:loadingtext="loadingtext")
        transition(name="fade", mode="out-in")
          .row(v-if="weathercategories")
            .controlgroup
              label 群組
              .controls.check-group
                .check-item
                  input#public(type="checkbox", v-model="isPublic")
                  label(for="public") 共用
                .check-item
                  input#user(type="checkbox", v-model="isUser")
                  label(for="user") 使用者
            .controlgroup
              label 分類：
              .controls
                .select-wrapper
                  select#weatherCate(v-model="selectedCategory", @change="changed")
                    option(v-for="category in computedCates", :value="category") {{ category.public==1 ? '[共用]-' : '[使用者]-' }}{{category.name}}
            .controlgroup
              label 城市：
              .controls
                .select-wrapper
                  select#weatherCity(v-model="selectedWeather")
                    option(v-for="weather in weatherpresets", :value="weather") {{ weather.name }}
            .call-action
              a.btn.basic.full(@click="addWeather") 置入
</template>

<script>
import Api from '../../assets/canvascomposer/Api'
import Weather from '../../assets/canvascomposer/Weather'
import Events from '../../assets/cc.objectEvents'
import Loader from '../Loader'
// UUID
import uuid from 'node-uuid'
export default {
  components: {
    Loader
  },
  data () {
    return {
      defaultCateId: '9999',
      selectedCategory: {},
      selectedWeather: {},
      weathercategories: null,
      weatherpresets: null,
      loading: false,
      loadingtext: '素材讀取中',
      isPublic: true,
      isUser: false
    }
  },
  created () {
    this.fetchData(this.defaultCateId, 1, true)
  },
  methods: {
    fetchData (cateId, isPublic, initial) {
      this.loading = true
      Api.getWeather(cateId, isPublic, (err, data) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          console.log(data)
          this.weathercategories = data.category
          this.weatherpresets = data.weather
          this.$nextTick(function () {
            if (initial) {
              this.selectedCategory = this.computedCates[0]
            }
            this.selectedWeather = this.weatherpresets[0]
          })
        }
      })
    },
    changed () {
      this.fetchData(this.selectedCategory.cateId, this.selectedCategory.public, null)
    },
    bindEvents (object) {
      Events.bindEvents(this.$parent.$parent, object)
      this.$parent.$parent.$emit('updateHistory')
    },
    addWeather () {
      var fabric = window['fabric']
      var canvas = window['canvas']
      var location = this.selectedWeather.city_code
      var locationText = this.selectedWeather.name
      var instance = this
      Weather.translate(location, function (err, res) {
        if (err) {
          console.log(err.response.statusCode)
          instance.$parent.$parent.$emit('globalError', err.response.statusCode + ':' + err.response.body.error.description)
        } else {
          var conditionText = res.conditionText
          var conditionImg = res.conditionImg
          var temp = res.temp
          var city = locationText
          // var country = res.country
          console.log(conditionText)
          fabric.Weatherimg.fromURL('static/assets/images/conditions/svg/' + conditionImg, function (oImg) {
            oImg.scaleToWidth(60)
            oImg.set({
              left: canvas.getWidth() / 2,
              top: canvas.getHeight() / 2,
              name: '天氣圖案',
              id: uuid.v4()
            })
            // 加入圖片
            canvas.add(oImg)
            // Bind
            instance.bindEvents(oImg)
            oImg.toObject = (function (toObject) {
              return function () {
                return fabric.util.object.extend(toObject.call(this), {
                  location: location,
                  interaction: this.interaction,
                  id: this.id
                })
              }
            })(oImg.toObject)
            // 加入天氣
            var fTemp = new fabric.Temperature(temp, {
              left: canvas.getWidth() / 2,
              top: canvas.getHeight() / 2,
              fontSize: '64',
              fontFamily: 'Times New Roman',
              fontWeight: 300,
              name: '天氣溫度',
              id: uuid.v4()
            })
            canvas.add(fTemp)
            // Bind
            instance.bindEvents(fTemp)
            fTemp.toObject = (function (toObject) {
              return function () {
                return fabric.util.object.extend(toObject.call(this), {
                  location: location,
                  interaction: this.interaction,
                  id: this.id
                })
              }
            })(fTemp.toObject)

            // 加入城市
            var fLocation = new fabric.Location(city, {
              left: canvas.getWidth() / 2,
              top: canvas.getHeight() / 2,
              fontSize: '18',
              fontFamily: 'Times New Roman',
              name: '天氣地點',
              id: uuid.v4()
            })
            canvas.add(fLocation)
            // Bind
            instance.bindEvents(fLocation)

            fLocation.toObject = (function (toObject) {
              return function () {
                return fabric.util.object.extend(toObject.call(this), {
                  location: location,
                  interaction: this.interaction,
                  id: this.id
                })
              }
            })(fLocation.toObject)
            canvas.renderAll()
            // Programmatically Select Newly Added Object
            canvas.setActiveObject(fTemp)
          })
        }
      })
      this.$root.$children[0].$emit('updateSubmenu', null)
    }
  },
  computed: {
    computedCates () {
      var combinedArray = []
      if (this.weathercategories) {
        if (this.isPublic && !this.isUser) {
          combinedArray = this.weathercategories.public
          return combinedArray
        } else if (!this.isPublic && this.isUser) {
          combinedArray = this.weathercategories.user
          return combinedArray
        } else if (this.isPublic && this.isUser) {
          combinedArray = this.weathercategories.public.concat(this.weathercategories.user)
          return combinedArray
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import "./bower_components/susy/sass/susy"
// @import "./bower_components/breakpoint-sass/stylesheets/breakpoint"

</style>
