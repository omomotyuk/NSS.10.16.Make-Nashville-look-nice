import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, CardText, CardTitle, Button } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import APIManager from '../../modules/APIManager'

class GeneralCard extends Component {

    handleEdit = () => {

    }

    handleDelete = (id) => {
        APIManager.delete(this.props.Elements, id)
            .then(() => this.props.getData(this.props.Elements))
    }

    render() {
        return (
            <Card>
                <CardBody>

                    <CardTitle> {/*{this.props.element.fileName}*/}</CardTitle>
                    <CardHeader size="sm">Photo # <Button close /></CardHeader>
                    {/*<CardText>{this.props.element.fileName} is good</CardText>*/}
                    <img className="test-photo" src={require("../../images/test-photo.jpg")} alt="test photo" />
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