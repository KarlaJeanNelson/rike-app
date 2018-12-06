import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		flexGrow: 1,
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
	button: {
		marginLeft: 8,
		minWidth: 100,		
	},
	textField: {

	},
})

const RegisterForm = props => {
	const { classes, handleChange } = props;
	return (
		<div className={classes.root}>
			<TextField
				id="register-username"
				name="username"
				type="text"
				label="Username"
				fullWidth
				autoFocus
				margin="normal"
				value={props.username}
				onChange={handleChange('username')}
				className={classes.textField}
			/>
			<TextField
				id="register-password"
				name="password"
				type="password"
				label="Password"
				fullWidth
				margin="normal"
				helperText="Password must be at least eight characters"
				value={props.password}
				onChange={handleChange('password')}
				className={classes.textField}
			/>
			<TextField
				id="register-password2"
				name="password2"
				type="password"
				label="Retype password"
				fullWidth
				margin="normal"
				value={props.password2}
				onChange={handleChange('password2')}
				className={classes.textField}
			/>
			<TextField
				id="register-firstname"
				name="firstname"
				type="text"
				label="First name"
				fullWidth
				margin="normal"
				value={props.firstname}
				onChange={handleChange('firstname')}
				className={classes.textField}
			/>
			<TextField
				id="register-lastname"
				name="lastname"
				type="text"
				label="Last name"
				fullWidth
				margin="normal"
				value={props.lastname}
				onChange={handleChange('lastname')}
				className={classes.textField}
			/>
			<TextField
				id="register-email"
				name="email"
				type="text"
				label="E-mail address"
				fullWidth
				margin="normal"
				value={props.email}
				onChange={handleChange('email')}
				className={classes.textField}
			/>
			<TextField
				id="register-phone"
				name="phone"
				type="text"
				label="Phone number"
				fullWidth
				margin="normal"
				value={props.phone}
				onChange={handleChange('phone')}
				className={classes.textField}
			/>
			<TextField
				id="register-location"
				name="location"
				type="text"
				label="Location code"
				fullWidth
				margin="normal"
				value={props.location}
				onChange={handleChange('location')}
				className={classes.textField}
			/>
		</div>
	);
}

RegisterForm.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(RegisterForm);
