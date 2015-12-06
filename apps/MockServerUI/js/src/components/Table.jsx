let React = require('react');
let ActionCreator = require('MockServerUI/actions/ActionCreator');

let Tooltip = require('react-bootstrap/lib/Tooltip');
let OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
let verbs = require('MockServerUI/helpers/verbs')

var Table = React.createClass({

  handleClick(url, e) {
    ActionCreator.select(url);
  },

  getFullURL(url) {
    let tooltip = url.fullURL.replace(url.url, "/");

    if (tooltip.length > 0) {
      return <Tooltip id={url.url}>{tooltip}</Tooltip>
    } else {
      return <div></div>
    }
  },

  render: function() {
    let {urls} = this.props;

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
          {urls.map(url =>
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
