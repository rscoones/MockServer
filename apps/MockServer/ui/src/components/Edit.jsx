import React from 'react';
import FormItem from './FormItem.jsx';
import {Button, Nav, NavItem, Col} from 'react-bootstrap';
import ActionCreator from 'MockServerUI/actions/ActionCreator';
import Store from 'MockServerUI/stores/Store';

const Edit = React.createClass({
  getInitialState() {
    return {
      mock: {},
      method: "GET"
    };
  },

  componentWillMount() {
    const {route} = this.props;

    if (route && route.url) {
      const {verbs} = Store.get();
      const method = verbs[0];

      this.setState({method});
      this.setMock(route.url[method]);
    }
  },

  setMock(data) {
    const mock = {
      headers: JSON.stringify(data.headers, null, 2),
      status: data.status,
      type: data.type,
      body: JSON.stringify(data.body, null, 2)
    };

    this.setState({mock});
  },

  handlePreset(e) {
    const {value} = e.target;
    const {files} = this.props.route;
    const {method} = this.state;

    const route = files[method][value];

    this.setMock(route.data);
  },

  handleHeaders(e) {
    const {value} = e.target;
    const {mock} = this.state;
    mock.headers = value;

    this.setState({mock});
  },

  handleType(e) {
    const {value} = e.target;
    const {mock} = this.state;
    mock.type = value;

    this.setState({mock});
  },

  handleStatus(e) {
    const {value} = e.target;
    const {mock} = this.state;
    mock.status = value;

    this.setState({mock});
  },

  handleBody(e) {
    const {value} = e.target;
    const {mock} = this.state;
    mock.body = value;

    this.setState({mock});
  },

  handleMethod(method) {
    this.setState({method: method});
    const {route} = this.props;

    this.setMock(route.url[method]);
  },

  saveAndClose() {
    this.save();
    this.close();
  },

  save() {
    const {route} = this.props;
    const {mock, method} = this.state;
    mock.headers = JSON.parse(mock.headers);
    mock.body = JSON.parse(mock.body);
    ActionCreator.save(route, mock, method);
  },

  close() {
    this.setState({mock: {}});
    ActionCreator.select(null);
  },

  render() {
    const {route} = this.props;
    const {mock, method} = this.state;
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
          <Col md={12}>
            <FormItem type="textarea" label="Headers:" value={mock.headers} onChange={this.handleHeaders} />
          </Col>
          <Col md={6}>
            <FormItem type="text" label="File type:" value={mock.type} onChange={this.handleType} />
          </Col>
          <Col md={6}>
            <FormItem type="text" label="Status:" value={mock.status} onChange={this.handleStatus} />
          </Col>
          <Col md={12}>
            <FormItem type="textarea" label="Body:" rows={6} value={mock.body} onChange={this.handleBody} />
          </Col>
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
