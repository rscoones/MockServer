import React from 'react';
import {FormControl, FormGroup, ControlLabel} from 'react-bootstrap';

/*
  Dev notes:
  Seriously react-bootstrap, wtf is this bullshit. Why am I having to wrap your
  components to get functionality you should be handling. If I want an input
  field, I want a label. Accessibility standards require a label, if you
  don't want it visible, YOU HIDE IT.

  Massive step backwards for no reason.
*/

const FormItem = (props) => {
  const {label, type} = props;

  const getItem = () => {
    switch (type) {
      case 'text':
        return <FormControl {...props} />
      case 'textarea':
        return <FormControl componentClass="textarea" {...props} />
      case 'select':
        return <FormControl componentClass="select" {...props} />
      default:
        return <noscript />
    }
  };

  const getControlId = () => {
    switch (type) {
      case 'textarea':
        return 'formControlsTextarea';
      case 'select':
        return 'formControlsSelect';
      default:
        return type;
    }
  };

  return (
    <FormGroup controlId={getControlId()}>
      <ControlLabel>{label}</ControlLabel>
      {getItem()}
    </FormGroup>
  );
};

export default FormItem;
