import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Hubeau from "./hubeau.js";
const CONFIG = require('../config');

var AWS = require("aws-sdk");

function modify(email, name, imageUrl){

  let awsConfig = {
    "region": "eu-west-3",
    "endpoint": "http://dynamodb.eu-west-3.amazonaws.com",
    "accessKeyId": "AKIA2G7TKZLRHOT7J5CQ", "secretAccessKey": "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"
  };

  AWS.config.update(awsConfig);

  let docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: "users",
    Key: { "email_id": email },
    UpdateExpression: "set #n = if_not_exists(#n, :name), image = if_not_exists(image, :imageUrl)",
    ExpressionAttributeValues: {
      ":name": name,
      ":imageUrl": imageUrl
    },

    ExpressionAttributeNames: {
      "#n": "name"
    },
    ReturnValues: "UPDATED_NEW"
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.log("users::update::error - " + JSON.stringify(err, null, 2));
    } else {
      console.log("users::update::success "+JSON.stringify(data) );
    }
 });
}

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
    modify(response.profileObj.email,response.profileObj.name,response.profileObj.imageUrl);
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
	                cookiePolicy={'none'}
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