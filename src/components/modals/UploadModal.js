import React, { useState } from "react"
//import { Link } from "react-router-dom"
import { Card, CardBody, CardImg } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
//import { Card, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge } from 'reactstrap';
//import { Label, Row, Col } from 'reactstrap'
//import ImageUploader from 'react-images-upload';
import APIManager from "../../modules/APIManager"
import ExifData from "./ExifData"
import GPStoDegree from "./GPStoDegree"


const UploadModal = (props) => {

  const {
    //buttonLabel,
    className,
  } = props;

  // Set initial state
  //let pictures = []
  //let selectedFile = null
  let filePath = ""
  let fileName = ""
  let photoData = null

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);




  // Update state whenever an input field is edited
  /*const handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }*/

  //
  /*const handleUpload = (e) => {
    e.preventDefault()
    //
    //this.props.history.push("/");
  }*/

  //
  const fileChangedHandler = event => {
    //console.log("upload file:", event.target.files[0])
    //output.src = URL.createObjectURL(event.target.files[0]);
    //let tmppath = window.URL.createObjectURL(event.target.files[0])
    //console.log("upload file obj path:", tmppath)
    //console.log("upload file tmp path:", $("img").fadeIn("fast").attr('src', tmppath))
    console.log("upload file name:", event.target.files[0].name)

    //this.setState({
    //selectedFile = event.target.files[0]
    filePath = URL.createObjectURL(event.target.files[0])
    console.log("fileChangedHandler - filePath", filePath)
    fileName = event.target.files[0].name
    photoData = ExifData.getExifData(event.target.files[0])

    //window.location.reload(true)
    //window.opener.refresh()
    //photoData: event.target.files[0].exifdata
    //})
  }

  //
  const convertDateTime = (dateTime) => {
    let t = dateTime.replace(" ", ":").split(":")
    return new Date(t[0], t[1], t[2], t[3], t[4], t[5])
  }

  const uploadPhotoFile = (location) => {

    let photo = {
      fileName: fileName,
      takenDate: convertDateTime(photoData.DateTime),
      uploadDate: new Date(),
      latitude: location.latitude,
      longitude: location.longitude,
      comment: "",
      userId: JSON.parse(localStorage.getItem("credentials"))[0].id
    }

    let issue = {
      reportPhoto: 1,
      closePhoto: 0,
      status: "active",
      comment: "",
      complain: "",
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
            //console.log("new photo record data:", data)
            issue.reportPhoto = data.id
            alert("New photo " + photo.fileName + " added. Thanks for report!");
            return data
          })
            .then((photo) => {
              APIManager.putRecord("issues", issue).then(data => {
                //console.log("new issue record data:", data)
                setLocation(issue, photo)

                alert("New issue created. Thanks for report!");

                //this.props.reload()
              })
            })
          //} else {
          //alert("Input data for registration is not valid. Try again!");
          //}
        }
      })
  }



  //
  const uploadHandler = (e) => {
    e.preventDefault()

    var Convertor = new GPStoDegree(photoData)

    let location = Convertor.getData()

    //console.log("uploadHandler - location:", location, location.latitude, location.longitude.length)

    if (location.latitude.length !== 0 && location.longitude.length !== 0) {
      uploadPhotoFile(location)
    } else {
      alert("This photo doesn't contain location data!")
    }
  }


  const setLocation = (issue, photo) => {
    let returnedStorage = localStorage.getItem('locations')
    let LSLocations = JSON.parse(returnedStorage)
    LSLocations = LSLocations.concat(newLocation(issue.id, photo.latitude, photo.longitude, photo.userId, photo.takenDate.substring(0, 10)))
    localStorage.setItem("locations", JSON.stringify(LSLocations));
  }

  //
  const newLocation = (issue, latitude, longitude, user, date) => {
    const location = {
      issue: issue,
      latitude: latitude,
      longitude: longitude,
      username: user,
      date: date
    }
    return location
  }



  return (
    <div>
      <Button color="danger" onClick={toggle}>Upload photo</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Upload issue photo modal</ModalHeader>
        <ModalBody>

          <div className="spooky-background">
            <Card>
              <CardBody>
                <Form onSubmit={uploadHandler}>
                  <FormGroup>
                    <h3>Upload issue photo</h3>
                  </FormGroup>
                  <Card>
                    {
                      (filePath !== "") ? (<>
                        {console.log("return - ok - filePath", filePath)}
                        <CardImg className="upload-photo" width="300" src={require("../../photos/" + fileName)} alt="test" />
                      </>) : (<>
                        {/*console.log("return - no - filePath", filePath)*/}
                      </>)
                    }
                  </Card>

                  <FormGroup>
                    {/*<Label htmlFor="email">new photo</Label>
                                        <Input onChange={this.handleFieldChange} type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required="" autoFocus="" />*/}
                    < Input data-name="upload-element"
                      accept=".jpg,.jpeg,.tiff"
                      title="Click here to upload document"
                      className="_74090ebd-upload-uploadContainer"
                      id="uploadedPhoto"
                      type="file"
                      onChange={fileChangedHandler} />
                  </FormGroup>
                  {/*<FormGroup>
                    <Button type="submit">Upload</Button>
                  </FormGroup>*/}
                </Form>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={uploadHandler}>Upload</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div >

  )

}

export default UploadModal
