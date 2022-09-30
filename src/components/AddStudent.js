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
import AddStudentButton from './AddStudentButton';
toast.configure();

// properties addStudent is required, function called when Add clicked.
class AddStudent extends Component{
    constructor(props) {
		  super(props);
		  this.state = { };
		 // console.log('line 27 constructor added addStudent with state:',this.state.student);
    };
    render()  { 
      return (
          <div>
		    <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h7" color="inherit">
                  { 'Student '+JSON.stringify(this.props.location)+ ' ' +JSON.stringify(this.props.location.student) }
                </Typography>
            </Toolbar>
          </AppBar>
          <div className="App">
            <div style={{width:'100%'}}>
                For DEBUG:  display state.
                {JSON.stringify(this.state)}
            </div>			
            <AddStudentButton />
			<ToastContainer />
          </div>
          </div>
      ); 
    }
}
// required property:  addStudent is a function to call to perform the Add action
AddStudent.propTypes = {
  //addStudent : PropTypes.func.isRequired
  //it's what's passed in, not what it has here
  
}
export default AddStudent;