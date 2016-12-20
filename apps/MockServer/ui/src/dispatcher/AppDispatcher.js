const Dispatcher = require('flux').Dispatcher;
import assign from 'object-assign';

const AppDispatcher = assign(new Dispatcher(), {

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

export default AppDispatcher;
