import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    handleSignOut = () => {
        this.props.clearUser();
        this.props.history.push("/");
    };

    render() {

        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    {this.props.user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/"></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/upload">Upload</Link>
                            </li>
                            {/*
                            <li className="nav-item">
                                <Link className="nav-link" to="/openLayers">OpenLayers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/close">Close</Link>
                            </li>
                            */}
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
