import React from 'react';
import {Button, Nav, NavItem, Col} from 'react-bootstrap';
// components
import FormItem from './FormItem.jsx';
import EditFields from './EditFields.jsx';
import EditWarning from './EditWarning.jsx';
// stores
import ActionCreator from 'MockServerUI/actions/ActionCreator';
import WebApi from 'MockServerUI/services/WebApi';
import Store from 'MockServerUI/stores/Store';

const Edit = React.createClass({
  getInitialState() {
    const {route} = this.props;
    const {verbs} = Store.get();
    const method = verbs[0];
    const mock = this.getMock(route.url[method]);

    return {
      mock: mock,
      method: method,
      showEdit: mock.mockServerType === "object",
      preset: null
    };
  },

  getMock(data) {
    return {
      headers: JSON.stringify(data.headers, null, 2),
      status: data.status,
      type: data.type,
      mockServerType: data.mockServerType,
      body: JSON.stringify(data.body, null, 2)
    };
  },

  saveAndClose() {
    this.save();
    this.close();
  },

  save() {
    const {route} = this.props;
    const {mock, method, preset} = this.state;
    if (preset) {
      WebApi.savePreset(route, method, preset);
    } else {
      mock.headers = JSON.parse(mock.headers);
      mock.body = JSON.parse(mock.body);
      WebApi.save(route, method, mock);
    }
  },

  close() {
    this.setState({mock: {}});
    ActionCreator.select(null);
  },

  handlePreset(e) {
    const {value} = e.target;
    const {files} = this.props.route;
    const {method} = this.state;
    const route = files[method][value];

    const mock = this.getMock(route.data);
    const showEdit = mock.mockServerType == "object";
    const preset = route.filename
    this.setState({mock, showEdit, preset});
  },

  handleEditAnyway() {
    this.setState({showEdit: true, preset: null});
  },

  handleMethod(method) {
    const {route} = this.props;
    const mock = this.getMock(route.url[method]);

    this.setState({method, mock});
  },

  render() {
    const {route} = this.props;
    const {mock, method, showEdit} = this.state;
    const {verbs} = Store.get();

    return (
      <div>
        <form role="form">
          <Col md={12}>
            <h3>{route.url.fullURL}</h3>
          </Col>
          <Col md={12}>
            <div className="form-group">
              <label>Method:</label>
              <Nav bsStyle="pills" activeKey={method} onSelect={this.handleMethod}>
                {verbs.map((verb, i) =>
                  route.url[verb] ? <NavItem key={i} eventKey={verb}>{verb}</NavItem> : null
                )}
              </Nav>
            </div>
          </Col>
          <Col md={12}>
            <FormItem type="select" label="Preset:" onChange={this.handlePreset}>
              <option value="-1">Select...</option>
              {route.files[method].map((file, i) =>
                <option key={file.filename} value={i}>{file.filename}</option>
              )}
            </FormItem>
          </Col>
          {showEdit ?
            <EditFields mock={mock} />
          :
            <EditWarning mock={mock} onClick={this.handleEditAnyway}/>
          }
          <Col md={12}>
            <Button onClick={this.close} className="pull-left" style={{marginRight: 11}}>Cancel</Button>
            <Button onClick={this.saveAndClose} bsStyle="primary" className="pull-right">Save and Close</Button>
          </Col>
        </form>

      </div>
    );
  }

});

module.exports = Edit;
