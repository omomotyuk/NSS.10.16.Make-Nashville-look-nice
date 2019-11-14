import React, { Component } from "react";
import APIManager from "../modules/APIManager"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class ActiveData extends Component {

    state = {
        users: [],
        issues: [],
        photos: []
    }

    //
    getUsers = () => {
        APIManager.allRecords("users").then((users) => {
            this.setState(() => {
                return {
                    users: users
                }
            })
            this.props.setUsers(this.state.users)
        })
    }

    //
    getIssues = () => {
        APIManager.getAndFilter("issues", "status", "active").then((issues) => {
            this.setState(() => {
                return {
                    issues: issues
                }
            })
            this.props.setIssues(this.state.issues)
        })
    }

    //
    getPhotos = () => {
        APIManager.allRecords("photos").then((photos) => {
            this.setState(() => {
                return {
                    photos: photos
                }
            })
            this.props.setPhotos(this.state.photos)
        })
    }

    //
    componentDidMount() {
        this.getUsers()
        this.getIssues()
        this.getPhotos()
    }

    render() {
        return (
            <></>
        )
    }
}

export default ActiveData
