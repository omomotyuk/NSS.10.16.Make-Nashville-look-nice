/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
//import { Card, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge } from 'reactstrap';

const ComplainModal = (props) => {
  const {
    //buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);




  const showUser = () => {
    //let returnedStorage = localStorage.getItem('credentials') !== null
    let credentials = localStorage.getItem("credentials")

    if (credentials !== null) {
      let currentUser = JSON.parse(credentials)[0]
      return ("Usename: " + currentUser.userName)
    } else {
      return ("")
    }
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>Show complains</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Complains show modal</ModalHeader>
        <ModalBody>
          <FormGroup tag="fieldset">
            <legend>Set user {showUser()} aceess level to: </legend>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Access level 0
          </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Access level 1
          </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Access level 2
          </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Access level 3
          </Label>
            </FormGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Set level</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ComplainModal;
