import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {connect} from 'react-redux';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import 'typeface-karla';
import 'typeface-biorhyme';
import theme from './theme';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserSlash, faStroopwafel } from '@fortawesome/free-solid-svg-icons'

import TopNav from '../UI/TopNav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Home from '../../screens/Public/Home/Home';
import About from '../../screens/Public/About/About';
import Contact from '../../screens/Public/Contact/Contact';
import UserHome from '../../screens/User/Home';
import DonorHome from '../../screens/Donor/Home';

library.add(faUser, faUserSlash, faStroopwafel)

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
  }

  render() {
    return (
      <Router>
				<MuiThemeProvider theme={theme}>
					<CssBaseline />
					<TopNav />
					<Switch>
						{/* Visiting localhost:3000 will redirect to localhost:3000/home */}
						{/* <Redirect exact from="/" to="/home" /> */}
						{/* Visiting localhost:3000/home will show the home page.
						This is a route anyone can see, no login necessary */}
						<Route
							exact
							path="/"
							component={DonorHome}
						/>
						<Route
							exact
							path="/about"
							component={About}
						/>
						<Route
							exact
							path="/contact"
							component={Contact}
						/>
						{/* For protected routes, the view could show one of several things on the same route.
						Visiting localhost:3000/home will show the UserHome if the user is logged in.
						If the user is not logged in, the ProtectedRoute will show the homepage.
						Even though it seems like they are different pages, the user is always on localhost:3000/home */}
						<ProtectedRoute
							exact
							path="/home"
							component={UserHome}
						/>
						{/* If none of the other routes matched, we will show a 404. */}
						<Route render={() => <Redirect to="/" />} />
					</Switch>
				</MuiThemeProvider>
      </Router>
  )}
}

export default connect()(App);
