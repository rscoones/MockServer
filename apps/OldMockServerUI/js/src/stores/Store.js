var BaseStore = require('./BaseStore');
var assign = require('object-assign');
var AppDispatcher = require('AppDispatcher');
var Constants = require('MockServerUI/constants/Constants');

let _data = [];

let _selected = null;

let Store = assign({}, BaseStore, {
  get() {
    return _data;
  },

  getSelected() {
    return  _selected;
  },

  // register store with dispatcher
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    let {urls, selected} = action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_URLS:
        _data = urls;
        Store.emitChange();
        break;
      case Constants.ActionTypes.SELECT:
        _selected = selected
        Store.emitChange();
        break;
    }
  })
});

module.exports = Store;
