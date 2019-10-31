import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    handleSignOut = () => {
        this.props.clearUser();
        this.props.history.push("/");
    };

    /*
        userAccess = (level) => {
            if (level <= parseInt(this.props.level)) {
                return true
            } else {
                return false
            }
        }
    */

    newLink = (path, title) => {
        const link = {
            path: path,
            title: title,
        }
        return link
    }


    newLinkList = () => {
        const linkList = []

        linkList[0] = this.newLink("", "")
        linkList[1] = this.newLink("general", "News")
        linkList[2] = this.newLink("upload", "Upload")
        linkList[3] = this.newLink("close", "Close")
        linkList[4] = this.newLink("complain", "Complain")

        return linkList
    }


    addLink = (key, path, title) => {
        return (
            <li className="nav-item" key={key}>
                <Link className="nav-link" to={path}>{title}</Link>
            </li>
        )
    }


    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    {this.props.user ? (
                        <>
                            {
                                this.newLinkList().map((link, index) => {
                                    //console.log("NavBar.render: map.index:", index, this.props.level)
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