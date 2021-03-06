import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Todolist from './components/Todolist';
import Navigator from './components/Navigator';
import { firebaseAuth } from './config';

//gets information if user is authenticated to open a page/component
//if not, blocks and redirects to login page
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
  )} />
)

class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      user: null, isAuthenticated: false
    }
  }

  //should get info if user is authenticated or not
  //and change the state accordingly
  //(not working properly)
  componentDidMount() {
    firebaseAuth().onAuthStateChanged((user) => {
      console.log(this.state.user, "user");
      if (user && user.emailVerified) {
        this.setState({ user: user, isAuthenticated: true });
      }
      else {
        this.setState({ user: null, isAuthenticated: false });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator isAuthenticated={this.state.isAuthenticated} />
            <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Todolist} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;