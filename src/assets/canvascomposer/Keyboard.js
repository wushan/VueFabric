import Mousetrap from '../vendor/mousetrap.js'
import Utils from './Utils'
// import Vue from 'vue'
export default {
  onBind () {
    console.log('Keyboard binded.')
    // Undo
    Mousetrap.bind(['command+z', 'ctrl+z'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      window.vue.$children[0].$emit('undo')
      console.log('Undo')
    })
    // Redo
    Mousetrap.bind(['command+shift+z', 'ctrl+shift+z'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      window.vue.$children[0].$emit('redo')
      console.log('Redo')
    })
    // Layers
    // Move Front
    Mousetrap.bind(['command+up', 'ctrl+up'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.layertop()
      console.log('Front')
    })
    // Move Bottom
    Mousetrap.bind(['command+down', 'ctrl+down'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.layerbottom()
      console.log('Bottom')
    })
    // Move Up
    Mousetrap.bind(['command+]', 'ctrl+]'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.layerup()
      console.log('Up')
    })
    // Move Bottom
    Mousetrap.bind(['command+[', 'ctrl+['], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.layerdown()
      console.log('Down')
    })
    // Duplicate
    Mousetrap.bind(['command+c', 'ctrl+c'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.duplicate()
      console.log('Duplicate')
    })
    // Lock
    Mousetrap.bind(['command+l', 'ctrl+l'], function (e) {
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.lock()
      console.log('Lock')
    })
    // Delete
    Mousetrap.bind(['command+backspace', 'ctrl+backspace', 'command+d', 'ctrl+d'], function (e) {
      console.log('del')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.removeObject()
      console.log('Delete')
    })
    // Push Left
    Mousetrap.bind(['left'], function (e) {
      console.log('Push left')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('left', 1)
    })
    Mousetrap.bind(['shift+left'], function (e) {
      console.log('Push Large left')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('left', 10)
    })
    // Push Left
    Mousetrap.bind(['right'], function (e) {
      console.log('Push right')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('right', 1)
    })
    Mousetrap.bind(['shift+right'], function (e) {
      console.log('Push Large right')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('right', 10)
    })
    // Push Up
    Mousetrap.bind(['up'], function (e) {
      console.log('Push up')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('up', 1)
    })
    Mousetrap.bind(['shift+up'], function (e) {
      console.log('Push Large up')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('up', 10)
    })
    // Push Down
    Mousetrap.bind(['down'], function (e) {
      console.log('Push down')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('down', 1)
    })
    Mousetrap.bind(['shift+down'], function (e) {
      console.log('Push Large down')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.pushObject('down', 10)
    })
    // Select All
    Mousetrap.bind(['command+a', 'ctrl+a'], function (e) {
      console.log('Select All')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.selectAll()
    })
    // Deselect All
    Mousetrap.bind(['esc'], function (e) {
      console.log('Deselect All')
      if (e.preventDefault) {
        e.preventDefault()
      } else {
        // internet explorer
        e.returnValue = false
      }
      Utils.deselectAll()
    })
  }
}
