import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Hidden, withWidth } from '@material-ui/core';

import DonorMenu from './Menu';
import NewItem from '../Items/New';
import ItemList from '../Items/List';

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
					<DonorMenu />
				</Hidden>
				<div className={classes.toolbar} />
				<main>
					<ItemList />
				</main>
			</div>
		)
	}
}

DonorHome.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ state });

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
	withWidth(),
)(DonorHome);