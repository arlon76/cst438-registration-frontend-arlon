import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import Grid from '@mui/material/Grid';
import {DataGrid} from '@mui/x-data-grid';

import ButtonGroup from '@mui/material/ButtonGroup';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {checkLoginStatus_RedirectIfNeccessary, commonMethod} from './Common.js'
import {checkAdminStatus} from './Common.js'
toast.configure();

// properties addStudent is required, function called when Add clicked.
class CheckIfAdmin_TemporaryButton extends Component{
    constructor(props) {
		  super(props);
		  this.state = { };
		 // console.log('line 27 constructor added addStudent with state:',this.state.student);
    };
    checkIfAdmin = () => {
      checkAdminStatus((json)=>{
		  console.log('Line 34 temp button check if admin says json is:');
		  console.log(json);
		  console.log(json.email);
	  });
		 // console.log('line 27 constructor added addStudent with state:',this.state.student);
	  
    };


    render()  { 
      return (
			<span>
            <Button id="check-if-admin-temporary-button" variant="outlined" color="primary" style={{margin: 10}} onClick={this.checkIfAdmin}>
              Check-if-admin-temporary-button
            </Button>

			  </span>

      ); 
    }
  // Add student
  // addStudent = (student) => {
  addStudent = () => {
	  let student=this.state.student	  
	  //const {student}=this.state.student;
	  //console.log('102');
    const token = Cookies.get('XSRF-TOKEN');
	console.log('line 103 of AddStudent.js says student is:',student);
    fetch(`${SERVER_URL}/student`,
      { 
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
						//console.log('120 add student res:',res);

          toast.success("Student successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          //this.fetchStudent();
		  
		  //console.log('line 127 this is good res.json():',res.json())
		  
        } else {
          toast.error("Error when adding", {
              position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Post http status =' + res.status);
        }return res;})
		
		
		/*straight from Game.js:*/
		  .then(res =>res.json())
      .then(res => {
		  //console.log('line 140 this is good res:',res);
       this.setState({
			student:{
			  email: res.email
			  ,name: res.name
			  ,status: res.status
			  ,statusCode: res.statusCode
			  ,student_id: res.student_id}
          ,semail: res.email
          ,sname: res.name
          ,sstatus: res.status
          ,sstatusCode: res.statusCode
          ,sstudent_id: res.student_id
       });
	   toast.success("DB row successfully added in student table.", {
              position: toast.POSITION.BOTTOM_LEFT
          });
      })
    .catch(err => {
      toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
    })
  } 
  fetchStudent = () => {
    //console.log("Line 90 AddStudent.fetchStudent");
    const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/student?id=${this.props.student.id}`, 
      {  
        method: 'GET', credentials: 'include',
        headers: { 'X-XSRF-TOKEN': token }
      } )
    .then((response) => {
      console.log("FETCH RESP:"+response);
      return response.json();}) 
    .then((responseData) => { 
      // do a sanity check on response
      if (Array.isArray(responseData.student)) {
        this.setState({ 
          student: responseData.student,
        });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => {
      toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err); 
    })
  }
}
// required property:  addStudent is a function to call to perform the Add action
CheckIfAdmin_TemporaryButton.propTypes = {
  //addStudent : PropTypes.func.isRequired
  //it's what's passed in, not what it has here
  
}
export default CheckIfAdmin_TemporaryButton;