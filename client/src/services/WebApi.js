import ActionCreator from 'MockServerUI/actions/ActionCreator';
import xhr from 'xhr';
import qs from 'qs';

class WebApi {
  load() {
    const options = {
      method: 'GET',
      uri: 'api'
    };

    xhr(options, (err, resp) => {
      const data = JSON.parse(resp.body);
      ActionCreator.load(data);
    });
  }

  save(route, method, obj) {
    const data = {
      url: route.url.url,
      method: method,
      data: JSON.stringify(obj)
    };

    const options = {
      method: 'POST',
      uri: 'api',
      json: data
    };

    xhr(options, () => {
      this.load();
    });
  }

  savePreset(route, method, filename) {
    const data = {
      url: route.url.url,
      method: method,
      filename: filename
    };

    const options = {
      method: 'POST',
      uri: 'api',
      json: data
    };

    xhr(options, () => {
      this.load();
    });
  }

  select(url) {
    const query = qs.stringify({url: url.url});
    const options = {
      method: 'GET',
      uri: `api?${query}`
    };

    xhr(options, (err, resp) => {
      const data = JSON.parse(resp.body);
      ActionCreator.select(data, url);
    });
  }
}

export default new WebApi();
