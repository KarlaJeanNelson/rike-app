import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

class NewPost extends Component {
  state = {};

  handleChange = event => {
    this.setState({
      [propertyName]: event.target.value,
    });
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log(`in handleSubmit`);
	}

	clearState = () => {
		this.setState({});
	}

  render() {
		const { classes } = this.props;
    return (
			<div className={classes.root}>			
				<Paper className={classes.paper}>
					<form onSubmit={() => this.handleSubmit()}>
					</form>
				</Paper>
			</div>
    );
  }
}

NewPost.propTypes = {
	classes: PropTypes.object.isRequired,
}

// Name what we want from state so that we can use shorthand to get these values.
const mapStateToProps = state => ({ state });

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(NewPost);