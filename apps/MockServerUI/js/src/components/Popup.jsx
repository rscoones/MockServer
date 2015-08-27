var React = require('react');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Col = require('react-bootstrap/lib/Col');
var PropTypes = React.PropTypes;

var Popup = React.createClass({
  getInitialState: function() {
    return {
      show: true
    };
  },

  close() {
    this.setState({show: false});
  },

  open() {
    this.setState({show: true});
  },

  render: function() {
    let {show} = this.state;

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form role="form">
            <Col md={12}>
              <Input type="select" label="Preset:">
                <option value="0">Select..</option>
              </Input>
            </Col>
            <Col md={12}>
              <Input type='textarea' label='Headers:' value="" />
            </Col>
            <Col md={6}>
              <Input type="text" label="File type:"/>
            </Col>
            <Col md={6}>
              <Input type="text" label="Status:" />
            </Col>
            <Col md={12}>
              <Input type='textarea' label='Body:' value="" rows={6} />
            </Col>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

});

module.exports = Popup;
