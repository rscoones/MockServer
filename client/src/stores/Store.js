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
  dispatcherIndex: AppDispatcher.register((payload) => {
    const action = payload.action;
    const {routes, verbs, selected, obj, key, value} = action;

    switch (action.type) {
      case Constants.ADD_URLS:
        _data = routes;
        _verbs = verbs;
        return Store.emitChange();
      case Constants.SELECT:
        _selected = selected
        return Store.emitChange();
      case Constants.SET_VALUE:
        obj[key] = value;
        return Store.emitChange();
    }
    return null;
  })
});

module.exports = Store;
