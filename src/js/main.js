import ko from 'knockout'
import ptable from './ptable'

console.log('Main js file loaded!')
console.log('Knockout loaded: ', ko.version)

function AppViewModel() {
  const self = this;

  this.greeting = ko.observable('Click an element')
  this.atoms = ko.observableArray(ptable)
  this.atomList = ko.observableArray()

  this.atomClicked = function (atom) {
    self.atomList.push(atom)
  }
}

ko.applyBindings(new AppViewModel())
