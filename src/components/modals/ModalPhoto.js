/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

import "./ModalPhoto.css"

const ModalPhoto = (props) => {
  const {
    //buttonLabel,
    //className,
    element,
    photo,
    user,
    date
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleWithdraw = (id) => {
    element.status = "closed"
    console.log("handleWithdraw - status:", element.status)

  }

  const handleComplain = () => { }

  const handleCommentFieldChange = () => { }


  return (
    <div>
      <Button color="danger" onClick={toggle}>Show it big!</Button>
      <Modal isOpen={modal} toggle={toggle} className="modal-photo-card">
        <ModalHeader toggle={toggle}><span className="modal-photo-username">{user.userName} </span>
          <span className="modal-photo-date">{date} </span>
          <span className="modal-photo-status">{element.status} </span></ModalHeader>
        <ModalBody>
          {
            (element.status === "active") ? (
              <img className="modal-photo" src={require("../../photos/" + photo.fileName)} alt="test" />
            ) : ("")
          }

        </ModalBody>

        <Form>
          <FormGroup>
            <Label htmlFor="email">Comments: </Label>
            <Input onChange={handleCommentFieldChange}
              className="modal-photo-comment"
              type="text"
              id=""
              placeholder="No comment"
              required="" autoFocus="" />
          </FormGroup>
        </Form>

        <ModalFooter>

          {/* */}
          {
            (user.id === photo.userId) ? (
              <Button color="primary" onClick={() => handleWithdraw(element.id)}>Withdraw</Button>
            ) : (
                <Button color="danger" onClick={() => handleComplain()}>Complain</Button>
              )
          }
          {/* */}
          <Button color="primary" onClick={toggle}>Remove</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPhoto;
