import React, { Component } from "react";
import APIManager from "../modules/APIManager"


class IssueData extends Component {

    state = {
        issues: []
    }

    //
    getIssues = (Elements) => {
        APIManager.getAndFilter(Elements, "status", "active").then((issues) => {
            //console.log("GeneralList.getData - issues:", issues)
            this.setState(() => {
                return {
                    issues: issues
                }
            })
            //
            this.props.setIssues(this.state.issues)
        })
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

export default IssueData
