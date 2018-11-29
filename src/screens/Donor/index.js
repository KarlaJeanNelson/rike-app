import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Hidden, withWidth } from '@material-ui/core';

import UserMenu from './Menu';
import NewPost from './Post/New';
import PickupOptions from './Post/Pickup';

const styles = theme => ({
  root: {
		display: 'flex',
    flexGrow: 1,
	},
  toolbar: theme.mixins.toolbar,
});

const units = [
	{ id: 10, abbr: 'Kg' },
	{ id: 9, abbr: 'g' },
	{ id: 3, abbr: 'lb' },
]

class DonorHome extends Component {
	state = {
		qtyUnit: 3,
	}

  handleChange = propName => event => {
		event.preventDefault();
    this.setState({
      [propName]: event.target.value,
		});
	}

	render() {
		const { classes } = this.props;
		const { qtyUnit } = this.state;
		return (
			<div className={classes.root}>
				<Hidden smDown>
					<UserMenu />
				</Hidden>
				<div className={classes.toolbar} />
				<PickupOptions />
				{/* <NewPost handleChange={this.handleChange} qtyUnit={qtyUnit}/> */}
			</div>
		);
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