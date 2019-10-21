import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import GeneralList from "./general/GeneralList";
import OpenLayersMap from "../maps/OpenLayers/OpenLayersMap"


export default class AppViews extends Component {

  state = {
    routePaths: ["upload", "close"]
  }

  render() {
    return (
      <React.Fragment>

        <Route exact path="/upload" render={props => {
          if (this.props.user) {
            return <GeneralList Elements={"photos"} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }}
        />
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

        <Route exact path="/" render={props => {
          if (this.props.user) {
            return <GeneralList Elements={"photos"} {...props} />
          }
        }} />

      </React.Fragment>
    );
  }
}
