import React, { useState } from "react"
import { Card, CardBody, CardImg, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input } from 'reactstrap';
import APIManager from "../../modules/APIManager"
import ExifData from "./ExifData"
import GPStoDegree from "./GPStoDegree"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
const UploadModal = (props) => {

  const {
    //buttonLabel,
    className,
    reload
  } = props;

  const [modal, setModal] = useState(false);

  let filePath = ""
  let fileName = ""
  let photoData = null

  //
  const toggle = () => setModal(!modal);

  //
  //
  //const saveFile = () => {

  // Example: Client-browser code to download file from SharePoint using JavaScript and REST
  //}
  //
  //


  //
  const fileChangedHandler = event => {
    filePath = URL.createObjectURL(event.target.files[0])
    fileName = event.target.files[0].name

    console.log("fileName: ", fileName)

    photoData = ExifData.getExifData(event.target.files[0])
    //
    //
    var _fileName = fileName + ".new"

    var url = filePath
    var link = document.createElement("a");
    console.log("link: ", link)
    link.setAttribute("href", url);
    link.setAttribute("download", _fileName);
    link.style = "visibility:hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //setTimeout(function () { document.body.removeChild(link); }, 500);


    /*sprLib.file( newFileName ).get()
      .then(function (blob) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", _fileName);
        link.style = "visibility:hidden";
        document.body.appendChild(link);
        link.click();
        setTimeout(function () { document.body.removeChild(link); }, 500);
      });*/

  }

  //
  const convertDateTime = (dateTime) => {
    let t = dateTime.replace(" ", ":").split(":")
    return new Date(t[0], t[1], t[2], t[3], t[4], t[5])
  }

  //
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
          APIManager.putRecord("photos", photo).then(data => {
            issue.reportPhoto = data.id
            alert("New photo " + photo.fileName + " added. Thanks for report!");
            return data
          })
            .then((photo) => {
              APIManager.putRecord("issues", issue).then(data => {
                setLocation(issue, photo)
                reload()
              })
            })
        }
      })
  }

  //
  const uploadHandler = (e) => {
    e.preventDefault()
    var Convertor = new GPStoDegree(photoData)
    let location = Convertor.getData()
    if (location.latitude.length !== 0 && location.longitude.length !== 0) {
      uploadPhotoFile(location)
    } else {
      alert("This photo doesn't contain location data!")
    }
  }

  //
  const setLocation = (issue, photo) => {
    let returnedStorage = localStorage.getItem('locations')
    let LSLocations = JSON.parse(returnedStorage)
    LSLocations = LSLocations.concat(newLocation(
      issue.id,
      photo.latitude,
      photo.longitude,
      photo.userId,
      photo.takenDate.substring(0, 10)))
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

  //
  return (
    <div>
      <Button color="danger" onClick={toggle}>Upload photo</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Upload issue photo</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={uploadHandler}>
                {
                  (filePath !== "") ? (<>
                    {console.log("return - ok - filePath", filePath)}
                    <CardImg className="upload-photo" width="300" src={require("../../photos/" + fileName)} alt="test" />
                  </>) : (<>
                  </>)
                }
                <FormGroup>
                  < Input data-name="upload-element"
                    accept=".jpg,.jpeg,.tiff"
                    title="Click here to upload document"
                    className="_74090ebd-upload-uploadContainer"
                    id="uploadedPhoto"
                    type="file"
                    onChange={fileChangedHandler} />
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
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
