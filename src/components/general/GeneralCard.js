import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, CardTitle, Button } from 'reactstrap';
//import {  CardText } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import APIManager from '../../modules/APIManager'
//import GImage from "./GImage"

class GeneralCard extends Component {

    state = {
        path: "../../photos/",
        photo: {
            fileName: "test-photo.jpg"
        }
    }

    handleEdit = () => {

    }

    handleDelete = (id) => {
        APIManager.delete(this.props.Elements, id)
            .then(() => this.props.getData(this.props.Elements))
    }

    getPhoto = (issue) => {
        APIManager.get("photos", issue.reportPhoto).then((photo) => {
            console.log("GeneralCard.getPhoto - photo:", photo)
            this.setState(() => {
                return {
                    //photo: (this.state.path + photo.fileName)
                    photo: photo
                }
            })
        })
    }

    componentDidMount() {
        //console.log("GeneralCard didMount - element:", this.props.element)
        this.getPhoto(this.props.element)
    }


    render() {
        return (
            <Card>
                <CardBody>

                    <CardTitle> {/*{this.props.element.fileName}*/}</CardTitle>
                    <CardHeader size="sm">Photo # <Button close /></CardHeader>
                    {/*<CardText>{this.props.element.fileName} is good</CardText>*/}
                    <img className="test-photo" src={require("../../photos/" + this.state.photo.fileName)} alt="test" />
                    {/* <Button color="primary" >Details</Button> */}
                </CardBody>
                <CardFooter>
                    <Button className="btn btn-danger float-right" size="sm" onClick={() => this.handleDelete(this.props.element.id)}>Delete</Button>
                    <Button className="btn btn-danger float-right" size="sm" onClick={() => this.handleEdit()}>Edit</Button>

                </CardFooter>
            </Card>
        )
    }
}

export default GeneralCard