import React, { Component } from "react";
import APIManager from "../modules/APIManager"


class LocationData extends Component {

    state = {
        allElements: [],
        locations: []
    }

    //
    getIssues = (issues) => {
        APIManager.getAndFilter(issues, "status", "active")
            .then((allElements) => {
                //console.log("getIssue - allElements:", allElements)
                this.setState(() => {
                    return {
                        allElements: allElements
                    }
                })
            }).then(() => {
                this.state.allElements.map((issue) => {
                    return APIManager.get("photos", issue.reportPhoto)
                        .then((photo) => {
                            this.setState(prevState => {
                                return {
                                    locations: prevState.locations.concat(this.newLocation(photo.latitude, photo.longitude))
                                }
                            })
                            this.props.getLocation(this.state.locations);
                        })

                })
            })
    }

    //
    newLocation = (latitude, longitude) => {
        const location = {
            latitude: latitude,
            longitude: longitude
        }
        return location
    }

    //
    componentDidMount() {
        this.getIssues(this.props.Elements)
    }

    render() {
        return (
            <></>
        )
    }

}

export default LocationData
