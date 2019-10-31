import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
import APIManager from '../../modules/APIManager';
import "./General.css"
import Leaflet from "../../maps/Leaflet/Leaflet"
import "../../../node_modules/leaflet/dist/leaflet.css"
//import { Card, CardBody, CardHeader, CardFooter, Button, Form, FormGroup, Label, Input, InputGroupAddon, InputGroupText, Badge } from 'reactstrap';
import { Card, Button } from 'reactstrap';
//import Upload from "../upload/Upload"
//import ModalUpload from "../modals/ModalUpload"
import ComplainModal from "../modals/ComplainModal"



class GeneralListMap extends Component {

    state = {
        issues: [],
        checked: new Map()
    }

    //
    onCheck = (id) => {
        //console.log("onCheck.b - checked:", this.state.checked)
        console.log("onCheck - id:", id)
        this.setState(() => {
            return {
                checked: (this.state.checked.has(id) ? this.state.checked.delete(id) : this.state.checked.set(id, true))
            }
        })
        console.log("onCheck.e - checked:", this.state.checked)
    }

    getData = () => {
    }

    componentDidMount() {
        //console.log("didMount - props", this.props)
        //console.log("didMount - path:", this.props.match.path)
    }

    updateChecked = () => {
        this.state.checked.forEach((value, key) => {
            console.log("updateChecked - id", key)
            console.log("updateChecked - this.state.checked", this.state.checked)
            APIManager.get("issues", key)
                .then(issue => {
                    issue.status = "closed"
                    this.updateLocation(issue.id)
                    return (issue)
                })
                .then(issue => {
                    APIManager.updateRecord("issues", key, issue)
                        .then(() => {
                            this.props.reload()
                        })
                    /*.then(issue => {
                        console.log("update issue", issue)
                        this.setState((issue) => {
                            console.log("this.state.checked", this.state.checked)
                            return {
                                checked: this.state.checked.delete(issue.id)
                            }
                        })
                    })*/

                })
        })

        return true
    }
    //
    updateLocation = (issue) => {
        let returnedStorage = localStorage.getItem('locations')
        let LSLocations = JSON.parse(returnedStorage)
        //LSLocations = LSLocations.concat(this.newLocation(issue.id, photo.latitude, photo.longitude, photo.userId, photo.takenDate.substring(0, 10)))
        LSLocations = LSLocations.filter(location => location.issue !== issue)
        localStorage.setItem("locations", JSON.stringify(LSLocations));
    }

    //
    //
    uploadPhoto = () => { }

    //
    showComplains = () => { }

    //
    closeThemAll = () => {
        //console.log("closeThemAll.b - checked:", this.state.checked)
        this.updateChecked()
    }

    //
    showButton = () => {
        switch (this.props.path) {
            case "upload":
                return (
                    //<ModalUpload issues={this.props.issues} locations={this.props.locations} level={this.props.level} {...this.props} />
                    //<Upload {...props} />
                    <Card body>
                        <Button color="danger" onClick={this.uploadPhoto}>Upload new photo</Button>
                    </Card>
                )
                break;
            case "close":
                return (
                    //<Card body>
                    <Button color="danger" onClick={this.closeThemAll}>Close them all!</Button>
                    //</Card>
                )
                break;
            case "complain":
                return (
                    <ComplainModal issues={this.props.issues} locations={this.props.locations} level={this.props.level} {...this.props} />

                    /*<Card body>
                        <Button color="danger" onClick={this.showComplains}>Show complains</Button>
                    </Card>*/
                )
                break;
            default: { return null }
        }
    }


    render() {
        return (
            <>
                <div className="map-flex-container">
                    <aside>
                        <article>
                            {
                                (parseInt(this.props.level) > 1) ? (
                                    <>
                                        {
                                            this.showButton()
                                        }
                                    </>
                                ) : (<></>)
                            }

                            {/*<h1>{this.props.Elements} List</h1>*/}
                            {
                                this.props.issues.map(element =>
                                    <GeneralCard
                                        key={element.id}
                                        Elements={"issues"}
                                        element={element}
                                        {...this.props}
                                        onCheck={this.onCheck}
                                        getData={this.getData}
                                    />
                                )
                            }
                        </article>
                    </aside>
                    <main>
                        <Leaflet locations={this.props.locations} />
                        {/*<img className="test-map" src={require("../../images/test-map.png")} alt="test map" />*/}
                    </main>

                </div>
            </>
        )
    }
}

export default GeneralListMap;