import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ToolbarSpacer from '../../components/UI/ToolbarSpacer';

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: '100vh',
	},
	hero: {
		height: '100%',
		background: theme.palette.grey[900],
		margin: 0,
	},
	title: {
		fontSize: theme.typography.fontSize * 10,
	}
})

const HomePage = props => {
	const { classes } = props;
	return (
  <div className={classes.root}>
		<ToolbarSpacer />
		<Grid container spacing={16} className={classes.hero} justify="center" alignItems="center">
			<Grid item></Grid>
			<Typography variant="h1" className={classes.title}>
				Home
			</Typography>
		</Grid>
  </div>
	)
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomePage);