import React from 'react';
import PropTypes from 'prop-types';
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
		zIndex: theme.zIndex.appBar - 1,
	},
  toolbar: theme.mixins.toolbar,
});

const NewButton = props => {
	const { classes, newItem } = props;
	return (
		<Fab 
			color="secondary"
			onClick={event => newItem(event)}
			className={classes.fab}
		>
			<FontAwesomeIcon icon="plus" />
		</Fab>
	)
};

const BrowseButton = props => {
	const { classes, getAvailable } = props;
	return (
		<Fab
			color="secondary"
			onClick={event => getAvailable(event)}
			className={classes.fab}
		>
			<FontAwesomeIcon icon="binoculars" size="2x" />
		</Fab>
	)
};

// TODO: stateless - can convert to const
const MobileListHeader = props => {
	const { classes, locType, newItem, getAvailable } = props;
	return (
		<div className={classes.root}>
			{locType === 'donor' ? <NewButton newItem={newItem} classes={classes} />
				: <BrowseButton getAvailable={getAvailable} classes={classes} />}
			<div className={classes.grow} />
		</div>
	);
}

MobileListHeader.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MobileListHeader);