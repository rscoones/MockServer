import assign from 'object-assign';

const Dispatcher = require('flux').Dispatcher;

const AppDispatcher = assign(new Dispatcher(), {

  ActionSources: {
    VIEW_ACTION: {}
  },

  handleViewAction(action) {
    const payload = {
      source: AppDispatcher.ActionSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  }

});

export default AppDispatcher;
