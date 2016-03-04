import ko from 'knockout'
import AppViewModel from './appviewmodel'
import bh from './bindinghandlers'

ko.bindingHandlers.fadeVisible = bh.fadeVisible
ko.bindingHandlers.fadeLeftRight = bh.fadeLeftRight
ko.applyBindings(new AppViewModel())
