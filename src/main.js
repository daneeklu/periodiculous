import ko from 'knockout'

console.log('Main js file loaded!')
console.log('Knockout loaded: ', ko.version)

function AppViewModel() {
  var self = this;
  this.greeting = ko.observable('Click an element')
  this.atoms = [{
    number: 1,
    name: 'Hydrogen',
    letter: 'H'
  },{
    number: 2,
    name: 'Helium',
    letter: 'He'
  }]
  this.atomClicked = function (atom) {
    self.greeting(atom.name)
  }
}

ko.applyBindings(new AppViewModel())
