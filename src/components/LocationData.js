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
                                    locations: prevState.locations.concat(this.newLocation(issue.id, photo.latitude, photo.longitude, photo.userId, photo.takenDate.substring(0, 10)))
                                }
                            })
                            this.props.getLocation(this.state.locations);
                            localStorage.setItem("locations", JSON.stringify(this.state.locations));
                        })

                })
            })
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
