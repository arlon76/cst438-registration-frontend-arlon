class Admin extends Component {
 
  render() {    
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Administrative Functions
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
				<AddStudentButton />
         </div>
      </div>
    )
  }
}
export default Admin;
