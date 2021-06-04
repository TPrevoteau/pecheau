import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Hubeau from "./hubeau.js";
const CONFIG = require('../config');


export class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      imageUrl: null,
      isConnected: false
    };
  }

  loginSuccess=(response)=>{
    console.log("login success");
    this.setState({
      name: response.profileObj.name,
      email: response.profileObj.email,
      imageUrl: response.profileObj.imageUrl,
      isConnected: true
    });
  }

  logoutSuccess=()=>{
    console.log("logout success");
    this.setState({
      name: null,
      email: null,
      imageUrl: null,
      isConnected: false
    });
  } 

  loginFailure=(response)=>{
    console.log("login failure");
  }

  logoutFailure=()=>{
    console.log("logout failure");
  }



  render() {

    let renderDisplay;
    if (this.state.isConnected) {
      renderDisplay = (
      <div>
        <div className="navbar">
          <img className="navbar-logo" src="./logo.png" alt="Logo de Pech'Eau" />
          <h1 className="navbar-title">Pecheau</h1>
	      	<label className="navbar-text">{this.state.name}</label>
          <img className="imgProfile" src={this.state.imageUrl} alt={this.state.email} />
		  	  <div className="buttonLogout">	        
	      	  	<GoogleLogout
		            clientId={CONFIG.login.clientId}
		            buttonText="Se deconnecter"
		            onLogoutSuccess={this.logoutSuccess}
		            onFailure={this.logoutFailure}
		        >
		        </GoogleLogout>
	        </div>
        </div>
        <div className="hubeau-app">
        	<Hubeau/>
        </div>
      </div>
      )
    }else{
        renderDisplay = (
        <div>
            <header className="App-header">
              <img src="./logo.png" alt="Logo de Pech'Eau" />
              <h1>Pech'Eau</h1>
              <div className="home-instructions" >Connectez-vous avec Google pour utiliser Pech'Eau</div>
	            <GoogleLogin
	                clientId={CONFIG.login.clientId}
	                buttonText="Se connecter avec Google"
	                onSuccess={this.loginSuccess}
	                onFailure={this.loginFailure}
	                cookiePolicy={'single_host_origin'}
	                isSignedIn={true}
	            />
        	</header>
  
        </div>

        )
    }

    return (
        renderDisplay
    );

  }

}


export default Login;