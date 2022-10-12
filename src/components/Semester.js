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
import AddStudentButton from './AddStudentButton';
import CheckIfAdmin_TemporaryButton from './CheckIfAdmin_TemporaryButton.js';
//import Login from './Login';

import {checkLoginStatus_RedirectIfNeccessary, commonMethod} from './Common.js'
import {checkAdminStatus} from './Common.js'

toast.configure();

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {
			selected: SEMESTER_LIST.length-1
			,admin:false
		};
		//this._login=React.createRef();//https://stackoverflow.com/questions/24841855/how-to-access-component-methods-from-outside-in-reactjs
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
       //<Login ref={this._login} />
	//<CheckIfAdmin_TemporaryButton />	
	let adminAddStudentButtons;
	if(this.state.admin){adminAddStudentButtons=<span><AddStudentButton /><Button component={Link} to={{pathname:'/student'  }} variant="outlined" color="primary" style={{margin: 10}}> Go To The Add Student Page </Button> </span>;
}else adminAddStudentButtons=<span></span>;
    return (
		
       <div>This page is semester.js
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
                Get Schedule</Button>{adminAddStudentButtons}<Button component={Link} 
                      to={{pathname:'/course'
					  /* , year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name*/
					  }} 
					variant="outlined" color="primary" style={{margin: 10}}>Go To The Add Course Page</Button>
			  <ToastContainer />
          </div>
      </div>
    );
	};

	 componentDidMount() {
       // console.log(this._login.current.fetchUser()); // https://stackoverflow.com/questions/24841855/how-to-access-component-methods-from-outside-in-reactjs
    // }
	 // componentDidMount() {
    checkLoginStatus_RedirectIfNeccessary();
	
	  checkAdminStatus((json)=>{
		  console.log('Line 123 component did mount check admin Status says json is:');
		  console.log(json);
		  console.log(json.email);
		  if(json.email!='NOT ADMIN!'){
			  console.log('line 123 Semester setting admin to true');
			this.setState({admin:true});
		 }
		  else{
			  
			  console.log('line 127 Semester not admin');
			   this.setState({admin:false});
		  }
	  });

  }
 

}
export default Semester;