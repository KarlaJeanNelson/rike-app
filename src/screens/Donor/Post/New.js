import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

const NewItem = props => {
		const { classes, handleChange } = props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<form>
						<Grid container spacing={16}>
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h4" className={classes.spacing}>{'NEW DONATION'}</Typography>
							</Grid>
							<Grid item xs={12} sm={8} className={classes.item}>
								<TextField
									id="newFoodName"
									name="foodName"
									label="Food name"
									InputLabelProps={{
										shrink: true,
									}}
									type="text"
									fullWidth
									autoFocus
									value={props.food_name}
									onChange={handleChange('food_name')}
								/>
							</Grid>
							<Grid item xs={12} sm={4} className={classes.item}>
								<TextField
									id="newExpDate"
									type="date"
									label="Use by date"
									InputLabelProps={{
										shrink: true,
									}}
									fullWidth
									value={props.exp_date}
									onChange={handleChange('exp_date')}
								/>
							</Grid>
							<Grid item xs={12} sm={4} className={classes.item}>
								<TextField
									id="newQty"
									name="qty"
									type="number"
									label="Quantity"
									InputLabelProps={{
										shrink: true,
									}}
									value={props.qty}
									onChange={handleChange('qty')}
									className={classes.grow}
								/>
								<TextField
									id="newQtyUnit"
									select
									name="qtyUnit"
									value={props.qtyUnit}
									onChange={handleChange('qtyUnit')}
								>
									{units.map(option => (
										<MenuItem key={option.id} value={option.id}>
											{option.abbr}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={8} className={classes.item}>
								<TextField
									id="newNumberPkgs"
									name="newNumberPkgs"
									label="Containers"
									InputLabelProps={{
										shrink: true,
									}}
									type="number"
									value={props.number_pkgs}
									onChange={handleChange('number_pkgs')}
									placeholder="Number"
								/>
								<TextField
									id="newPkgDesc"
									name="pkgDesc"
									label="Description"
									type="text"
									value={props.email}
									onChange={handleChange('email')}
									className={classes.grow}
									placeholder="E.g., five-gallon pails"
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<TextField
									id="newStorageInst"
									name="storageInst"
									type="text"
									label="Storage instructions"
									fullWidth
									value={props.storage_instructions}
									onChange={handleChange('storage_instructions')}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<TextField
									id="newPrepInst"
									name="prepInts"
									type="text"
									label="Preparation instructions"
									fullWidth
									value={props.prep_instructions}
									onChange={handleChange('prep_instructions')}
								/>
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<TextField
									id="newNotes"
									name="notes"
									type="text"
									label="Other notes or instructions"
									fullWidth
									value={props.notes}
									onChange={handleChange('notes')}
								/>
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

NewItem.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NewItem);