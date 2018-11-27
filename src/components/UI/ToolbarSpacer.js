import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

const ToolbarSpacer = props => {
	const { classes } = props;
	return (
		<div className={classes.toolbar} />
	)
}

ToolbarSpacer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarSpacer);
