import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Hidden, withWidth } from '@material-ui/core';

import UserMenu from './Menu';
import NewItem from './Post/New';
import BasicData from './Post/Basic';
import PickupOptions from './Post/Pickup';

const styles = theme => ({
  root: {
		display: 'flex',
    flexGrow: 1,
	},
  toolbar: theme.mixins.toolbar,
});

class DonorHome extends Component {

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Hidden smDown>
					<UserMenu />
				</Hidden>
				<div className={classes.toolbar} />
				<main>
					<NewItem />
				</main>
			</div>
		)
	}
}

DonorHome.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default compose(
	withStyles(styles),
	withWidth(),
)(DonorHome);