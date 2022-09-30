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

toast.configure();

// properties addStudent is required, function called when Add clicked.
class AddStudentButton extends Component{
    constructor(props) {
		  super(props);
		  this.state = {open: false
		  , student:{ 
			  email: ''
			  ,name: ''
			  ,status: ''
			  ,statusCode: -1
			  ,student_id: -1
		}
		  ,sname:'',semail:'',sstatus:'',sstatusCode:'',sstudent_id:-1 };
		 // console.log('line 27 constructor added addStudent with state:',this.state.student);
    };
    handleClickOpen = () => {
      this.setState( {open:true} );
    };
    handleClose = () => {
      this.setState( {open:false} );
	  //console.log('Line 45 AddStudent.js says: student, sstatusCode: ',this.state.student,this.state.sstatusCode);
    };
	setProp = (name,val)=>{
		//console.log('Line 48 AddStudent.js says: name,val:',name,val);
		switch(name){
			case 'student_name':
				this.setState({student:{name: val}});
				this.setState({sname:val});
				break;
			case 'student_email':
				this.setState({student:{email: val}});
				this.setState({semail:val});
				break;
			case 'student_status':
				this.setState({student:{status: val}});
				this.setState({sstatus:val});
				break;
			case 'student_statusCode':
				this.setState({student:{statusCode: val}});
				this.setState({sstatusCode:val});
				//console.log('Line 65 AddStudent.js says: ',this.state.student,this.state.student,this.state.sname,this.state.semail,this.state.sstatusCode);
				break;
		}
		//console.log('Line 68 setProp.js says: ',this.state.student,this.state.sname,this.state.semail,this.state.sstatus,this.state.sstatusCode);
	};
    handleChange = (event) => {
		//console.log('Line 72 AddStudent.js says: ',event.target.value,event.target.name);
		this .setProp(event.target.name,event.target.value);
		//console.log('Line 74 AddStudent.js says: ',this.state.student,this.state.student,this.state.sname,this.state.semail,this.state.sstatusCode);
		//this.setState({student:{name:this.state.sname,email:this.state.semail,status:this.state.sstatus,statusCode:this.state.sstatusCode}});
		//it's threaded, you can't do that
		//console.log('Line 76 AddStudent.js says: ',this.state.student,this.state.sname,this.state.semail,this.state.sstatus,this.state.sstatusCode);
    }
  // Save student and close modal form
    handleAdd = () => {
		if ( ! (/^[0-9]+$/.test(this.state.sstatusCode) ) ) {  
			this.setState({message: 'The status code needs to be an integer'});
			toast.error("The status code needs to be an integer", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			return;
		}
       // this.props.addStudent(this.state.student);
	   this.setState({student:{name:this.state.sname,email:this.state.semail,status:this.state.sstatus,statusCode:this.state.sstatusCode}},this.addStudent);
       // this.addStudent(this.state.student);
       this.handleClose();
    }
    render()  { 
      return (
			<span>
            <Button id="add-student-button" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth id="new_student_name_entry_field" label="Student Name" name="student_name" onChange={this.handleChange}  /> 
                  <TextField fullWidth id="new_student_email_entry_field" label="Student Email" name="student_email" onChange={this.handleChange}  /> 
                  <TextField fullWidth id="new_student_status_entry_field" label="Student Status" name="student_status" onChange={this.handleChange}  /> 
                  <TextField fullWidth id="new_student_statusCode_entry_field" label="Student Status Code" name="student_statusCode" onChange={this.handleChange}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="submit-student-button" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>
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
        method: 'POST', 
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
        method: 'GET', 
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
AddStudentButton.propTypes = {
  //addStudent : PropTypes.func.isRequired
  //it's what's passed in, not what it has here
  
}
export default AddStudentButton;