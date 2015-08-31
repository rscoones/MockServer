var xhr = require('xhr');
var qs = require('qs');
var AppDispatcher = require('AppDispatcher');
var Constants = require('MockServerUI/constants/Constants');

module.exports = {
  load() {
    xhr({
      method: "GET",
      uri: "api/"
    }, function (err, resp, body) {
      let data = JSON.parse(resp.body);
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.ADD_URLS,
        urls: data.urls
      });
    });
  },
  select(url) {
    if (url) {
      let query = qs.stringify({url: url.url});
      xhr({
        method: "GET",
        uri: "api/?" + query
      }, function (err, resp, body) {
        let data = JSON.parse(resp.body);
        _setSelected(data, url);
      });
    } else {
      _setSelected(null, null);
    }
  },
  save(selected, obj, method) {
    console.log(selected, obj);
    var data = {url: selected.url.url, method: method, data: JSON.stringify(obj)};
    xhr({
      method: "POST",
      uri: "api/",
      json: data
    }, function (err, resp, body) {
      this.load();
    }.bind(this));
  }
};


function _setSelected(files, url) {
  var selected = null;
  if (files && url) {
    selected = {url: url, files: files};
  }
  AppDispatcher.handleViewAction({
    type: Constants.ActionTypes.SELECT,
    selected: selected
  });
}
