import ko from 'knockout'

console.log('Main js file loaded!')
console.log('Knockout loaded: ', ko.version)

function AppViewModel() {
  this.greeting = ko.observable('Hello world!')
}

ko.applyBindings(new AppViewModel())

