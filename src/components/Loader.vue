<template lang="jade">
  #loading(v-if="loading")
    img(src="../assets/images/loader-s.gif")
    p {{ loadingtext }}
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['loading', 'loadingtext']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
