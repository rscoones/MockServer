import AppDispatcher from 'AppDispatcher';
import Constants from 'MockServerUI/constants/Constants';

export default {
  load(data) {
    AppDispatcher.handleViewAction({
      type: Constants.ADD_URLS,
      routes: data.routes,
      verbs: data.verbs,
      services: data.services
    });
  },

  select(files, url) {
    let selected = null;
    if (files && url) {
      selected = {url: url, files: files};
    }

    AppDispatcher.handleViewAction({
      type: Constants.SELECT,
      selected: selected
    });
  },

  setValue(obj, key, value) {
    AppDispatcher.handleViewAction({
      type: Constants.SET_VALUE,
      obj: obj,
      key: key,
      value: value
    });
  }
};
