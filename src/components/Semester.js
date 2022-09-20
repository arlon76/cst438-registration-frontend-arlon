import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST} from '../constants.js'

import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'

import ButtonGroup from '@mui/material/ButtonGroup';

toast.configure();

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {
			selected: SEMESTER_LIST.length-1
			,studentAddDialogOpen: false
			, studentAdding:{ 
				  email: ''
				  ,name: ''
				  ,status: ''
				  ,statusCode: -1
				  ,student_id: -1
			}
			,sa_name:'',sa_email:'',sa_status:'',sa_statusCode:'',sa_student_id:-1
		};
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>this page is semester.js
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button> 
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpenAddStudentDialog}>
              Add Student
            </Button>
            <Dialog open={this.state.studentAddDialogOpen} onClose={this.handleCloseAddStudentDialog}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleChangeAddStudentDialog}  /> 
                  <TextField fullWidth label="Student Email" name="student_email" onChange={this.handleChangeAddStudentDialog}  /> 
                  <TextField fullWidth label="Student Status" name="student_status" onChange={this.handleChangeAddStudentDialog}  /> 
                  <TextField fullWidth label="Student Status Code" name="student_statusCode" onChange={this.handleChangeAddStudentDialog}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleCloseAddStudentDialog}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAddStudent}>Add</Button>
                </DialogActions>
              </Dialog>
              <Button component={Link} 
                      to={{pathname:'/student'
					  /* , year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name*/
					  }} 
					variant="outlined" color="primary" style={{margin: 10}}>
                Go To The Add Student Page
              </Button> 
              <Button component={Link} 
                      to={{pathname:'/course'
					  /* , year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name*/
					  }} 
					variant="outlined" color="primary" style={{margin: 10}}>
                Go To The Add Course Page
              </Button>
			  <ToastContainer />
          </div>
      </div>
    );
	};
	handleClickOpenAddStudentDialog = () => {
		//console.log('Line 132 Semester.js says: student, sa_statusCode: ',this.state.studentAdding,this.state.sa_statusCode);
      this.setState( {studentAddDialogOpen:true} );
    };
    handleCloseAddStudentDialog = () => {
      this.setState( {studentAddDialogOpen:false} );
	  //console.log('Line 45 Semester.js says: student, sa_statusCode: ',this.state.studentAdding,this.state.sa_statusCode);
    };
	setAddStudentProp = (name,val)=>{
		//console.log('Line 48 AddStudent.js says: name,val:',name,val);
		switch(name){
			case 'student_name':
				this.setState({studentAdding:{name: val}});
				this.setState({sa_name:val});
				break;
			case 'student_email':
				this.setState({studentAdding:{email: val}});
				this.setState({sa_email:val});
				break;
			case 'student_status':
				this.setState({studentAdding:{status: val}});
				this.setState({sa_status:val});
				break;
			case 'student_statusCode':
				this.setState({studentAdding:{statusCode: val}});
				this.setState({sa_statusCode:val});
				//console.log('Line 65 AddStudent.js says: ',this.state.studentAdding,this.state.studentAdding,this.state.sname,this.state.semail,this.state.sstatusCode);
				break;
		}
		//console.log('Line 68 setProp.js says: ',this.state.studentAdding,this.state.sname,this.state.semail,this.state.sstatus,this.state.sstatusCode);
	};
    handleChangeAddStudentDialog = (event) => {
		//console.log('Line 72 Semester.js says: ',event.target.value,event.target.name);
		this .setAddStudentProp(event.target.name,event.target.value);
		//console.log('Line 74 Semester.js says: ',this.state.studentAdding,this.state.studentAdding,this.state.sname,this.state.semail,this.state.sstatusCode);
		//this.setState({studentAdding:{name:this.state.sname,email:this.state.semail,status:this.state.sstatus,statusCode:this.state.sstatusCode}});
		//it's threaded, you can't do that
		//console.log('Line 76 Semester.js says: ',this.state.studentAdding,this.state.sname,this.state.semail,this.state.sstatus,this.state.sstatusCode);
    }
  // Save studentAdding and close modal form
    handleAddStudent = () => {
		if ( ! (/^[0-9]+$/.test(this.state.sa_statusCode) ) ) {  
			this.setState({message: 'The status code needs to be an integer'});
			toast.error("The status code needs to be an integer", {
				position: toast.POSITION.BOTTOM_LEFT
			});
			return;
		}
       // this.props.addStudent(this.state.studentAdding);
	   this.setState({studentAdding:{name:this.state.sa_name,email:this.state.sa_email,status:this.state.sa_status,statusCode:this.state.sa_statusCode}},this.addStudent);
       // this.addStudent(this.state.studentAdding);
       this.handleCloseAddStudentDialog();
    }
  // Add student
  // addStudent = (student) => {
  addStudent = () => {
	  let studentAdding=this.state.studentAdding;
	  //const {studentAdding}=this.state.studentAdding;
	  //console.log('188');
    const token = Cookies.get('XSRF-TOKEN');
	console.log('line 103 of AddStudent.js says student is:',studentAdding);
    fetch(`${SERVER_URL}/student`,
      { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(studentAdding)
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
		console.log('line 140 this is good res:',res);
       this.setState({
			studentAdding:{
			  email: res.email
			  ,name: res.name
			  ,status: res.status
			  ,statusCode: res.statusCode
			  ,student_id: res.student_id}
          ,sa_email: res.email
          ,sa_name: res.name
          ,sa_status: res.status
          ,sa_statusCode: res.statusCode
          ,sa_student_id: res.student_id
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

}
export default Semester;