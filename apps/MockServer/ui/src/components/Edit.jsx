const React = require('react');
const Button = require('react-bootstrap/lib/Button');
const Input = require('react-bootstrap/lib/Input');
const Col = require('react-bootstrap/lib/Col');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const ActionCreator = require('MockServerUI/actions/ActionCreator');
const Store = require('MockServerUI/stores/Store');

const Edit = React.createClass({
  getInitialState() {
    return {
      current: {},
      method: "GET"
    };
  },

  componentWillMount() {
    const {selected} = this.props;

    if (selected && selected.url) {
      let method = null;
      const verbs = Store.getVerbs();

      for (let i = 0; i < verbs.length; i++) {
        const verb = verbs[i];
        if (selected.url[verb]) {
          method = verb;
          break;
        }
      }

      this.setState({method: method});
      this.setCurrent(selected.url[method]);
    }
  },

  setCurrent(data) {
    const current = {
      headers: JSON.stringify(data.headers, null, 2),
      status: data.status,
      type: data.type,
      body: JSON.stringify(data.body, null, 2)
    };

    this.setState({current: current});
  },

  handlePreset(e) {
    const {value} = e.target;
    const {files} = this.props.selected;
    const {method} = this.state;

    const selected = files[method][value];

    this.setCurrent(selected.data);
  },

  handleHeaders(e) {
    const {value} = e.target;
    const {current} = this.state;
    current.headers = value;

    this.setState({current: current});
  },

  handleType(e) {
    const {value} = e.target;
    const {current} = this.state;
    current.type = value;

    this.setState({current: current});
  },

  handleStatus(e) {
    const {value} = e.target;
    const {current} = this.state;
    current.status = value;

    this.setState({current: current});
  },

  handleBody(e) {
    const {value} = e.target;
    const {current} = this.state;
    current.body = value;

    this.setState({current: current});
  },

  handleMethod(method) {
    this.setState({method: method});
    const {selected} = this.props;

    this.setCurrent(selected.url[method]);
  },

  saveAndClose() {
    this.save();
    this.close();
  },

  save() {
    const {selected} = this.props;
    const {current, method} = this.state;
    current.headers = JSON.parse(current.headers);
    current.body = JSON.parse(current.body);
    ActionCreator.save(selected, current, method);
  },

  close() {
    this.setState({current: {}});
    ActionCreator.select(null);
  },

  render: function() {
    const {selected} = this.props;
    const {current, method} = this.state;
    const verbs = Store.getVerbs();

    return (
      <div>
        <h3>{selected.url.fullURL}</h3>
        <form role="form">
          <Col md={12}>
            <div className="form-group">
              <label>Method:</label>
              <Nav bsStyle='pills' activeKey={method} onSelect={this.handleMethod}>
                {verbs.map((verb, i) =>
                  selected.url[verb] ? <NavItem key={i} eventKey={verb}>{verb}</NavItem> : null
                )}
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

        <Button onClick={this.close} className="pull-left">Cancel</Button>
        <Button onClick={this.saveAndClose} bsStyle='primary'>Save and Close</Button>
      </div>
    );
  }

});

module.exports = Edit;
