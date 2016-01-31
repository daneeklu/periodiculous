import ko from 'knockout'
import ptable from './ptable'

console.log('Main js file loaded!')
console.log('Knockout loaded: ', ko.version)

function AppViewModel() {
  const self = this;
  let cont = document.getElementById('container')

  this.greeting = ko.observable('Click an element')
  this.atoms = ko.observableArray(ptable)
  this.atomList = ko.observableArray()

  this.atomClicked = function (atom) {
    self.atomList.push(atom)
  }

  this.nextQuestion = () => {

    let resetTransition = function() {
      cont.className = 'tLeft'; // remove tRight & transitioned
      cont.offsetHeight // flush changes
      cont.className = 'transitioned';
      cont.removeEventListener('transitionend', resetTransition)
    }
    container.classList.add('tRight')
    container.addEventListener('transitionend', resetTransition)
  }
  document.getElementById('container').classList.remove('tLeft');
}

ko.applyBindings(new AppViewModel())
