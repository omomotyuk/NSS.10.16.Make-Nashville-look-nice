import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import GeneralList from "./general/GeneralList";
import Upload from "./upload/Upload"
import GeneralListMap from "./general/GeneralListMap";
//import Leaflet from "../maps/Leaflet/Leaflet"
//import OpenLayersMap from "../maps/OpenLayers/OpenLayersMap"


export default class AppViews extends Component {

  state = {
    routePaths: ["upload", "close"]
  }


  userAccess = (level) => {
    console.log("userAccess props.level:", this.props.level)
    if (level <= parseInt(this.props.level)) {
      return true
    } else {
      return false
    }
  }


  componentDidMount() {
    //console.log("AppView - ComponentDidMount props.user:", this.props.user);
    //console.log("AppView - ComponentDidMount props.level:", this.props.level);
    //this.getData(this.props.Elements)
  }


  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={props => {
          if (this.props.user && this.userAccess(0)) {
            return <GeneralList Elements={"issues"} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/general" render={props => {
          if (this.props.user && this.userAccess(0)) {
            return <GeneralList Elements={"issues"} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/upload" render={props => {
          if (this.props.user && this.userAccess(1)) {
            return <Upload {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }}
        />

        <Route exact path="/close" render={props => {
          if (this.props.user && this.userAccess(2)) {
            return <GeneralListMap Elements={"issues"} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/complain" render={props => {
          if (this.props.user && this.userAccess(3)) {
            return <GeneralList Elements={"issues"} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        {/*}
        <Route exact path="/openLayers" render={props => {
          if (this.props.user) {
            return <OpenLayersMap {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }}
        />
*/}
        <Route path="/signup" render={props => {
          if (!this.props.user) {
            return <SignUp newUser={this.props.newUser} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route path="/signin" render={props => {
          if (!this.props.user) {
            return <SignIn setUser={this.props.setUser} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

      </React.Fragment>
    );
  }
}
