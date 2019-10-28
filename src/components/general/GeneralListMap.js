import React, { Component } from 'react';
import GeneralCard from './GeneralCard';
import APIManager from '../../modules/APIManager';
import "./General.css"
import Leaflet from "../../maps/Leaflet/Leaflet"
import "../../../node_modules/leaflet/dist/leaflet.css"


class GeneralListMap extends Component {
    state = {
        allElements: [],
        locations: []
    }

    getIssues = (issues) => {
        APIManager.getAndFilter(issues, "status", "active")
            .then((allElements) => {
                this.setState(() => {
                    return {
                        allElements: allElements
                    }
                })
            }).then(() => {
                //console.log("getIssue - allElements:", this.state.allElements)
                this.getLocations()
            }).then(() => {
                console.log("getIssues - locations", this.state.locations)
                // forceUpdate()
            })
    }

    addLocation = (issue) => {
        APIManager.get("photos", issue.reportPhoto).then((photo) => {
            this.setState(() => {
                return {
                    locations: this.state.locations.concat(this.newLocation(photo.latitude, photo.longitude))
                }
            })
            console.log("addLocation - locations", this.state.locations)
            this.forceUpdate()
        })
    }

    getLocations = () => {
        this.state.allElements.map((issue) => {
            return this.addLocation(issue)
        })
    }

    newLocation = (latitude, longitude) => {
        const location = {
            latitude: latitude,
            longitude: longitude
        }
        return location
    }

    //
    /*
    "fileName": "IMG_20190215_064622904.jpg",
    "takenDate": "2019-03-15T11:46:24.000Z",
    "uploadDate": "2019-10-28T15:28:14.754Z",
    "latitude": 40.74703025,
    "longitude": -73.98331338888889,
    "comment": "",
    "userId": 3,
    "id": 14
    */
    //


    componentDidMount() {
        //console.log("General list: ComponentDidMount", this.props.Elements);
        this.getIssues(this.props.Elements)
    }

    render() {

        return (
            <>
                <div className="map-flex-container">
                    <aside>
                        <article>
                            {/*<h1>{this.props.Elements} List</h1>*/}
                            {
                                this.state.allElements.map(element =>
                                    <GeneralCard
                                        key={element.id}
                                        Elements={this.props.Elements}
                                        element={element}
                                        {...this.props}
                                        getData={this.getData}
                                    />
                                )
                            }
                        </article>
                    </aside>
                    <main>
                        <Leaflet locations={this.state.locations} />
                        {/*<img className="test-map" src={require("../../images/test-map.png")} alt="test map" />*/}
                    </main>

                </div>
            </>
        )
    }
}

export default GeneralListMap;