import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import GeneralListMap from "./general/GeneralListMap";
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
export default class AppViews extends Component {

  state = {
    routePaths: ["upload", "close"]
  }

  //
  userAccess = (level) => {
    if (level <= parseInt(this.props.level)) {
      return true
    } else {
      return false
    }
  }

  //
  componentDidMount() {
    //this.getData(this.props.Elements)
  }

  //
  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={props => {
          if (this.props.user && this.userAccess(0)) {
            return <GeneralListMap
              path={""}
              issues={this.props.issues}
              locations={this.props.locations}
              level={this.props.level}
              {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/issues" render={props => {
          if (this.props.user && this.userAccess(0)) {
            return <GeneralListMap
              path={"issues"}
              issues={this.props.issues}
              locations={this.props.locations}
              level={this.props.level}
              {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/upload" render={props => {
          if (this.props.user && this.userAccess(1)) {
            return (<>
              <GeneralListMap
                path={"upload"}
                issues={this.props.issues}
                locations={this.props.locations}
                reload={this.props.reload}
                level={this.props.level}
                {...props} />
            </>)
          } else {
            return <Redirect to="/signin" />;
          }
        }}
        />

        <Route exact path="/close" render={props => {
          if (this.props.user && this.userAccess(2)) {
            return (<>
              <GeneralListMap
                path={"close"}
                issues={this.props.issues}
                locations={this.props.locations}
                reload={this.props.reload}
                level={this.props.level}
                {...props} />
            </>)
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/complain" render={props => {
          if (this.props.user && this.userAccess(3)) {
            return (<>
              <GeneralListMap
                path={"complain"}
                users={this.props.users}
                issues={this.props.issues}
                photos={this.props.photos}
                locations={this.props.locations}
                reload={this.props.reload}
                level={this.props.level}
                setLevel={this.props.setLevel}
                {...props} />
            </>)
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route path="/signup" render={props => {
          if (!this.props.user) {
            return <SignUp newUser={this.props.newUser}
              {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route path="/signin" render={props => {
          if (!this.props.user) {
            return <SignIn setUser={this.props.setUser}
              {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

      </React.Fragment>
    );
  }
}
