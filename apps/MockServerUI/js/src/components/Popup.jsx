var React = require('react');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Col = require('react-bootstrap/lib/Col');
var ActionCreator = require('MockServerUI/actions/ActionCreator');

var Popup = React.createClass({
  getInitialState: function() {
    return {
      current: {}
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let {selected} = nextProps;
    if (selected && selected.url && selected.url.data) {
      this.setCurrent(selected.url.data);
    }
  },

  setCurrent(data) {
    let current = {};
    current.headers = JSON.stringify(data.headers, null, 2);
    current.status = data.status;
    current.type = data.type;
    current.body = JSON.stringify(data.body, null, 2);

    this.setState({current: current});
  },

  handlePreset(e) {
    let {value} = e.target;
    let {files} = this.props.selected;

    let selected = files[value];

    this.setCurrent(selected.data);
  },

  close() {
    this.setState({current: {}});
    ActionCreator.select(null);
  },

  handleHeaders(e) {
    let {value} = e.target;
    let {current} = this.state;
    current.headers = value;
    this.setState({current: current});
  },

  handleType(e) {
    let {value} = e.target;
    let {current} = this.state;
    current.type = value;
    this.setState({current: current});
  },

  handleStatus(e) {
    let {value} = e.target;
    let {current} = this.state;
    current.status = value;
    this.setState({current: current});
  },

  handleBody(e) {
    let {value} = e.target;
    let {current} = this.state;
    current.body = value;
    this.setState({current: current});
  },

  save() {
    let {selected} = this.props;
    let {current} = this.state;
    current.headers = JSON.parse(current.headers);
    current.body = JSON.parse(current.body);
    ActionCreator.save(selected, current);
    this.close();
  },

  render: function() {
    let {selected} = this.props;
    let {current} = this.state;
    let show = false;
    if (selected) {
      show = true;
    }

    let files = [];
    if (selected && selected.files) {
      files = selected.files;
    }

    return (
      <Modal show={show} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form role="form">
            <Col md={12}>
              <Input type="select" label="Preset:" onChange={this.handlePreset}>
                <option>Select...</option>
                {files.map((file, i) =>
                  <option key={i} value={i}>{file.filename}</option>
                )}
              </Input>
            </Col>
            <Col md={12}>
              <Input type='textarea' label='Headers:' value={current.headers} onChange={this.handleHeaders} />
            </Col>
            <Col md={6}>
              <Input type="text" label="File type:" value={current.type} onChange={this.handleType} />
            </Col>
            <Col md={6}>
              <Input type="text" label="Status:" value={current.status} onChange={this.handleStatus} />
            </Col>
            <Col md={12}>
              <Input type='textarea' label='Body:' value="" rows={6} value={current.body} onChange={this.handleBody} />
            </Col>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Cancel</Button>
          <Button onClick={this.save}>Save and Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

});

module.exports = Popup;
