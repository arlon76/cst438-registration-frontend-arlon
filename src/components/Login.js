import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';

class Login extends Component {
    constructor(props) {
      super(props);
    };
 
  componentDidMount() {
    this.fetchUser();
  }
 
  fetchUser = () => {
    console.log("FETCH Line 16 Login.js");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(SERVER_URL + '/user', 
      {  
        method: 'GET'
		, NOTredirect: 'follow'
		, redirect: 'manual'
		, headers: { 'X-XSRF-TOKEN': token }, 
        credentials: 'include'
      } )
      .then(response => {
        console.log("Line 25 Login.js reporting: redirect::" + response.status);
        // for 401 (not authorized), user is not logged in.  Continue to render() 
        //  and display login.
        // Otherwise, then user is logged in, redirect to Problem.js
        if (response.status != 401) {
			  console.log("Line 30Login.js reporting: response.status != 401, redirecting to semester next" );
			//window.location.href = '/semester';
			// window.location.href =response.redirect;
			//console.log(JSON.parse(JSON.stringify(response)));
			//console.log(JSON.parse(JSON.stringify(response.body)));
			// window.location.href =response;
			window.location.href ='/semester';
        }
		return response;
    } )
	//.then(response=>response.json())
	//.then(json=>{
		//console.log(42);
		//console.log(json);
	//})
    .catch(err => {
		console.error(err);
     } );
    }
  
  render() {
        return ( <a align="left" href={SERVER_URL + '/oauth2/authorization/google'}>Login using Google</a> ); 
  }
}
export default Login;