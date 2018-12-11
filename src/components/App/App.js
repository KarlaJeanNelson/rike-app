import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import 'typeface-karla';
import 'typeface-biorhyme';
import 'typeface-raleway';
import theme from './theme';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faUser, faUserSlash, faHome, faBuilding, faCity, faPlus, faCloudMeatball, faShare, faArchive, faCalendar, faShareSquare, faPen, faTrash, faMapMarkerAlt, faAddressCard, faInfoCircle, faClock, faQuestionCircle, faCompass, faMap, faInfo, faQuestion, faUtensils, faPaperPlane, faSave, faUserCircle, faBlenderPhone, faAt, faStickyNote, faGhost, faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock, faSave as farSave } from '@fortawesome/free-regular-svg-icons';

import TopNav from '../TopNav/TopNav';
import ToolbarSpacer from '../UI/ToolbarSpacer';
import ProtectedRoute from './ProtectedRoute';
import Home from '../../screens/Public/Home';
import About from '../../screens/Public/About';
import Contact from '../../screens/Public/Contact';
import UserHome from '../../screens/Protected/User/index';

library.add(faBars, faUser, faUserSlash, faHome, faBuilding, faCity, faPlus, faShare, faArchive, farClock, farSave, faSave, faPaperPlane, faUserCircle, faBlenderPhone, faAt, faStickyNote, faCalendar, faCloudMeatball, faShareSquare, faPen, faTrash, faMapMarkerAlt, faAddressCard, faInfoCircle, faClock, faQuestionCircle, faCompass, faMap, faInfo, faQuestion, faUtensils, faGhost, faBinoculars);

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
					<ToolbarSpacer />
					<Switch>
						{/* These are routes anyone can see, no login necessary */}
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
						<Route path="/contact" component={Contact} />

						{/* For protected routes, the view could show one of several things on the same route.
						Visiting localhost:3000/user will show the UserHome if the user is logged in.
						If the user is not logged in, the ProtectedRoute will show the login screen.
						Even though it seems like they are different pages, the user is always on localhost:3000/user */}
						<ProtectedRoute path="/user" component={UserHome} />
						{/* <ProtectedRoute path="/user/:loc_uuid" component={UserHome} /> */}
						{/* If none of the other routes match, we will be redirect to the splash page. */}
						<Route render={() => <Redirect to="/" />} />
					</Switch>
				</MuiThemeProvider>
			</Router>
		);}
}

export default connect()(App);
