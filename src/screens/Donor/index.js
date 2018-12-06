import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UserMenu from './Menu';

const styles = theme => ({
  root: {
		display: 'flex',
    flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
  drawer: {
    width: '100%',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '100%',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
});

class DonorHome extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={16}>

				</Grid>
			</div>
		);
	}
}

DonorHome.propTypes = {
	classes: PropTypes.object.isRequired,
}

// Name what we want from state so that we can use shorthand to get these values.
const mapStateToProps = state => ({ state });

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(DonorHome);