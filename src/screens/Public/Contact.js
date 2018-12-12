import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: '100vh',
	},
	hero: {
		height: '100vh',
		background: theme.palette.grey[900],
		position: 'fixed',
		top: theme.spacing.unit,
	},
	title: {
		[theme.breakpoints.up('md')]: {
      fontSize: theme.typography.fontSize * 10,
    },
	},
	toolbar: theme.mixins.toolbar,
});

const ContactPage = props => {
	const { classes } = props;
	// console.log(props)
	return (
		<div className={classes.root}>
			<div className={classes.toolbar} />
			<Grid container spacing={16} className={classes.hero} justify="center" alignItems="center">
				<Typography variant="h1" className={classes.title}>
				Contact
				</Typography>
			</Grid>
		</div>
	);
};

ContactPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactPage);