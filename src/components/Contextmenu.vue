<template lang="pug">
  #context-menu.context-menu
    ul.context-menu__items
      li.context-menu__item
        a.context-menu__link(href='#', data-action='layertop')
          i.fa.fa-angle-double-up
          |  移至頂層 ( &#8984;&nbsp;&#8593; )
      li.context-menu__item
        a.context-menu__link(href='#', data-action='layerup')
          i.fa.fa-angle-up
          |  上移一層 ( &#8984;&nbsp;+ )
      li.context-menu__item
        a.context-menu__link(href='#', data-action='layerdown')
          i.fa.fa-angle-down
          |  下移一層 ( &#8984;&nbsp;- )
      li.context-menu__item
        a.context-menu__link(href='#', data-action='layerbottom')
          i.fa.fa-angle-double-down
          |  移至底層 ( &#8984;&nbsp;&#8595; )
      li.context-menu__item
        a.context-menu__link(href='#', data-action='duplicate')
          i.fa.fa-times
          |  Duplicate ( &#8963;&nbsp;D )
      li.context-menu__item
        a.context-menu__link(href='#', data-action='lock')
          i.fa.fa-times
          |  鎖定/解鎖 ( &#8984;&nbsp;L )
      li.context-menu__item
        a.context-menu__link(href='#', data-action='delete')
          i.fa.fa-times
          |  刪除物件 ( &#8984;&nbsp;Delete )
</template>

<script>
export default {
  name: 'Contextmenu',
  components: {
  }
}
</script>

<style>
</style>
