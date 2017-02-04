import React from 'react';
import Store from 'MockServerUI/stores/Store';
import ListItem from './ListItem.jsx';

const Table = (props) => {
  const {routes} = props;
  const {verbs} = Store.get();

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Available URLs</th>
          {verbs.map((verb) =>
            <th key={verb}>{verb}</th>
          )}
        </tr>
      </thead>
      <tbody id="list">
        {routes.map((url) =>
          <ListItem key={url.url} url={url} />
        )}
      </tbody>
    </table>
  );
};

module.exports = Table;
