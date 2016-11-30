<template lang="pug">
  #shapepanel.floating-menu
    .shapepanel-wrapper
      h3 Shapes
      .shapepanel-inner
        .row
          a.shape(@click="addRect")
            .fa.fa-square-o
              span 矩形
          a.shape(@click="addCircle")
            .fa.fa-circle-thin
              span 圓形
          a.shape(@click="addTriangle") &#9651;
              span 三角形
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    addRect () {
      this.$root.$children[0].$emit('updateSubmenu', null)
      this.$parent.$emit('addMedia')
    },
    addCircle () {
      this.$root.$children[0].$emit('updateSubmenu', null)
      this.$parent.$emit('addCircle')
    },
    addTriangle () {
      this.$root.$children[0].$emit('updateSubmenu', null)
      this.$parent.$emit('addTriangle')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../../assets/scss/var";
#shapepanel {
  .shape {
    display: block;
    @include gallery(6 of 12 1);
    padding: .5em 0;
    margin-bottom: .3em;
    background-color: darken($darkblue, 5%);
    color: rgba($white, .33);
    transition: .3 all ease;
    font-size: 2em;
    cursor: pointer;
    &:hover {
      color: $white;
    }
    span { 
      display: block;
      font-size: 12px;
      margin: .5em 0;
    }
  }
}
</style>
