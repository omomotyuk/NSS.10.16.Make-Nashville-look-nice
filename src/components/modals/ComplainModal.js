/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
//import { Card, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge } from 'reactstrap';
//import APIManager from "../../modules/APIManager"
import ReactDOM from 'react-dom';
//import ComplainList from "./ComplainList"

const ComplainModal = (props) => {
  const {
    //buttonLabel,
    className,
    users,
    complains,
    newLevel
  } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  //const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [unmountOnClose] = useState(true);
  const [modalissue] = useState({})

  const [missue, setIssue] = useState({});
  const [ulevel, setLevel] = useState('');
  const [cradio, setRadio] = useState('')

  // local variables
  let currentUser = []
  let userLevel = 2
  let levelNumber = [0, 1, 2, 3]
  let crntIssue = {}
  let checkedR = ""

  //
  const toggle = () => setModal(!modal);

  const toggleNested = (issue) => {
    setIssue(issue)
    setLevel(getUser(issue.userId)[0].level)
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  /*const changeUnmountOnClose = e => {
    let value = e.target.value;
    setUnmountOnClose(JSON.parse(value));
  }*/

  const showUser = () => {
    //let returnedStorage = localStorage.getItem('credentials') !== null
    let credentials = localStorage.getItem("credentials")

    if (credentials !== null) {
      currentUser = JSON.parse(credentials)[0]
      return ("Usename: " + currentUser.userName)
    } else {
      return ("")
    }
  }

  //
  const complainLine = (issue) => {
    return (
      <>
        <span style="color:blue">{issue.userId}</span>
        <span>{issue.complain}</span>
        <br />
      </>
    )
  }

  //
  const renderList = () => {
    let list = ""
    complains.forEach(issue => {
      list = list.concat(complainLine(issue))
      //console.log("renderList - list:", list)
    })
    return (list)
  }

  //
  const handleRadioInput = (event) => {
    console.log("handleRadioInput - event.target:", event.target);
    let value = event.target.value
    console.log("handleRadioInput - value:", value);
    setRadio(value)
    console.log("handleRadioInput - checked:", cradio);
    checkedR = value
    console.log("handleRadioInput - checkedR:", checkedR);

  }

  //
  const handleRadioValue = (event) => {
    //console.log("handleRadioValue - event.target:", event.target);
    //console.log("handleRadioValue - checked:", event.target.value);
    console.log("handleRadioValue - missue.userId:", missue.userId);
    console.log("handleRadioValue - checkedR:", cradio);

    newLevel(missue.userId, parseInt(cradio))

    //
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }

  //
  const getChecked = (level, number) => {
    let value = false
    if (number === level) {
      value = true
    }
    return value
  }

  const getUserName = (id) => {
    //console.log("getUserName - users, id:", users, id)
    let user = users.filter(user => user.id === id)
    //console.log("getUserName - user, userName:", user, user[0].userName)

    return user[0].userName
  }


  const getUser = (id) => {
    let user = []
    user = users.filter(user => user.id === id)
    return user
  }

  const getUserLevel = (id) => {
    //console.log("getUserLevel - users, id:", users, id)
    let user = users.filter(user => user.id === id)
    //console.log("getUserLevel - user:", user[0])

    //console.log("getUserLevel - user, user.level:", user, user[0].level)

    //return user[0].level
    return 0
  }

  const userClick = (issue) => {
    //console.log("userClick - issue", issue)
    crntIssue = issue
    //console.log("userClick - crntIssue", crntIssue)
    if (crntIssue !== null) {
      toggleNested()
    }
  }


  //
  return (
    <div>

      {/*<Form inline onSubmit={(e) => e.preventDefault()}>
        <FormGroup>
          <Label for="unmountOnClose">UnmountOnClose value</Label>{' '}
          <Input type="select" name="unmountOnClose" id="unmountOnClose" onChange={changeUnmountOnClose}>
            <option value="true">true</option>
            <option value="false">false</option>
          </Input>
        </FormGroup>
        {' '}
        <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      </Form>*/}


      <Button color="danger" onClick={toggle}>Show complains</Button>

      <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>

        <ModalHeader toggle={toggle}>List of complains</ModalHeader>

        {/*<ComplainList complains={complains} />*/}

        <ModalBody>
          <>
            {/*{console.log("map - complains", complains)}*/}
            <div className="complain-list">
              {
                (complains.length !== 0) ? (complains.map((issue, index) => (
                  <>
                    {/*console.log("map - issue.id, index", issue.id, index)*/}

                    <div key={issue.id} className="issue-div">
                      <Container>
                        <Row>
                          <Col xs="auto">
                            <span style={{ color: "blue" }} onClick={() => toggleNested(issue)}>{getUserName(issue.userId)} </span>
                          </Col>
                          <Col xs="auto">
                            <span>{issue.complain} </span>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Container>




                      {/*<span>current access level {getUserLevel(issue.userId)}</span>*/}
                      {/*<span>current access level {ulevel}</span>*/}
                    </div>
                  </>
                ))) : (null)
              }
            </div>
          </>

          {/*<Button color="success" onClick={toggleNested}>Change Access Level</Button>*/}

          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            {/* <ModalHeader>Nested Modal title</ModalHeader>
            <ModalHeader toggle={toggle}>Complains show modal</ModalHeader> */}
            <ModalHeader toggle={toggle}>Complains show modal</ModalHeader>

            <ModalBody>
              <FormGroup tag="fieldset">
                <legend>Set user {showUser()} access level to: </legend>
                <>
                  {
                    (missue !== null) ? (levelNumber.map((number) => (
                      <>
                        {console.log("radio - missue:", missue)}
                        {/*{console.log("radio - ulevel:", ulevel)}*/}

                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" value={number} onClick={handleRadioInput} defaultChecked={getChecked(ulevel, number)} />{' '}
                            Access level {number}
                          </Label>
                        </FormGroup>
                      </>
                    ))) : (null)
                  }
                </>
                {/*
                <FormGroup check disabled>
                  <Label check>
                    <Input type="radio" name="radio1" value="4" />{' '}
                    Access level 4
                  </Label>
                </FormGroup>
                */}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {/*<Button color="primary" onClick={toggleNested}>Set level</Button>{''}*/}
              <Button color="primary" onClick={handleRadioValue}>Set level</Button>{''}
              {/*<Button color="secondary" onClick={toggleAll}>Cancel</Button> */}
              <Button color="secondary" onClick={toggleAll}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default ComplainModal;
