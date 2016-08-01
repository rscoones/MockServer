const xhr = require('xhr');
const qs = require('qs');
const AppDispatcher = require('AppDispatcher');
const Constants = require('MockServerUI/constants/Constants');

module.exports = {
  load() {
    const options = {
      method: "GET",
      uri: "api"
    };

    xhr(options, (err, resp, body) => {
      const data = JSON.parse(resp.body);
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.ADD_URLS,
        urls: data.urls,
        verbs: data.verbs
      });
    });
  },

  select(url) {
    if (url) {
      let query = qs.stringify({url: url.url});
      const options = {
        method: "GET",
        uri: "api?" + query
      };

      xhr(options, (err, resp, body) => {
        const data = JSON.parse(resp.body);
        _setSelected(data, url);
      });
    } else {
      _setSelected(null, null);
    }
  },
  save(selected, obj, method) {
    console.log(selected, obj);
    const data = {
      url: selected.url.url,
      method: method,
      data: JSON.stringify(obj)
    };

    const options = {
      method: "POST",
      uri: "api",
      json: data
    };

    xhr(options, (err, resp, body) => {
      this.load();
    });
  }
};


function _setSelected(files, url) {
  let selected = null;
  if (files && url) {
    selected = {url: url, files: files};
  }

  AppDispatcher.handleViewAction({
    type: Constants.ActionTypes.SELECT,
    selected: selected
  });
}
