var React = require('react');
var ActionCreator = require('MockServerUI/actions/ActionCreator');

var Table = React.createClass({

  componentWillMount: function() {
    ActionCreator.getUrls();
  },

  render: function() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Available URLs</th>
          </tr>
        </thead>
        <tbody id="list">

        </tbody>
      </table>
    );
  }

});

module.exports = Table;
