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
toast.configure();

// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {
			selected: SEMESTER_LIST.length-1
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
				<AddStudentButton />
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

}
export default Semester;