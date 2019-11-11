import React, { Component } from 'react';
//import { Card, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroupText, Badge } from 'reactstrap';
import { Card, CardBody, CardHeader, Input, InputGroup, InputGroupAddon, InputGroupText, CardImg } from 'reactstrap';
//import {  CardText CardTitle, InputGroup, Row, Col, } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import APIManager from '../../modules/APIManager'
import ModalPhoto from "../modals/ModalPhoto"
import ModalPhotoI from "../modals/ModalPhotoI"

//import GImage from "./GImage"

class GeneralCard extends Component {

    state = {
        path: "../../photos/",
        photo: {
            fileName: "photo.jpg"
        },
        userId: JSON.parse(localStorage.getItem("credentials"))[0].id,
        //username: JSON.parse(localStorage.getItem("credentials"))[0].username
        user: {
            username: ""
        },
        date: ""
    }

    //
    getPhoto = (issue) => {
        APIManager.get("photos", issue.reportPhoto).then((photo) => {
            //console.log("GeneralCard.getPhoto - photo:", photo)
            this.setState(() => {
                return {
                    //photo: (this.state.path + photo.fileName)
                    photo: photo,
                    date: photo.takenDate.substring(0, 10)
                }
            })
        }).then(() => {
            APIManager.get("users", issue.userId).then((user) => {
                //console.log("GeneralCard.getPhoto - user:", user)
                this.setState(() => {
                    return {
                        user: user
                    }
                })
            })
        })
    }

    //
    handleWithdraw = (id) => {
        console.log("handleWithdraw - id:", id)

        let issue = this.props.element

        issue.status = "withdrawn"

        APIManager.update(issue, "issues").then(() => { })
    }

    handleComplain = () => {
    }

    handleDelete = (id) => {
        APIManager.delete(this.props.Elements, id)
            .then(() => this.props.getData(this.props.Elements))
    }

    handleCommentFieldChange() {
    }

    handleCheckBox = () => {
        //console.log("handleCheckBox - on, id:", this.props.element.id)
        this.props.onCheck(this.props.element.id)
        //this.props.history.push("/")
    }

    componentDidMount() {
        //console.log("GeneralCard.didMount - element:", this.props.element)
        //console.log("GeneralCard.didMount - this.state.userId:", this.state.userId)
        this.getPhoto(this.props.element)
    }
    //<CardTitle> {/*{this.props.element.fileName}*/}</CardTitle>

    showBigPhoto = () => {
        return (
            <>
                <ModalPhotoI element={this.element} photo={this.state.photo} user={this.state.user} date={this.state.date} {...this.props} />
            </>
        )
    }

    imgClick = () => {
        alert("Make it big!")
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <CardHeader size="sm">
                        <InputGroup>
                            <InputGroupAddon addonType="append">
                                <ModalPhoto element={this.element} photo={this.state.photo} user={this.state.user} date={this.state.date} {...this.props} />

                                <InputGroupText>
                                    <Input addon type="checkbox" aria-label="Checkbox for following text input" onClick={this.handleCheckBox} />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <span className="generalCardPhotoUser">{this.state.user.userName} id# {this.state.user.id} </span>
                        <span className="generalCardIssueDate">{this.state.date} </span>
                        <span className="generalCardIssueStatus">{this.props.element.status} </span><br />
                    </CardHeader>

                    {/*<Button close />
                        <br />
                        <InputGroup>*/}
                    {/*<Badge color="danger"></Badge>
                                                <Row>
                            </Row>

                         <Row>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                              <Input placeholder="Check it out" />*/}
                    {/*</InputGroup>
                        <br />*/}
                    {/*<CardText>{this.props.element.fileName} is good</CardText>*/}
                    <CardImg className="test-photo" src={require("../../photos/" + this.state.photo.fileName)} alt="test"
                        onClick={this.showBigPhoto}
                    />
                    {/*                         

                                            onClick={(<ModalPhoto element={this.element} photo={this.state.photo} user={this.state.user} date={this.state.date} {...this.props} />)}

                                            onClick={(event) => (
                            <>
                                (event !== null) ? (
                                    <>
                                    <ModalPhoto element={this.element} photo={this.state.photo} user={this.state.user} date={this.state.date} {...this.props} />
                                </>
                                ) : (null)
                            </>
                        )}

                    onClick={this.showBigPhoto()}

                            onClick={() => <ModalPhoto element={this.element} photo={this.state.photo} user={this.state.user} date={this.state.date} {...this.props} />}
                    */}
                    {/* onClick={this.showBigPhoto} />
                         <Button color="primary" >Details</Button> */}
                </CardBody>
                {/*<CardFooter>
                    <>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="email">Comments: </Label>
                                <Input onChange={this.handleCommentFieldChange} type="text"
                                    id=""
                                    placeholder="No comment"
                                    required="" autoFocus="" />
                            </FormGroup>

                        </Form>
                    </>
                    {
                        (this.state.userId === this.state.photo.userId) ? (
                            <>
                                <Button className="btn btn-danger float-right" size="sm" onClick={() => this.handleWithdraw(this.props.element.id)}>Withdraw</Button>
                            </>
                        ) : (<>
                            <Button className="btn btn-danger float-right" size="sm" onClick={() => this.handleComplain()}>Complain</Button>
                        </>)
                    }

                </CardFooter>*/}
            </Card >
        )
    }
}

export default GeneralCard