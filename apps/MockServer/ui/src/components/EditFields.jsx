import React from 'react';
import FormItem from './FormItem.jsx';
import {Button, Nav, NavItem, Col} from 'react-bootstrap';
import ActionCreator from 'MockServerUI/actions/ActionCreator';

const EditFields = React.createClass({

  handleHeaders(e) {
    const {value} = e.target;
    const {mock} = this.props;
    ActionCreator.setValue(mock, "headers", value);
  },

  handleType(e) {
    const {value} = e.target;
    const {mock} = this.props;
    ActionCreator.setValue(mock, "type", value);
  },

  handleStatus(e) {
    const {value} = e.target;
    const {mock} = this.props;
    ActionCreator.setValue(mock, "status", value);
  },

  handleBody(e) {
    const {value} = e.target;
    const {mock} = this.props;
    ActionCreator.setValue(mock, "body", value);
  },

  render() {
    const {mock} = this.props;

    return (
      <div>
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
      </div>
    );
  }

});

module.exports = EditFields;
