import React from 'react';
import List from './List.jsx';
import Edit from './Edit.jsx';
import Store from 'MockServerUI/stores/Store';
import ActionCreator from 'MockServerUI/actions/ActionCreator';

const App = React.createClass({

  _onChange() {
    this.setState({});
  },

  componentWillMount() {
    ActionCreator.load();
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
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
