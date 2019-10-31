import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
//import GeneralList from "./general/GeneralList";
import Upload from "./upload/Upload"
import GeneralListMap from "./general/GeneralListMap";
//import Leaflet from "../maps/Leaflet/Leaflet"
//import OpenLayersMap from "../maps/OpenLayers/OpenLayersMap"
//import GImage from "./general/GImage"
//import { Button } from 'reactstrap';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class AppViews extends Component {

  state = {
    routePaths: ["upload", "close"]
  }


  userAccess = (level) => {
    //console.log("userAccess props.level:", this.props.level)
    if (level <= parseInt(this.props.level)) {
      //if (level <= localStorage.getItem('userLevel')) {
      //if (level <= this.props.user.level) {
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

  // Modal stuff
  //[modal, setModal] = useState(false);
  //toggle = () => setModal(!modal);

  render() {
    return (
      <React.Fragment>

        <Route exact path="/" render={props => {
          if (this.props.user && this.userAccess(0)) {
            //return <GeneralList Elements={"issues"} {...props} />
            return <GeneralListMap path={""} issues={this.props.issues} locations={this.props.locations} level={this.props.level} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/general" render={props => {
          if (this.props.user && this.userAccess(0)) {
            return <GeneralListMap path={"general"} issues={this.props.issues} locations={this.props.locations} level={this.props.level} {...props} />
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/upload" render={props => {
          if (this.props.user && this.userAccess(1)) {
            return <Upload reload={this.props.reload} {...props} />
            //return (<>
            //<GeneralListMap path={"upload"} issues={this.props.issues} locations={this.props.locations} reload={this.props.reload} level={this.props.level} {...props} />
            //</>)
          } else {
            return <Redirect to="/signin" />;
          }
        }}
        />

        <Route exact path="/close" render={props => {
          if (this.props.user && this.userAccess(2)) {
            return (<>
              <GeneralListMap path={"close"} issues={this.props.issues} locations={this.props.locations} reload={this.props.reload} level={this.props.level} {...props} />
            </>)
          } else {
            return <Redirect to="/signin" />;
          }
        }} />

        <Route exact path="/complain" render={props => {
          if (this.props.user && this.userAccess(3)) {
            return (<>
              <GeneralListMap path={"complain"} issues={this.props.issues} locations={this.props.locations} level={this.props.level} {...props} />
            </>)
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
