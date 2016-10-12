<template lang="pug">
  #inboundlist
    .inboundlist-inner
      a.close-btn.js-close(href="javascript:;")
        i.fa.fa-times.fa-lg
      .widget-block
        .widget-title 節目列表
        .widget-content
          table.rowed.table-hover
            thead
              tr.centered
                th ID
                th 節目名稱
                th 選擇
            tbody
</template>

<script>
export default {
  name: 'Programlist',
  components: {
  }
}
</script>

<style>
</style>
