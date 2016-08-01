var React = require('react');
var Table = require('./Table.jsx');
var Edit = require('./Edit.jsx');
var Store = require('MockServerUI/stores/Store');
var ActionCreator = require('MockServerUI/actions/ActionCreator');

var App = React.createClass({
  getInitialState() {
    return this._getFromStore();
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
    ActionCreator.load();
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  render() {
    let {urls, selected} = this.state;

    return (
      <div className="container">
        {selected ?
          <Edit selected={selected} />
        :
          <Table urls={urls} />
        }
      </div>

    );
  }

});

module.exports = App;
