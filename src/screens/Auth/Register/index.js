import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
})

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleChange = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
		const { classes, mode, message } = this.props;
		console.log(this.props);
    return (
			<Grid container spacing={16} className={classes.root}>
				<Grid item sm={1} md={2} lg={3}></Grid>
				<Grid item xs={12} sm={10} md={8} lg={6} className={classes.grow}>
					<Paper className={classes.paper}>
						<Typography variant="h4" className={classes.spacing}>{mode.toUpperCase()}</Typography>
						<form onSubmit={this.register}>
							<TextField
								id="username"
								name="username"
								type="text"
								label="Username"
								fullWidth
								margin="normal"
								value={this.state.username}
								onChange={this.handleChange('username')}
							/>
							<TextField
								id="password"
								name="password"
								type="password"
								label="Password"
								fullWidth
								margin="normal"
								value={this.state.password}
								onChange={this.handleChange('password')}
							/>
							<Typography align="right" className={classes.spacing}>
								<Button 
									type="submit"
									variant="contained"
									className={classNames(classes.button)}
								>
									REGISTER
								</Button>
								<Button
									onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
									className={classes.button}
								>
									register
								</Button>
							</Typography>
						</form>
					</Paper>
				</Grid>
				<Grid item sm={1} md={2} lg={3}></Grid>
			</Grid>
    );
  }
}

RegisterPage.propTypes = {
	classes: PropTypes.object.isRequired,
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
	mode: state.loginMode,
	message: state.messages.registrationMessage,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(RegisterPage);
