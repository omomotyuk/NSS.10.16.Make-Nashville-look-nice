/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon, Card, CardImg } from 'reactstrap';
//import { Card, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge } from 'reactstrap';
import APIManager from '../../modules/APIManager';
import "./ModalPhoto.css"
//import { addComment } from '@babel/types';

const ModalPhoto = (props) => {
  const {
    //buttonLabel,
    //className,
    element,
    photo,
    user,
    date,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let comment = ""
  let placeholder = "No comment yet."


  const Placeholder = () => {
    if (element.comment !== "") {
      placeholder = element.comment
    }
    return placeholder
  }

  const handleWithdraw = (id) => {
    console.log("handleWithdraw - issue id:", id)
    let record = element
    record.status = "closed"
    APIManager.updateRecord("issues", record.id, record)
  }

  const handleComplain = () => { }

  //const handleCommentFieldChange = () => { }

  const handleCommentSubmit = () => {
    //console.log("handleCommentSubmit - comment:", comment)
    let record = element
    record.comment = comment
    APIManager.updateRecord("issues", record.id, record)
  }

  const handleFieldChange = (event) => {
    comment = event.target.value
  }


  return (
    <div>
      <Button color="danger" onClick={toggle}>Show it big!</Button>
      <Modal isOpen={modal} toggle={toggle} className="modal-photo-card">
        <ModalHeader toggle={toggle}>
          <span className="modal-photo-username">{user.userName} </span>
          <span className="modal-photo-date">{date} </span>
          <span className="modal-photo-status">{element.status} </span>
        </ModalHeader>
        <ModalBody>
          <Card>
            {
              (element.status === "active") ? (
                <CardImg top width="100%" className="modal-photo" src={require("../../photos/" + photo.fileName)} alt="Card image cap" />
              ) : ("")
            }
          </Card>
        </ModalBody>
        <ModalFooter>
          <InputGroup>
            <Input placeholder={Placeholder()} onChange={handleFieldChange} id="comment" />
            {
              (user.id === photo.userId) ? (
                <>
                  <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={() => handleCommentSubmit()}>Submit</Button>
                  </InputGroupAddon>
                </>
              ) : (
                  <>
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" >Submit</Button>
                    </InputGroupAddon>
                  </>
                )
            }
          </InputGroup>
          {
            (user.id === photo.userId) ? (
              <Button color="primary" onClick={() => handleWithdraw(element.id)}>Withdraw</Button>
            ) : (
                <Button color="danger" onClick={() => handleComplain()}>Complain</Button>
              )
          }
          {/*<Button color="primary" onClick={toggle}>Remove</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>*/}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPhoto;
