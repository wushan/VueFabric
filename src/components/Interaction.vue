<template lang="pug">
  #interaction
    .interaction-wrapper
      h3 互動設定
      .interaction-inner
        .interaction-block
          span.tips 設定自動跳出秒數代表此節目播放時靜置 X 秒將會<span class="emphasis">自動跳至該時段排程中第一個節目(群組)</span>，如無需自動跳出，請將秒數設為 0 秒 ( 預設值 )
        .controlgroup
          label 秒數
          .controls
            input(type="number", placeholder="秒數", value="0")
        
        button.btn.edit.full(type="button") 儲存
        
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./node_modules/susy/sass/susy";
@import "./node_modules/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
// Transitions
#interaction {
  box-sizing: border-box;
  padding: 1em;
  flex: none;
  width: 310px;
  height: 100%;
  .interaction-block {
    border-top: 1px solid darken($darkgray, 10%);
    padding: 1em 1em 0 1em;
    margin: 1em 0;
  }
  .tips {
    line-height: 1.6;
    color: $darkgray;
    .emphasis {
      color: $white;
      border-bottom: 1px solid $white;
      margin: 0 2px;
    }
  }
}
#interaction {
  font-size: 13px;
  border-top: 2px solid $pureblack;
  &.fade-enter-active, &.fade-leave-active {
    transition: .2s all ease;
  }
}
</style>
