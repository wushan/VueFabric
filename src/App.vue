<template lang="pug">
  #canvaseditor
    main
      toolbar
      artboard
      attributes
    contextmenu
    programlist
</template>

<script>
import Artboard from './components/Artboard'
import Toolbar from './components/Toolbar'
import Attributes from './components/Attributes'
import Contextmenu from './components/Contextmenu'
import Programlist from './components/Programlist'
export default {
  name: 'CanvasEditor',
  components: {
    Artboard,
    Toolbar,
    Attributes,
    Contextmenu,
    Programlist
  }
}
</script>

<style lang="scss">
@import "./node_modules/font-awesome/scss/font-awesome";
@import "./bower_components/susy/sass/susy";
@import "./bower_components/breakpoint-sass/stylesheets/breakpoint";
@import "./bower_components/normalize-css/normalize";
@import "./assets/scss/var";
@import "./assets/scss/helpers";
@import "./assets/scss/forms";
// Basic Style
a {
  color: $white;
  text-decoration: none;
}
// Layouts
#canvaseditor {
  height: 100vh; 
  background-color: $black;
  color: $white;
  main {
    height: 100%; 
    display: flex; 
    #toolbar {
      box-sizing: border-box;
      padding: 1em;
      flex: initial;
      width: 90px;
  // min-width: 60px;
    }
    #artboard {
      flex: 1;
      background-color: $black;
      box-shadow: inset 0px 0px 12px $pureblack;
    }
    #attributes {
      box-sizing: border-box;
      padding: 1em;
      flex: none;
      width: 260px;
    }
  }
}
</style>
