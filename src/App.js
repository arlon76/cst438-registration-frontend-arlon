import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import AddStudent from './components/AddStudent';
import AddCourse from './components/AddCourse';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
           <Typography variant="h6" color="inherit">
            Course Registration
           </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
       <Switch>
        <Route exact path='/' component={Semester} />
        <Route path='/schedule' component={SchedList} />
        <Route path='/course' component={AddCourse} />
        <Route path='/student' component={AddStudent} />
       </Switch>
      </BrowserRouter>
    </div>
  );
  // return (
    // <div className="App">
       // <h2>Hello React World2!</h2>
      // </div>
  // );
}
export default App;
/*
import './App.css';
import * as React from 'react';

class App extends React.Component {

  render() {
    return (
      <div className="App">
       <h2>Hello React World!</h2>
      </div>
    )
  }
}

export default App;
*/