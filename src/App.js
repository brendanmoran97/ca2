/**
 * @Date:   2019-10-21T10:56:08+01:00
 * @Last modified time: 2020-02-12T17:42:34+00:00
 */
import React, {Component} from 'react';
// import Characters from './components/characters';
// import Episodes from './components/episodes';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import Show from './components/shows';
import Episode from './components/episodes';
import ShowCreate from './pages/shows/Create';
import Review from './pages/shows/Review';
import ShowUpdate from './pages/shows/Update';
import EpisodeCreate from './pages/episodes/Create';
import EpisodeUpdate from './pages/episodes/Update';
import Brendan from './pages/brendanMoran';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import NavBar from './pages/nav';


// Put any other imports below so that CSS from your
// components takes precedence over default styles.

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null
    };
  }

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false : true
    }));


  }

  render() {

    const loggedIn = this.state.loggedIn;

    return (
    <BrowserRouter>
    <NavBar loggedIn = { loggedIn } onLogout = { this.authHandler }/>
        <Switch>
          <Route exact path = "/" component = {Home}/>
          <Route exact path = "/shows">
            {loggedIn ? (props) => <Show {...props} status={loggedIn}/> : <Show />}
          </Route>
          <Route exact path = "/shows/create">
            {loggedIn ? (props) => <ShowCreate {...props} /> : <Redirect to = "/login" />}
          </Route>
          <Route exact path = "/shows/update/:id">
            {loggedIn ? (props) => <ShowUpdate {...props} /> : <Redirect to = "/login" />}
          </Route>
          <Route exact path = "/episodes">
            {loggedIn ? (props) => <Episode {...props} status={loggedIn}/> : <Episode />}
          </Route>
          <Route exact path = "/episodes/create">
            {loggedIn ? (props) => <EpisodeCreate {...props} /> : <Redirect to = "/login" />}
          </Route>
          <Route exact path = "/episodes/update/:id">
            {loggedIn ? (props) => <EpisodeUpdate {...props} /> : <Redirect to = "/login" />}
          </Route>
          <Route exact path = "/brendanMoran" component = {Brendan}/>
          <Route exact path = "/shows/review/:id" component = {Review}/>
          <Route exact path = "/register" component = {Register}/>
          <Route exact path = "/login" component = {(props) => <Login {...props} onLogin = {this.authHandler} />}/>
        </Switch>
      </BrowserRouter>
    );
  }


  }

  export default App;
