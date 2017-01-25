import React from 'react';
import WebApi from 'MockServerUI/services/WebApi';
import Store from 'MockServerUI/stores/Store';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const Table = React.createClass({

  handleClick(url, e) {
    WebApi.select(url);
  },

  getFullURL(url) {
    const tooltip = url.fullURL.replace(url.url, "/");

    if (tooltip.length > 0) {
      return <Tooltip id={url.url}>{tooltip}</Tooltip>
    } else {
      return <div />
    }
  },

  render: function() {
    const {routes} = this.props;
    const {verbs} = Store.get();

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Available URLs</th>
            {verbs.map((verb, i) =>
              <th key={i}>{verb}</th>
            )}
          </tr>
        </thead>
        <tbody id="list">
          {routes.map(url =>
            <tr key={url.url}>
              <td>
                <OverlayTrigger placement="top" overlay={this.getFullURL(url)}>
                  <a href="#" onClick={this.handleClick.bind(this, url)}>{url.url}</a>
                </OverlayTrigger>
              </td>
              {verbs.map((verb, i) =>
                <td key={i}>
                  {url[verb] ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> : null}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

});

module.exports = Table;
