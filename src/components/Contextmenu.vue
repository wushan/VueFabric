<template lang="pug">
  #context-menu.context-menu(:style="'left:' + position[0] + 'px;top:' + position[1] + 'px;'")
    ul.context-menu__items
      li.context-menu__item
        a.context-menu__link(href='#', @click="layertop")
          i.fa.fa-angle-double-up
          |  移至頂層 ( &#8984;&nbsp;&#8593; )
      li.context-menu__item
        a.context-menu__link(href='#', @click="layerup")
          i.fa.fa-angle-up
          |  上移一層 ( &#8984;&nbsp;+ )
      li.context-menu__item
        a.context-menu__link(href='#', @click="layerdown")
          i.fa.fa-angle-down
          |  下移一層 ( &#8984;&nbsp;- )
      li.context-menu__item
        a.context-menu__link(href='#', @click="layerbottom")
          i.fa.fa-angle-double-down
          |  移至底層 ( &#8984;&nbsp;&#8595; )
      li.context-menu__item
        a.context-menu__link(href='#', @click="duplicate")
          i.fa.fa-times
          |  Duplicate ( &#8963;&nbsp;D )
      li.context-menu__item
        a.context-menu__link(href='#', @click="lock")
          i.fa.fa-times
          |  鎖定/解鎖 ( &#8984;&nbsp;L )
      li.context-menu__item
        a.context-menu__link(href='#', @click="deleteobj")
          i.fa.fa-times
          |  刪除物件 ( &#8984;&nbsp;Delete )
</template>

<script>
import Utils from '../assets/canvascomposer/Utils'
export default {
  name: 'Contextmenu',
  components: {
  },
  props: ['position'],
  data () {
    return {
    }
  },
  methods: {
    layertop () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      obj.bringToFront()
      canvas.renderAll()
      this.$parent.$emit('updateHistory')
      this.closeContextMenu()
    },
    layerup () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      obj.bringForward()
      canvas.renderAll()
      this.$parent.$emit('updateHistory')
      this.closeContextMenu()
    },
    layerdown () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      obj.sendBackwards()
      canvas.renderAll()
      this.$parent.$emit('updateHistory')
      this.closeContextMenu()
    },
    layerbottom () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      obj.sendToBack()
      canvas.renderAll()
      this.$parent.$emit('updateHistory')
      this.closeContextMenu()
    },
    duplicate () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      var newObject = obj.clone()
      // Move New Object
      newObject.left = newObject.left + 10
      newObject.top = newObject.top + 10
      canvas.add(newObject)
      canvas.setActiveObject(newObject)
      canvas.renderAll()
      this.$parent.$emit('updateHistory')
      this.closeContextMenu()
    },
    lock () {
      var canvas = window['canvas']
      var obj = canvas.getActiveObject()
      if (obj.lockMovementY === true) {
        obj.lockMovementY = false
        obj.lockMovementX = false
        obj.lockRotation = false
        obj.lockScalingX = false
        obj.lockScalingY = false
        obj.stroke = ''
        obj.strokeWidth = 0
        canvas.renderAll()
      } else {
        obj.lockMovementY = true
        obj.lockMovementX = true
        obj.lockRotation = true
        obj.lockScalingX = true
        obj.lockScalingY = true
        obj.stroke = '#ff0000'
        obj.strokeWidth = 4
        canvas.renderAll()
      }
      this.$parent.$emit('updateHistory')
      this.closeContextMenu()
    },
    deleteobj () {
      this.closeContextMenu()
      this.$swal({
        title: '確定刪除？',
        text: '刪除後可使用 Ctrl + Z 組合鍵回復',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '確定刪除'
      }).then(() => {
        Utils.removeObject(() => {
          this.$parent.$emit('updateHistory')
        })
        this.$swal(
          '已刪除',
          '所選項目已刪除',
          'success'
        )
      })
    },
    closeContextMenu () {
      this.$parent.$emit('closeContextMenu')
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/var";
@import "../assets/scss/helpers";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
#context-menu {
  position: fixed;
  top: 0;
  left: 0;
}
.context-menu {
  background-color: #b9b9b9;
  border-radius: 6px;
  box-shadow: 3px 3px 9px rgba($black, 1);
  box-sizing: border-box;
  padding: .3em 0;
  font-size: 14px;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    li {
      display: block;
      &:nth-last-child(2) {
        margin-bottom: .3em;
      }
      &:last-child {
        border-top: 1px solid darken($gray, 15%);
        a {
          padding-top: .5em;
        }
      }
    }
  }
  a {
    color: $black;
    display: block;
    padding: .3em .5em;
    i {
      margin: 0 .5em 0 0;
      visibility: hidden;
    }
    &:hover {
      background-color: darken($blue, 5%);
      color: $white;
      i {
        visibility: visible;
      }
    }
  }
}
</style>
