import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { FormGroup } from '@material-ui/core';

const styles = theme => ({
  root: {
		display: 'flex',
    flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	paper: {
		margin: 16,
		padding: 24,
		flexGrow: 1,
	},
	item: {
		// border: 'solid tomato 1px',
		// background: 'powderblue',
		display: 'flex',
		alignItems: 'flex-end',
	},
	spacing: {
		margin: 0,
		padding: 0,
	},
	button: {
		minWidth: 100,		
	},
  toolbar: theme.mixins.toolbar,
});

const units = [
	{ id: 10, abbr: 'Kg' },
	{ id: 9, abbr: 'g' },
	{ id: 3, abbr: 'lb' },
]

const PickupOptions = props => {
		const { classes, handleChange } = props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<form>
						<Grid container spacing={16}>
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h4" className={classes.spacing}>PICKUP TIMES</Typography>
							</Grid>
							
							<Grid item xs={12} className={classes.item}>
								<div className={classes.grow} />
								<Typography align="right" className={classes.spacing}>
									<Button
										type="submit"
										variant="contained"
										className={classes.button}
									>
										next
									</Button>
								</Typography>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</div>
		);
}

PickupOptions.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PickupOptions);