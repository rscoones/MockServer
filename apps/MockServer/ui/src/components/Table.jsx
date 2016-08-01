const React = require('react');
const ActionCreator = require('MockServerUI/actions/ActionCreator');
const Store = require('MockServerUI/stores/Store');

const Tooltip = require('react-bootstrap/lib/Tooltip');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

const Table = React.createClass({

  handleClick(url, e) {
    ActionCreator.select(url);
  },

  getFullURL(url) {
    const tooltip = url.fullURL.replace(url.url, "/");

    if (tooltip.length > 0) {
      return <Tooltip id={url.url}>{tooltip}</Tooltip>
    } else {
      return <div></div>
    }
  },

  render() {
    const {urls} = this.props;
    const verbs = Store.getVerbs();

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
