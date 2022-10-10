// Common Methods
import {SERVER_URL} from '../constants.js'

import Cookies from 'js-cookie';

export const commonMethod = () => {
   console.log('Common Method reporting line 2 Common.js');
};

export const checkLoginStatus_RedirectIfNeccessary = () => {
    console.log("FETCH Line 11 Common.js");
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
        console.log("Line 22 Common.js reporting: redirect::" + response.status);
        // for 401 (not authorized), user is not logged in.  Continue to render() 
        //  and display login.
        // Otherwise, then user is logged in, redirect to Problem.js
        // if (response.status != 401) {
        if (response.status == 401) {
			  console.log("Line 28 Common.js reporting: response.status == 401, redirecting to / next" );
			//window.location.href = '/semester';
			// window.location.href =response.redirect;
			//console.log(JSON.parse(JSON.stringify(response)));
			//console.log(JSON.parse(JSON.stringify(response.body)));
			// window.location.href =response;
			// window.location.href ='/semester';
			window.location.href ='/';
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