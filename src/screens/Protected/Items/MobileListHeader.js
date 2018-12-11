import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
		flexGrow: 1,
	},
	fab: {
		position: 'fixed',
		margin: theme.spacing.unit,
		zIndex: 100,
	},
  toolbar: theme.mixins.toolbar,
});

// TODO: stateless - can convert to const
class MobileListHeader extends Component {
	getAvailable = event => {
		this.props.dispatch({
			type: 'FETCH_ITEMS',
			payload: {
				status: 'available',
			}
		})
	}

	handleNew = event => {
		this.props.dispatch({
			type: 'RENDER_USER_HOME',
			payload: 'NewItem',
		})
	}
	
	NewButton = () => {
		const { classes } = this.props;
		return (
			<Fab 
				color="secondary"
				onClick={this.handleNew}
				className={classes.fab}
			>
				<FontAwesomeIcon icon="plus" />
			</Fab>
		)
	};

	BrowseButton = () => {
		const { classes } = this.props;
		return (
			<Fab
				color="secondary"
				onClick={this.getAvailable}
				className={classes.fab}
			>
				<FontAwesomeIcon icon="binoculars" size="2x" />
			</Fab>
		)
	};

	render() {
		const { user, classes } = this.props;
		return (
			<div className={classes.root}>
				{user.loc_type === 'donor' ? <this.NewButton />
					: <this.BrowseButton />}
				<div className={classes.grow} />
			</div>
		);
	}
}

MobileListHeader.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user,
	state: state,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(MobileListHeader);