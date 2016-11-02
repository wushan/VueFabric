<template lang="pug">
  #arrangement
    .arrangement-wrapper
      h3 排程發佈
      .arrangement-inner
        .controlgroup
          label 設備
          .controls
            .select-wrapper
              select
                option 3391-7rfijas-dpfiasd
        .arrangement-block
          .controlgroup
            label 節目
            .controls
              span Current Program
          .controlgroup
            label 群組
            .controls
              span Current Group
        .arrangement-block
          .controlgroup
            label 連續
            .controls.check-group
              .check-item
                input#loop(type="checkbox")
                label(for="loop") 是，不斷重複
        button.btn.edit.full(type="button") 立即發佈
        span.tips 簡易發佈功能將<span class="emphasis">立即覆蓋</span>所選設備現有排程紀錄，並且連續重複播放本節目 ( 如本節目已屬於特定群組，將連續播放整個群組 )，如需指定播放時間、重複週期、次數、多重交替播放等，請儲存本節目後使用<span class="emphasis">進階排程</span>功能。
        .arrangement-advanced
          button.btn.delete.full(type="button") 進階排程
        //- .arrangement-block
        //-   h3 插播
        //-   .controlgroup
        //-     label 插播
        //-     .controls.check-group
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 是
        //-   h3 日期
        //-   .controlgroup
        //-     label 從
        //-     .controls
        //-       input(type="date")
        //-   .controlgroup
        //-     label 至
        //-     .controls
        //-       input(type="date")
        //-   h3 星期重複
        //-   .controlgroup
        //-     label 從
        //-     .controls.check-group
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 全選
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期一
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期二
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期三
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期四
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期五
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期六
        //-       .check-item
        //-         input(type="checkbox")
        //-         label 星期日
        //-   h3 時間
        //-   .controlgroup
        //-     label 從
        //-     .controls
        //-       input(type="time")
        //-   .controlgroup
        //-     label 至
        //-     .controls
        //-       input(type="time")
        //-   h3 間隔重複
        //-   .controlgroup
        //-     label 每隔
        //-     .controls
        //-       input(type="time")
        //-   .controlgroup
        //-     label 播放
        //-     .controls
        //-       input(type="time")
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
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "../assets/scss/var";
// Transitions
#arrangement {
  box-sizing: border-box;
  padding: 1em;
  flex: none;
  width: 310px;
  height: 100%;
  .arrangement-block {
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
#arrangement {
  font-size: 13px;
  border-top: 2px solid $pureblack;
  &.fade-enter-active, &.fade-leave-active {
    transition: .6s all ease;
  }
}
</style>
