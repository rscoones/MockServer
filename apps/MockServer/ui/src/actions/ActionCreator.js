import xhr from 'xhr';
import qs from 'qs';
import AppDispatcher from 'AppDispatcher';
import Constants from 'MockServerUI/constants/Constants';

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
        routes: data.routes,
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

  save(route, obj, method) {
    console.log(route, obj);
    const data = {
      url: route.url.url,
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
