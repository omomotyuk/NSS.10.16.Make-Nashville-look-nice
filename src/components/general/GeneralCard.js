import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import APIManager from '../../modules/APIManager'

class GeneralCard extends Component {

    handleDelete = (id) => {
        APIManager.delete(this.props.Elements, id)
            .then(() => this.props.getData(this.props.Elements))
    }

    render() {
        return (
            <Card body>
                <CardTitle>{this.props.element.name}</CardTitle>
                <CardText>{this.props.element.name} is good</CardText>
                <Button color="primary" >Details</Button>
                <Button color="danger" onClick={() => this.handleDelete(this.props.element.id)}>Delete</Button>
            </Card>
        )
    }
}

export default GeneralCard