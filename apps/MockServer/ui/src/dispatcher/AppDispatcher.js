var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

let AppDispatcher = assign(new Dispatcher(), {

  ActionSources: {
    VIEW_ACTION: {}
  },

  handleViewAction(action) {
    let payload = {
      source: AppDispatcher.ActionSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
