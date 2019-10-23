import React, { Component } from "react"
//import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Input, Card, CardBody, Row, Col } from 'reactstrap'
//import { Label } from 'reactstrap'
//import ImageUploader from 'react-images-upload';

//
var EXIF = require("../../../node_modules/exif-js/exif.js");


class Upload extends Component {

    // Set initial state
    state = {
        pictures: [],
        selectedFile: null
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //
    handleUpload = (e) => {
        e.preventDefault()
        //
        this.props.history.push("/");
    }

    //
    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })

        EXIF.getData(event.target.files[0], function () {
            var allMetaData = EXIF.getAllTags(this);
            console.log("metaData:", allMetaData)
        });
    }

    //
    uploadHandler = (e) => {
        e.preventDefault()
        //console.log("uploadHandler: selectedFile", this.state.selectedFile)
    }


    render() {
        return (
            <div className="spooky-background">
                <Row className="my-5">
                    <Col md={{ size: 4, offset: 4 }}>
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.uploadHandler}>
                                    <FormGroup>
                                        <h3>Upload issue photo</h3>
                                    </FormGroup>
                                    <FormGroup>
                                        {/*<Label htmlFor="email">new photo</Label>
                                        <Input onChange={this.handleFieldChange} type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required="" autoFocus="" />*/}
                                        <Input data-name="upload-element"
                                            accept=".jpg,.jpeg,.tiff"
                                            title="Click here to upload document"
                                            className="_74090ebd-upload-uploadContainer"
                                            id="uploadedPhoto"
                                            type="file"
                                            onChange={this.fileChangedHandler} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="submit">Upload</Button>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Upload
