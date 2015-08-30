var React = require('react');
var ActionCreator = require('MockServerUI/actions/ActionCreator');

var Table = React.createClass({

  handleClick(url, e) {
    ActionCreator.select(url);
  },

  render: function() {
    let {urls} = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Available URLs</th>
          </tr>
        </thead>
        <tbody id="list">
          {urls.map(url =>
            <tr key={url.url}>
              <td>
                <a href="#" onClick={this.handleClick.bind(this, url)}>{url.url}</a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

});

module.exports = Table;
