import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	toolbar: theme.mixins.toolbar,
	fixed: {
		position: 'fixed',
		top: 0,
	}
});

const ToolbarSpacer = props => {
	const { classes } = props;
	return (
		<div className={classNames(classes.toolbar, classes.fixed)}/>
	)
}

ToolbarSpacer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarSpacer);
