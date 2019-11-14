import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class NavBar extends Component {

    //
    handleSignOut = () => {
        this.props.clearUser();
        this.props.history.push("/");
    };

    //
    newLink = (path, title) => {
        const link = {
            path: path,
            title: title,
        }
        return link
    }

    //
    newLinkList = () => {
        const linkList = []

        linkList[0] = this.newLink("", "")
        linkList[1] = this.newLink("issues", "Issues")
        linkList[2] = this.newLink("upload", "Report")
        linkList[3] = this.newLink("close", "Close")
        linkList[4] = this.newLink("complain", "Complains")

        return linkList
    }

    //
    addLink = (key, path, title) => {
        return (
            <li className="nav-item" key={key}>
                <Link className="nav-link" to={path}>{title} </Link>
            </li>
        )
    }

    //
    showUser = () => {
        let credentials = localStorage.getItem("credentials")

        if (credentials !== null) {
            let currentUser = JSON.parse(credentials)[0]
            return ("Usename: " + currentUser.userName)
        } else {
            return ("")
        }
    }

    //
    render() {
        return (
            <nav className="navbar bg-light navbar-light light-blue flex-md-nowrap p-0 shadow">
                <span className="navbar-brand mb-0 h1">Make Nashville Look Nice</span>
                <span className="navbar-text">{this.showUser()}</span>
                <ul className="nav nav-pills nav-fill">
                    {this.props.user ? (
                        <>
                            {
                                this.newLinkList().map((link, index) => {
                                    if (index <= parseInt(this.props.level) + 1) {
                                        return this.addLink(index, link.path, link.title)
                                    }
                                    else {
                                        return null
                                    }
                                })
                            }
                            <li>
                                <span className="nav-link " onClick={this.handleSignOut}>Sign Out</span>
                            </li>
                        </>
                    ) : (
                            <>
                                <li>
                                    <Link className="nav-link" to="/signin">Sign In</Link>
                                </li>
                                <li>
                                    <Link className="nav-link" to="/signup">Sign Up</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav >
        )
    }
}

export default withRouter(NavBar)
