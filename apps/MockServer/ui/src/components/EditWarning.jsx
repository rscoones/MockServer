const React = require('react');
import {Button, Col} from 'react-bootstrap';

const EditWarning = ({onClick, mock}) => {
  return (
    <Col md={12} style={{marginBottom: 40}}>
      <p>This mock is a {mock.mockServerType}. Editing it will make it become stateless and you may lose functionality.</p>
      <Button onClick={onClick}>Edit anyway</Button>
    </Col>
  );
};

module.exports = EditWarning;
