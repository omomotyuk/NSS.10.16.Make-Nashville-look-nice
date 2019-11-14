import React, { Component } from "react"
import { Button, Form, FormGroup, Input, Card, CardBody, Row, Col } from 'reactstrap'
import APIManager from "../../modules/APIManager"
import ExifData from "./ExifData"
import GPStoDegree from "./GPStoDegree"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class Upload extends Component {

    // Set initial state
    state = {
        pictures: [],
        selectedFile: null,
        filePath: "",
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
        this.props.history.push("/");
    }

    //
    fileChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            filePath: URL.createObjectURL(event.target.files[0]),
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
    uploadPhotoFile = (location) => {

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
                    APIManager.putRecord("photos", photo).then(data => {
                        issue.reportPhoto = data.id
                        alert("New photo " + photo.fileName + " added. Thanks for report!");
                        return data
                    })
                        .then((photo) => {
                            APIManager.putRecord("issues", issue).then(data => {
                                this.setLocation(issue, photo)
                                alert("New issue created. Thanks for report!");
                            })
                        })
                }
            })
    }

    //
    uploadHandler = (e) => {
        e.preventDefault()
        var Convertor = new GPStoDegree(this.state.photoData)
        let location = Convertor.getData()
        if (location.latitude.length !== 0 && location.longitude.length !== 0) {
            this.uploadPhotoFile(location)
        } else {
            alert("This photo doesn't contain location data!")
        }
    }

    //
    setLocation = (issue, photo) => {
        let returnedStorage = localStorage.getItem('locations')
        let LSLocations = JSON.parse(returnedStorage)
        LSLocations = LSLocations.concat(this.newLocation(
            issue.id,
            photo.latitude,
            photo.longitude,
            photo.userId,
            photo.takenDate.substring(0, 10)))
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

    //
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
                                        <Input data-name="upload-element"
                                            accept=".jpg,.jpeg,.tiff"
                                            title="Click here to upload document"
                                            className="_74090ebd-upload-uploadContainer"
                                            id="uploadedPhoto"
                                            type="file"
                                            onChange={this.fileChangedHandler} />
                                    </FormGroup>
                                    {this.state.filePath ? (<>
                                        <img className="upload-photo" width="300" src={require("../../photos/" + this.state.fileName)} alt="test"
                                        />
                                    </>) : (<>
                                    </>)
                                    }
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
