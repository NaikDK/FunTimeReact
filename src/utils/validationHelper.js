import SimpleReactValidator from 'simple-react-validator';
import { useState } from 'react';

const Validationhandler = (customMessage = {}, customValidator = {}) => {
  const [show, setShow] = useState(false);
  const validator = new SimpleReactValidator({
    messages: customMessage,
    validators: customValidator,
  });

  if (show) {
    validator.showMessages();
  }

  return [validator, setShow];
};

export default Validationhandler;