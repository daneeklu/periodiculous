import ut from './util'

export default {
  fadeVisible: {
    init: function(e, val) {
      let v = ko.unwrap(val())
      if (!v) {
        e.classList.add('hidden', 'tHidden', 'transitioned')
      }
    },
    update: function(e, val) {
      let v = ko.unwrap(val())
      if (!v ) {
        //Only add the transition listener if the element is not hidden
        if (!e.classList.contains('hidden')) {
          e.classList.add('tHidden', 'transitioned')
          ut.listenOnce(e, 'transitionend', function() {
            e.classList.add('hidden')
          })
        }
      } else {
        e.classList.remove('hidden')
        e.offsetHeight //flush graphical update
        //Wait by turning on opacity until after hidden is removed
        e.classList.remove('tHidden')
      }
    }
  },
  fadeLeftRight: {
    init: function(e, val) {
      let v = ko.unwrap(val())
      if (!v) {
        e.classList.add('hidden', 'tLeft', 'transitioned')
      }
    },
    update: function(e, val) {
      let v = ko.unwrap(val())
      if (!v ) {
        //Only add the transition listener if the element is not hidden
        if (!e.classList.contains('hidden')) {
          e.classList.add('tRight', 'transitioned')
          ut.listenOnce(e, 'transitionend', function() {
            e.classList.remove('transitioned', 'tRight')
            e.classList.add('hidden', 'tLeft')
          })
        }
      } else {
        e.classList.add('tLeft')
        e.classList.remove('hidden', 'tRight')
        e.offsetHeight //flush graphical update
        //Wait by turning on opacity until after hidden is removed
        e.classList.remove('tLeft')
      }
    }
  }
}
