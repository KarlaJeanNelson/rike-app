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
	}
});


const LoginForm = props => {
	const { classes, handleChange } = props;
	return (
		<div className={classes.root}>
			<TextField
				id="login-username"
				name="username"
				type="text"
				label="Username"
				fullWidth
				margin="normal"
				value={props.username}
				onChange={handleChange('username')}
			/>
			<TextField
				id="login-password"
				name="password"
				type="password"
				label="Password"
				fullWidth
				margin="normal"
				value={props.password}
				onChange={handleChange('password')}
			/>
		</div>
	);
}

LoginForm.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginForm);