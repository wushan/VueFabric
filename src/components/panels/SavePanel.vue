<template lang="jade">
  #save-wrapper.floating-menu
    .save-wrapper-wrapper
      .save-wrapper-inner
        a.btn.edit.full(@click="save('program')") 儲存為節目
        a.btn.basic.full(@click="save('preset')") 儲存為版型
</template>

<script>
import Api from '../../assets/canvascomposer/Api'
import Utils from '../../assets/canvascomposer/Utils'
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  methods: {
    save (type) {
      var canvas = window['canvas']
      canvas.deactivateAll().renderAll()
      var png = canvas.toDataURL('png')
      var currentCanvas = JSON.stringify(canvas)
      var id = Utils.get_param('PID')
      var saveObj = {
        'PID': id,
        'image': png,
        'data': currentCanvas,
        'resolution': {
          'width': canvas.getWidth(),
          'height': canvas.getHeight()
        },
        'type': type
      }
      console.log(saveObj)
      this.update(saveObj)
    },
    update (obj) {
      this.$parent.$parent.$emit('globalLoad', true)
      Api.saveProgram(obj, (err, data) => {
        this.$parent.$parent.$emit('globalLoad', false)
        this.loading = false
        if (err) {
          this.error = err.toString()
          console.log(err)
        } else {
          console.log(data)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
