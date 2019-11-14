import React, { Component } from "react";
import NavBar from "./navbar/NavBar";
import AppViews from "./AppViews";
import APIManager from "../modules/APIManager"
import ActiveData from "./ActiveData"
import LocationData from "./LocationData"
import "./App.css";
/*
// 2019, Alex Momotyuk, Make Nashville Look Nice, NSS, Front-end capstone project
*/

//
class App extends Component {

  state = {
    user: localStorage.getItem("credentials") !== null,
    level: localStorage.getItem('userLevel'),
    query: {
      table: "users",
      email: "",
      userName: "",
      password: "",
      firstName: ""
    },
    users: [],
    issues: [],
    photos: [],
    locations: []
  };

  //
  checkLoginData = () => {
    APIManager.getRecord(this.state.query)
      .then(userList => {
        if (userList.length) {

          localStorage.setItem("credentials", JSON.stringify(userList));
          let returnedStorage = localStorage.getItem('credentials')
          let currentUser = JSON.parse(returnedStorage)[0]
          localStorage.setItem("userLevel", currentUser.level)

          this.setState({
            user: this.isAuthenticated(),
            level: localStorage.getItem('userLevel')
          });
        } else {
          alert("Input data is not valid. Try again!");
        }
      })
  }

  // Check if credentials are in local storage and returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null;

  //
  setUser = authObj => {
    this.setState(updater => ({
      query: {
        table: updater.query.table,
        email: authObj.email,
        password: authObj.password,
        firstName: updater.query.firstName,
        userName: updater.query.userName
      }
    }), () => { this.checkLoginData() }
    )
  }

  //
  containsCharacterFrom = (set, phrase) => {
    if (
      phrase
        .split("")
        .reduce((found, character) => (found += set.includes(character)), 0)
    ) {
      return 1;
    }
    return 0;
  };

  //
  verifyPassPhrase = passphrase => {
    const passLength = 8;

    const characterSets = [
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "abcdefghijklmnopqrstuvwxyz",
      "0123456789",
      "@%+'!#$ ^?:.(){}[]~-_"
      /* special symbols taken from https://docs.oracle.com/cd/E11223_01/doc.910/e11197/app_special_char.htm */
    ];

    if (passphrase.length < passLength) {
      alert("Passphrase must be at least 8 characters long.");
      return 0;
    } else if (
      characterSets.reduce(
        (match, set) => (match += this.containsCharacterFrom(set, passphrase)),
        0
      ) < characterSets.length
    ) {
      alert(
        "Passphrase must contain capital letters, small letters, numbers and special symbols."
      );
      return 0;
    }
    return 1;
  };

  //
  verifyInput = input => {
    if (input.password !== input.password_confirm) {
      alert("Password and its confirmation are different.");
      return 0;
    } else if (!this.verifyPassPhrase(input.password)) {
      alert("Passphrase not verified.");
      return 0;
    } /* else if (!verifyEmail(input.email)) {
        alert("eMail not valid.")
        return 0
    }*/
    return 1;
  };

  //
  newRecord = query => {
    const record = {
      firstName: "",
      lastName: "",
      userName: query.userName,
      email: query.email,
      password: query.password,
      level: 1,
      comment: ""
    };
    return record;
  };

  //
  checkSignupData = (input) => {

    let query = {
      table: "users",
      firstName: input.firstName,
      lastName: input.lastName,
      userName: input.userName,
      email: input.email,
      password: input.password,
      level: 1,
      comment: "",
      password_confirm: input.password_confirm
    }

    APIManager.getAndFilter(query.table, "email", query.email)
      .then(userList => {
        if (userList.length) {
          alert("account " + query.email + " already exist. Try again!");
        } else {
          // putting new record to database
          if (this.verifyInput(query)) {
            const record = this.newRecord(query);
            APIManager.putRecord(query.table, record).then(data => {
              alert("New account " + record.email + " created. Good job!");
            });
          } else {
            alert("Input data for registration is not valid. Try again!");
          }
        }
      })
  }

  //
  newUser = input => {
    this.checkSignupData(input)
  }

  /*
    componentDidMount() {
   	this.setState({
   		user: this.isAuthenticated()
   	});
   }
  */

  //
  clearUser = () => {
    localStorage.clear()
    this.setState({
      user: this.isAuthenticated(),
      level: localStorage.getItem('userLevel')
    })

    document.location.reload()
  }

  //
  setUsers = (data) => {
    this.setState(() => ({
      users: data
    }))
  }

  //
  setIssues = (issues) => {
    this.setState(updater => ({
      issues: issues
    })
    )
  }

  //
  setPhotos = (data) => {
    this.setState(() => ({
      photos: data
    }))
  }

  //
  setLevel = (id, level) => {
    APIManager.get("users", id)
      .then(user => {
        user.level = level
        return (user)
      })
      .then(user => {
        APIManager.updateRecord("users", id, user)
          .then(() => {
            //this.props.reload()
            APIManager.allRecords("users").then((users) => {
              this.setState(() => {
                return {
                  users: users
                }
              })
            })
          })
      })
  }

  //
  getLocation = (locations) => {
    this.setState(updater => ({
      locations: locations
    })
    )
  }

  //
  reloadAll = () => {
    //this.forceUpdate()
    document.location.reload()
  }

  //pass setUser and clearUser as props to the NavBar components
  render() {
    return (
      <React.Fragment >
        <ActiveData setUsers={this.setUsers}
          setIssues={this.setIssues}
          setPhotos={this.setPhotos} />
        {/*<IssueData Elements={"issues"} setIssues={this.setIssues} />*/}
        <LocationData Elements={"issues"}
          getLocation={this.getLocation} />
        <NavBar user={this.state.user}
          level={this.state.level}
          clearUser={this.clearUser} />
        <AppViews user={this.state.user}
          level={this.state.level}
          users={this.state.users}
          issues={this.state.issues}
          photos={this.state.photos}
          locations={this.state.locations}
          setUser={this.setUser}
          newUser={this.newUser}
          setLevel={this.setLevel}
          reload={this.reloadAll} />
      </React.Fragment >
    )
  }
}

export default App
