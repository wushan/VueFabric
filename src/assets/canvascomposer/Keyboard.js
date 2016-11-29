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
    Mousetrap.bind(['command+d', 'ctrl+d'], function (e) {
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
    Mousetrap.bind(['command+backspace', 'ctrl+backspace'], function (e) {
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
  }
}
