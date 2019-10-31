import React, { Component } from "react"
//import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Input, Card, CardBody, Row, Col } from 'reactstrap'
//import { Label } from 'reactstrap'
//import ImageUploader from 'react-images-upload';
import APIManager from "../../modules/APIManager"
import ExifData from "./ExifData"
import GPStoDegree from "./GPStoDegree"


class Upload extends Component {

    // Set initial state
    state = {
        pictures: [],
        selectedFile: null,
        fileName: "",
        photoData: null
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
        //console.log("upload file name:", event.target.files[0].name)

        this.setState({
            selectedFile: event.target.files[0],
            fileName: event.target.files[0].name,
            photoData: ExifData.getExifData(event.target.files[0])
        })
    }

    //
    convertDateTime = (dateTime) => {
        let t = dateTime.replace(" ", ":").split(":")
        return new Date(t[0], t[1], t[2], t[3], t[4], t[5])
    }

    //
    uploadHandler = (e) => {
        e.preventDefault()

        var Convertor = new GPStoDegree(this.state.photoData)

        let location = Convertor.getData()

        let photo = {
            fileName: this.state.fileName,
            takenDate: this.convertDateTime(this.state.photoData.DateTime),
            uploadDate: new Date(),
            latitude: location.latitude,
            longitude: location.longitude,
            comment: "",
            userId: JSON.parse(localStorage.getItem("credentials"))[0].id
        }

        let issue = {
            reportPhoto: 1,
            closePhoto: 0,
            comment: "",
            status: "active",
            userId: JSON.parse(localStorage.getItem("credentials"))[0].id
        }

        APIManager.getAndFilter("photos", "fileName", photo.fileName)
            .then(photoList => {
                if (photoList.length) {
                    alert("Photos " + photo.fileName + " is already in database!");
                } else {
                    // putting new record to database
                    //if (this.verifyInput(query)) {
                    //const record = this.newRecord(query);
                    APIManager.putRecord("photos", photo).then(data => {
                        console.log("new photo record data:", data)
                        issue.reportPhoto = data.id
                        alert("New photo " + photo.fileName + " added. Thanks for report!");
                        return data
                    })
                        .then((photo) => {
                            APIManager.putRecord("issues", issue).then(data => {
                                console.log("new issue record data:", data)
                                this.setLocation(issue, photo)

                                alert("New issue created. Thanks for report!");

                                this.props.reload()
                            })
                        })
                    //} else {
                    //alert("Input data for registration is not valid. Try again!");
                    //}
                }
            })
    }


    setLocation = (issue, photo) => {
        let returnedStorage = localStorage.getItem('locations')
        let LSLocations = JSON.parse(returnedStorage)
        LSLocations = LSLocations.concat(this.newLocation(issue.id, photo.latitude, photo.longitude, photo.userId, photo.takenDate.substring(0, 10)))
        localStorage.setItem("locations", JSON.stringify(LSLocations));
    }

    //
    newLocation = (issue, latitude, longitude, user, date) => {
        const location = {
            issue: issue,
            latitude: latitude,
            longitude: longitude,
            username: user,
            date: date
        }
        return location
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
