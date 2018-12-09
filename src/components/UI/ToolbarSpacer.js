import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	toolbar: {
		...theme.mixins.toolbar,
	},
	sticky: {
		position: 'sticky'
	},
	fixed: {
		position: 'fixed'
	}
});

const ToolbarSpacer = props => {
	const { classes } = props;
	return (
		<div className={classNames(classes.toolbar)}/>
	);
};

ToolbarSpacer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToolbarSpacer);
