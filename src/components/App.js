import React, { Component } from "react";
//import logo from "../images/logo.svg";
import NavBar from "./navbar/NavBar";
import AppViews from "./AppViews";
import "./App.css";
import APIManager from "../modules/APIManager"


class App extends Component {

  state = {
    user: localStorage.getItem("credentials") !== null,

    query: {
      table: "users",
      email: "",
      password: "",
      name: "",
      username: ""
    }
  };


  checkLoginData = () => {

    APIManager.getRecord(this.state.query)
      .then(userList => {
        console.log("checkLoginData userList:", userList)
        if (userList.length) {
          localStorage.setItem("credentials", JSON.stringify(userList));
          this.setState({
            user: this.isAuthenticated()
          });
        } else {
          alert("Input data is not valid. Try again!");
        }
      })
  }


  // Check if credentials are in local storage and returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null;


  setUser = authObj => {
    console.log("setUser obj:", authObj)
    this.setState(updater => ({
      query: {
        table: updater.query.table,
        email: authObj.email,
        password: authObj.password,
        name: updater.query.name,
        username: updater.query.username
      }
    }), () => { this.checkLoginData() }
    )
  }


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


  newRecord = query => {
    const record = {
      name: query.name,
      username: query.username,
      password: query.password,
      email: query.email
    };
    return record;
  };


  checkSignupData = (input) => {

    let query = {
      table: "users",
      name: input.name,
      username: input.username,
      email: input.email,
      password: input.password,
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


  newUser = input => {
    this.checkSignupData(input)
  }

  // componentDidMount() {
  // 	this.setState({
  // 		user: this.isAuthenticated()
  // 	});
  // }


  clearUser = () => {
    localStorage.clear();

    this.setState({
      user: this.isAuthenticated()
    });
  };


  //pass setUser and clearUser as props to the NavBar components
  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} clearUser={this.clearUser} />
        <AppViews user={this.state.user} setUser={this.setUser} newUser={this.newUser} />
      </React.Fragment>
    );
  }
}

export default App;
