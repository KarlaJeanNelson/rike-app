import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AlertDialog from '../../components/UI/AlertDialog';
import Login from './Login';
import Register from './Register';

const styles = theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100vh',
		background: '#b0e0e6'
	},
	grow: {
		flexGrow: 1
	},
	paper: {
		margin: 16,
		padding: 24,
	},
	spacing: {
		margin: 0,
		padding: 0,
	},
	responsiveButtons: {
		[theme.breakpoints.up('sm')]: {
			textAlign: 'right',
		},
		[theme.breakpoints.only('xs')]: {
			textAlign: 'center',
		}
	},
	button: {
		marginLeft: 8,
		minWidth: 100,		
	}
});

const otherMode = mode => (mode === 'LOGIN' ? 'REGISTER' : 'LOGIN');
const getTitle = mode => (mode === 'LOGIN' ? 'LOGIN ERROR' : 'REGISTRATION ERROR');

class AuthPage extends Component {
  state = {
  	username: '',
  	password: '',
  	password2: '',
		// loc_id: this.props.match.params.loc_id,
		loc_uuid: '',
		contact_notes: '',
  };

  login = () => {
  	// event.preventDefault();
  	// console.log(`in login`, this.state);
  	if (this.state.username && this.state.password) {
  		this.props.dispatch({
  			type: 'LOGIN',
  			payload: {
  				username: this.state.username,
  				password: this.state.password,
  			},
  		});
  	} else {
  		this.props.dispatch({ type: 'AUTH_INPUT_ERROR' });
  	}
  } // end login
	
	// TODO: move username and password errors to blur for fields.
	registerUser = () => {
		// event.preventDefault();
		// Test username for special characters.
		if (/[^0-9A-Za-z]/.test(this.state.username)) {
			// console.log(this.state.username);
			this.props.dispatch({
				type: 'INVALID_USERNAME'
			});
		} else if (this.state.password.length < 8) {
			this.props.dispatch({
				type: 'PASSWORD_TOO_SHORT'
			});
		} else if (this.state.password !== this.state.password2) {
			this.props.dispatch({
				type: 'PASSWORD_MISMATCH'
			});
		} else if (this.state.username && this.state.password) {
			this.props.dispatch({
				type: 'REGISTER',
				payload: this.state,
			});
		} else {
			this.props.dispatch({
				type: 'AUTH_INPUT_ERROR'
			});
		}
	} // end registerUser
	
	handleClose = () => {
		this.props.dispatch({
			type: 'CLEAR_AUTH_ERRORS'
		});
	}

  handleChange = (propertyName) => (event) => {
  	this.setState({
  		[propertyName]: event.target.value
		});
	}

	handleOrgInput = event => {
		this.setState({
			orgInput: event.target.value
		})
	}

	handleSubmit = (mode) => (event) => {
		event.preventDefault();
		// console.log(`in handleSubmit`);
		return mode === 'LOGIN' ? this.login() : this.registerUser();
	}

	clearState = () => {
		this.setState({
			username: '',
			password: '',
			password2: '',
			loc_uuid: '',
			contact_notes: '',
		});
	}

	switchMode = (mode) => {
		this.props.dispatch({
			type: 'TOGGLE_MODE',
			payload: `SET_TO_${otherMode(mode)}_MODE`
		});
	}

	render() {
		const { classes, mode, message } = this.props;
		// console.log('message:', message, !!message);
		return (
			<div className={classes.root}>
				{ message ? <AlertDialog title={getTitle(mode)} message={message} handleClose={this.handleClose} open={!!message} /> : null }
				<Grid container spacing={16} className={classes.grow}>
					<Grid item sm={1} md={2} lg={3}></Grid>
					<Grid item xs={12} sm={10} md={8} lg={6} className={classes.grow}>
						<Paper className={classes.paper}>
							<form onSubmit={this.handleSubmit(mode)}>
								<Typography variant="h4" className={classes.spacing}>{mode}</Typography>
								{ mode === 'LOGIN' ? <Login handleChange={this.handleChange}/>
								: <Register handleChange={this.handleChange} loc_uuid={this.state.loc_uuid} />}
								<Typography className={classNames(classes.spacing, classes.responsiveButtons)}>
									<Button
										type="submit"
										variant="contained"
										className={classes.button}
									>
										{mode}
									</Button>
									<Button
										onClick={() => this.switchMode(mode)}
										className={classes.button}
									>
										{otherMode(mode)}
									</Button>
								</Typography>
							</form>
						</Paper>
					</Grid>
					<Grid item sm={1} md={2} lg={3}></Grid>
				</Grid>
			</div>
		);
	}
}

AuthPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	message: state.auth.errorMessage,
	mode: state.auth.loginMode,
	user: state.auth.user,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(AuthPage);