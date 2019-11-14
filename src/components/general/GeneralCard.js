import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Input, InputGroup, InputGroupAddon, InputGroupText, CardImg } from 'reactstrap';
import APIManager from '../../modules/APIManager'
import ModalPhoto from "../modals/ModalPhoto"
import ModalPhotoI from "../modals/ModalPhotoI"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class GeneralCard extends Component {

    state = {
        path: "../../photos/",
        photo: {
            fileName: "photo.jpg"
        },
        userId: JSON.parse(localStorage.getItem("credentials"))[0].id,
        user: {
            username: ""
        },
        date: ""
    }

    //
    getPhoto = (issue) => {
        APIManager.get("photos", issue.reportPhoto).then((photo) => {
            this.setState(() => {
                return {
                    photo: photo,
                    date: photo.takenDate.substring(0, 10)
                }
            })
        }).then(() => {
            APIManager.get("users", issue.userId).then((user) => {
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
        let issue = this.props.element
        issue.status = "withdrawn"
        APIManager.update(issue, "issues").then(() => { })
    }

    //
    handleComplain = () => {
    }

    //
    handleDelete = (id) => {
        APIManager.delete(this.props.Elements, id)
            .then(() => this.props.getData(this.props.Elements))
    }

    //
    handleCommentFieldChange() {
    }

    //
    handleCheckBox = () => {
        this.props.onCheck(this.props.element.id)
    }

    //
    componentDidMount() {
        this.getPhoto(this.props.element)
    }

    //
    showBigPhoto = () => {
        return (
            <>
                <ModalPhotoI
                    element={this.element}
                    photo={this.state.photo}
                    user={this.state.user}
                    date={this.state.date}
                    {...this.props} />
            </>
        )
    }

    //
    imgClick = () => {
        alert("Make it big!")
    }

    //
    render() {
        return (
            <Card>
                <CardBody>
                    <CardHeader size="sm">
                        <InputGroup>
                            <InputGroupAddon addonType="append">
                                <ModalPhoto
                                    element={this.element}
                                    photo={this.state.photo}
                                    user={this.state.user}
                                    date={this.state.date}
                                    {...this.props} />
                                <InputGroupText>
                                    <Input addon type="checkbox" aria-label="Checkbox for following text input"
                                        onClick={this.handleCheckBox} />
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        <span className="generalCardPhotoUser">{this.state.user.userName} id# {this.state.user.id} </span>
                        <span className="generalCardIssueDate">{this.state.date} </span>
                    </CardHeader>
                    <CardImg className="test-photo" src={require("../../photos/" + this.state.photo.fileName)} alt="test"
                        onClick={this.showBigPhoto} />
                </CardBody>
            </Card >
        )
    }
}

export default GeneralCard
