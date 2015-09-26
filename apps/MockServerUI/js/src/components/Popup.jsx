var React = require('react');
var Modal = require('react-bootstrap/lib/Modal');
var Button = require('react-bootstrap/lib/Button');
var Input = require('react-bootstrap/lib/Input');
var Col = require('react-bootstrap/lib/Col');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var Panel = require('react-bootstrap/lib/Panel');
var ActionCreator = require('MockServerUI/actions/ActionCreator');

var Popup = React.createClass({
  getInitialState: function() {
    return {
      current: {},
      method: "GET"
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let {selected} = nextProps;
    if (selected && selected.url && selected.url) {
      let method = "GET";
      if (!selected.url.GET) {
        method = "POST";
      }
      this.setState({method: method});
      this.setCurrent(selected.url[method]);
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
    let {method} = this.state;

    let selected = files[method][value];

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

  handleMethod(method) {
    this.setState({method: method});
    let {selected} = this.props;
    this.setCurrent(selected.url[method]);
  },

  save() {
    let {selected} = this.props;
    let {current, method} = this.state;
    current.headers = JSON.parse(current.headers);
    current.body = JSON.parse(current.body);
    ActionCreator.save(selected, current, method);
    this.close();
  },

  render: function() {
    let {selected} = this.props;
    let {current, method} = this.state;

    let show = false;
    if (selected) {
      show = true;
    }

    if (selected) {
      return (
        <Modal show={show} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{selected.url.url}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form role="form">
              <Col md={12}>
                <div className="form-group">
                  <label>Method:</label>
                  <Nav bsStyle='pills' activeKey={method} onSelect={this.handleMethod}>
                    {selected.url.GET ? <NavItem eventKey="GET">GET</NavItem> : null}
                    {selected.url.POST ? <NavItem eventKey="POST">POST</NavItem> : null}
                  </Nav>
                </div>
              </Col>
              <Col md={12}>
                <Input type="select" label="Preset:" onChange={this.handlePreset}>
                  <option>Select...</option>
                  {selected.files[method].map((file, i) =>
                    <option key={file.filename} value={i}>{file.filename}</option>
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
                <Input type='textarea' label='Body:' rows={6} value={current.body} onChange={this.handleBody} />
              </Col>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} className="pull-left">Cancel</Button>
            <Button onClick={this.save} bsStyle='primary'>Save and Close</Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return null;
    }
  }

});

module.exports = Popup;
