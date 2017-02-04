import React from 'react';
import List from './List.jsx';
import Edit from './Edit.jsx';
import Store from 'MockServerUI/stores/Store';
import WebApi from 'MockServerUI/services/WebApi';

const App = React.createClass({

  componentWillMount() {
    WebApi.load();
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({});
  },

  render() {
    const {routes, selected} = Store.get();

    return (
      <div className="container">
        {selected ?
          <Edit route={selected} />
        :
          <List routes={routes} />
        }
      </div>
    );
  }
});

module.exports = App;
