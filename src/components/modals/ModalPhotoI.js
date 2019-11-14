/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon, Card, CardImg } from 'reactstrap';
import APIManager from '../../modules/APIManager';
import "./ModalPhoto.css"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
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

  let comment = ""
  let placeholder = "No comment yet."
  let username = JSON.parse(localStorage.getItem("credentials"))[0]

  //
  const toggle = () => setModal(!modal);

  //
  const Placeholder = () => {
    if (element.comment !== "") {
      placeholder = element.comment
    }
    return placeholder
  }

  //
  const handleWithdraw = (id) => {
    let record = element
    record.status = "closed"
    APIManager.updateRecord("issues", record.id, record)
  }

  //
  const handleComplain = (id) => {
    let record = element
    record.complain = comment
    APIManager.updateRecord("issues", record.id, record)
  }

  //
  const handleCommentSubmit = () => {
    let record = element
    record.comment = comment
    APIManager.updateRecord("issues", record.id, record)
  }

  //
  const handleFieldChange = (event) => {
    comment = event.target.value
  }

  //
  return (
    <div>
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
              (username.id === photo.userId) ? (
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
            (username.id === photo.userId) ? (
              <>
                <Button color="primary" onClick={() => handleWithdraw(element.id)}>Withdraw</Button>
              </>
            ) : (
                <>
                  <Button color="danger" onClick={() => handleComplain(element.id)}>Complain</Button>
                </>
              )
          }
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalPhoto;
