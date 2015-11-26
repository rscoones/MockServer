var React = require('react');
var ActionCreator = require('MockServerUI/actions/ActionCreator');


var Tooltip = require('react-bootstrap/lib/Tooltip');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var Table = React.createClass({

  handleClick(url, e) {
    ActionCreator.select(url);
  },

  getFullURL(url) {
    let tooltip = url.fullURL.replace(url.url, "/");
    
    if (tooltip.length > 0) {
      return <Tooltip>{tooltip}</Tooltip>
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
            <th>GET</th>
            <th>POST</th>
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
              <td>
                {url.GET ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> : null}
              </td>
              <td>
                {url.POST ? <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> : null}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

});

module.exports = Table;
