var BaseStore = require('./BaseStore');
var assign = require('object-assign');
var AppDispatcher = require('AppDispatcher');
var Constants = require('MockServerUI/constants/Constants');

let _data = [];
let _verbs = [];

let _selected = null;

let Store = assign({}, BaseStore, {
  get() {
    return _data;
  },

  getVerbs() {
    return _verbs;
  },

  getSelected() {
    return  _selected;
  },

  // register store with dispatcher
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    let {urls, verbs, selected} = action;

    switch(action.type) {
      case Constants.ActionTypes.ADD_URLS:
        _data = urls;
        _verbs = verbs;
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
