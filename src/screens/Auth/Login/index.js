import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import { compose } from 'recompose';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

const LoginPage = ({classes, handleChange}) => (
			<div className={classes.root}>
				<TextField
					id="username"
					name="username"
					type="text"
					label="Username"
					fullWidth
					margin="normal"
					value={this.props.username}
					onChange={handleChange('username')}
				/>
				<TextField
					id="password"
					name="password"
					type="password"
					label="Password"
					fullWidth
					margin="normal"
					value={this.props.password}
					onChange={handleChange('password')}
				/>
			</div>
    );

LoginPage.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginPage);