"use strict;"
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Header from '../presentational/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from 'firebase';
import base, { firebaseApp } from '../../../../base';
import "babel-polyfill";

class Container extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      id: undefined,
      photoURL: undefined,
      fName: undefined
    };
  }

  authHandler = async (authData) => {
    const user = await base.fetch(`users/${authData.additionalUserInfo.profile.id}`, { context: this});
    console.log(authData.additionalUserInfo.profile.id);
    console.log(authData);
    console.log(user);
    if (!user.fName) {
      base.post(`users/${authData.additionalUserInfo.profile.id}`, {
        data: {
          fName: authData.additionalUserInfo.profile.given_name,
          photoURL: authData.additionalUserInfo.profile.picture,
        }
      })
      .then(
        this.setState({
          isLoggedIn: true,
          id: authData.additionalUserInfo.profile.id,
          fName: authData.additionalUserInfo.profile.given_name,
          photoURL: authData.additionalUserInfo.profile.picture,
        })
      )
    }

    if (user.fName) {
      this.setState({
        isLoggedIn: true,
        id: authData.additionalUserInfo.profile.id,
        fName: authData.additionalUserInfo.profile.given_name,
        photoURL: authData.additionalUserInfo.profile.picture,
      })
      console.log(this.state);
    }
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  }

  logout = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      this.setState({
        isLoggedIn: false,
        id: undefined,
        fName: undefined,
        photoURL: undefined
      });
      console.log('logged out');
    })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header authenticate={this.authenticate} isLoggedIn={this.state.isLoggedIn} photoURL={this.state.photoURL} logout={this.logout}/>
      </React.Fragment>
    );
  }
}

export default Container;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Container />, wrapper) : false;