/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
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

  //
  const toggleNested = (issue) => {
    setIssue(issue)
    setLevel(getUser(issue.userId)[0].level)
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }

  //
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  //
  const showUser = () => {
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
    })
    return (list)
  }

  //
  const handleRadioInput = (event) => {
    let value = event.target.value
    setRadio(value)
    checkedR = value
  }

  //
  const handleRadioValue = (event) => {
    newLevel(missue.userId, parseInt(cradio))
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

  //
  const getUserName = (id) => {
    let user = users.filter(user => user.id === id)
    return user[0].userName
  }

  //
  const getUser = (id) => {
    let user = []
    user = users.filter(user => user.id === id)
    return user
  }

  //
  const getUserLevel = (id) => {
    let user = users.filter(user => user.id === id)
    return 0
  }

  //
  const userClick = (issue) => {
    crntIssue = issue
    if (crntIssue !== null) {
      toggleNested()
    }
  }

  //
  return (
    <div>
      <Button color="danger" onClick={toggle}>Show complains</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
        <ModalHeader toggle={toggle}>List of complains</ModalHeader>
        <ModalBody>
          <>
            <div className="complain-list">
              {
                (complains.length !== 0) ? (complains.map((issue, index) => (
                  <>
                    <div key={issue.id} className="issue-div">
                      <Container>
                        <Row>
                          <Col xs="auto">
                            <span style={{ color: "blue" }}
                              onClick={() => toggleNested(issue)}>{getUserName(issue.userId)} </span>
                          </Col>
                          <Col xs="auto">
                            <span>{issue.complain} </span>
                          </Col>
                          <Col></Col>
                        </Row>
                      </Container>
                    </div>
                  </>
                ))) : (null)
              }
            </div>
          </>
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader toggle={toggle}>Complains</ModalHeader>
            <ModalBody>
              <FormGroup tag="fieldset">
                <>
                  <legend>Set user access level to: </legend>
                  {
                    (missue !== null) ? (levelNumber.map((number) => (
                      <>
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" value={number}
                              onClick={handleRadioInput} defaultChecked={getChecked(ulevel, number)} />{' '}
                            Access level {number}
                          </Label>
                        </FormGroup>
                      </>
                    ))) : (null)
                  }
                </>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleRadioValue}>Set level</Button>{''}
              <Button color="secondary" onClick={toggleAll}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Done</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default ComplainModal;
