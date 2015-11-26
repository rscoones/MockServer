var React = require('react');
var Table = require('./Table.jsx');
var Popup = require('./Popup.jsx');
var Store = require('MockServerUI/stores/Store');
var ActionCreator = require('MockServerUI/actions/ActionCreator');

var App = React.createClass({
  getInitialState: function() {
    let state = this._getFromStore();
    state.show = false;

    return state;
  },

  _getFromStore() {
    return {
      urls: Store.get(),
      selected: Store.getSelected()
    };
  },

  _onChange() {
    this.setState(this._getFromStore());
  },

  componentWillMount() {
    this.load();
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  load() {
    ActionCreator.load();
  },

  render: function() {
    let {urls, selected} = this.state;

    return (
      <div className="container">
        <Table onClick={this.showPopup} urls={urls} />
        <Popup selected={selected} />
      </div>

    );
  }

});

module.exports = App;
