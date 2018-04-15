import React from 'react';
import Store from 'MockServerUI/stores/Store';
import ListItem from './ListItem.jsx';

const Table = (props) => {
  const {routes, service} = props;
  const {verbs} = Store.get();

  const show = (url) => {
    return url.url.includes(service.pathname)
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Mock</th>
          <th>Available URLs</th>
          {verbs.map((verb) =>
            <th key={verb}>{verb}</th>
          )}
        </tr>
      </thead>
      <tbody id="list">
        {routes.map((url) =>
          show(url) && <ListItem key={url.url} url={url} />
        )}
      </tbody>
    </table>
  );
};

export default Table;
