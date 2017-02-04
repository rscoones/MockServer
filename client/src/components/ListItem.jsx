import React from 'react';
import WebApi from 'MockServerUI/services/WebApi';
import Store from 'MockServerUI/stores/Store';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

const Table = React.createClass({


  getFullURL(url) {
    const tooltip = url.fullURL.replace(url.url, '/');

    if (tooltip.length > 0) {
      return <Tooltip id={url.url}>{tooltip}</Tooltip>
    }

    return <div />
  },

  handleClick() {
    WebApi.select(this.props.url);
  },

  render() {
    const {url} = this.props;
    const {verbs} = Store.get();

    return (
      <tr>
        <td>
          <OverlayTrigger placement="top" overlay={this.getFullURL(url)}>
            <a href="#" onClick={this.handleClick}>{url.url}</a>
          </OverlayTrigger>
        </td>
        {verbs.map((verb) =>
          <td key={verb}>
            {url[verb] ? <span className="glyphicon glyphicon-ok" aria-hidden="true" /> : null}
          </td>
        )}
      </tr>
    );
  }
});

module.exports = Table;
