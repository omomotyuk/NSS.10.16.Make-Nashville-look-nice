import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import {  CardText } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import APIManager from '../../modules/APIManager'
//import GImage from "./GImage"

class GeneralCard extends Component {

    state = {
        path: "../../photos/",
        photo: {
            fileName: "test-photo.jpg"
        },
        userId: JSON.parse(localStorage.getItem("credentials"))[0].id,
        //username: JSON.parse(localStorage.getItem("credentials"))[0].username
        user: {
            username: ""
        },
        date: ""
    }

    //
    handleWithdraw = (id) => {
        console.log("handleWithdraw - id:", id)

        let issue = this.props.element

        issue.status = "withdrawn"

        APIManager.update(issue, "issues").then(() => { })
    }

    //
    handleComplain = () => {
    }

    handleDelete = (id) => {
        APIManager.delete(this.props.Elements, id)
            .then(() => this.props.getData(this.props.Elements))
    }

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

    handleCommentFieldChange() {

    }

    componentDidMount() {
        //console.log("GeneralCard.didMount - element:", this.props.element)
        //console.log("GeneralCard.didMount - this.state.userId:", this.state.userId)
        this.getPhoto(this.props.element)
    }


    render() {
        return (
            <Card>
                <CardBody>

                    <CardTitle> {/*{this.props.element.fileName}*/}</CardTitle>
                    <CardHeader size="sm"><span className="generalCardPhotoUser">{this.state.user.userName}</span> on {this.state.date}<Button close /></CardHeader>
                    {/*<CardText>{this.props.element.fileName} is good</CardText>*/}
                    <img className="test-photo" src={require("../../photos/" + this.state.photo.fileName)} alt="test" />
                    {/* <Button color="primary" >Details</Button> */}
                </CardBody>
                <CardFooter>
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
                                {/*console.log("GeneralCard.render - photo.userId:", this.state.photo.userId)*/}
                                <Button className="btn btn-danger float-right" size="sm" onClick={() => this.handleWithdraw(this.props.element.id)}>Withdraw</Button>
                            </>
                        ) : (<>
                            <Button className="btn btn-danger float-right" size="sm" onClick={() => this.handleComplain()}>Complain</Button>
                        </>)
                    }

                </CardFooter>
            </Card>
        )
    }
}

export default GeneralCard