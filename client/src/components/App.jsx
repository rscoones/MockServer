import React from 'react';
import {Tabs, Tab, Panel} from 'react-bootstrap'
import List from './List.jsx';
import Edit from './Edit.jsx';
import ServiceDetails from "./ServiceDetails.jsx"
import Store from 'MockServerUI/stores/Store';
import WebApi from 'MockServerUI/services/WebApi';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
  }
  componentWillMount() {
    WebApi.load();
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({});
  }

  render() {
    const {routes, selected, services} = Store.get();

    return (
      <div className="container">
        {selected ?
          <Edit route={selected} />
        :
          <Tabs id="setr">
            {services.map((service, i) =>
              <Tab key={service.name} eventKey={i} title={service.name}>
                <Panel>
                  <ServiceDetails service={service} />
                  <List routes={routes} service={service} />
                </Panel>
              </Tab>
            )}
          </Tabs>
        }
      </div>
    );
  }
}
