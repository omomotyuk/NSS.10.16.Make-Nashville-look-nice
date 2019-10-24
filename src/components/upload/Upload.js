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

            console.log("DateTime:", allMetaData.DateTime)
            console.log("GPSLatitude:", allMetaData.GPSLatitude)
            console.log("GPSLatitudeRef:", allMetaData.GPSLatitudeRef)
            console.log("GPSLongitude:", allMetaData.GPSLongitude)
            console.log("GPSLongitudeRef:", allMetaData.GPSLongitudeRef)
            /*
                "photos": [
        {
            "id": 1,
            "fileName": "photo-191018-0950-01.jpg",
            "takenDate": "2019-10-18T09:50:00.000Z",
            "uploadDate": "2019-10-18T09:51:00.000Z",
            "latitude": "36.116753 N",
            "longitude": "86.719244 W",
            "comment": "No comment",
            "userId": 1
        },

            */
            /*
            EXIF stores GPS coords as rational64u which is a list of six unsigned whole numbers in the following order:
            [
               degreesNumerator, degreesDenominator,
               minutesNumerator, minutesDenominator,
               secondsNumerator, secondsDenominator
            ]
            The format is consistent, and it looks like the tool you are using has already divided each pair into decimal numbers, so what you have is:
            Lat: 55°   40.711' 0"
            Lng:  8°  30.2282' 0"
            If you want to convert to a single decimal number:
            = Degrees + Minutes/60 + Seconds/3600
            */
            /*
            GPSLatitude: (3) [Number, Number, Number]
            GPSLatitudeRef: "N"
            GPSLongitude: (3) [Number, Number, Number]
            GPSLongitudeRef: "W"
            */
            //var allMetaDataSpan = document.getElementById("allMetaDataSpan");
            //            allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");

            //var allMetaDataSpanJson = JSON.stringify(allMetaData, null, "\t");
            //console.log("Upload.handleUpload: allMetaDataSpanJson:", allMetaDataSpanJson)
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
