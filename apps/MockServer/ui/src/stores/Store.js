import BaseStore from './BaseStore';
import assign from 'object-assign';
import AppDispatcher from 'AppDispatcher';
import Constants from 'MockServerUI/constants/Constants';

let _data = [];
let _verbs = [];
let _selected = null;

const Store = assign({}, BaseStore, {
  get() {
    return {
      routes: _data,
      selected: _selected,
      verbs: _verbs
    }
  },

  // register store with dispatcher
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    const {routes, verbs, selected} = action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_URLS:
        _data = routes;
        _verbs = verbs;
        return Store.emitChange();
      case Constants.ActionTypes.SELECT:
        _selected = selected
        return Store.emitChange();
    }
  })
});

module.exports = Store;
