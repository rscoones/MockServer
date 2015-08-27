var React = require('react');
var Table = require('./Table.jsx');
var Popup = require('./Popup.jsx');

var App = React.createClass({
  getInitialState: function() {
    return {
      show: false
    };
  },
  
  showPopup() {
    this.refs.popup.open();
  },

  render: function() {
    return (
      <div>
        <Table onClick={this.showPopup} />
        <Popup ref="popup" />
      </div>

    );
  }

});

module.exports = App;
