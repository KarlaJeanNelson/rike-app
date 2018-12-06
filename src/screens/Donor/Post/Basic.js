import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

class BasicData extends Component {
	state = {
		qtyUnit: 3,
		expDate: new Date(),
	}

  handleChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
		});
	}

	setDate = propName => date => {
		let setToDate = new Date(date);
		this.setState({
			[propName]: setToDate
		})
	}

	handleSubmit = event => {
		event.preventDefault();
		this.props.dispatch({
			type: 'SET_ITEM_DATA',
			payload: this.state,
		})
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<form onSubmit={this.handleSubmit}>
						<Grid container spacing={16}>
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h4">New Donation</Typography>
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h5">General Information</Typography>
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
									onChange={this.handleChange('food_name')}
								/>
							</Grid>
							<Grid item xs={12} sm={4} className={classes.item}>
								<DatePicker
									label="Use by date"
									id="newExpDate"
									name="expDate"
									fullWidth
									allowKeyboardControl
									disablePast
									format="MM/DD/YYYY"
									mask={value =>
										value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
									}
									showTodayButton
									minDateMessage="Whoa, time traveller! Try again."
									value={this.state.expDate}
									onChange={this.setDate('expDate')}
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
									onChange={this.handleChange('qty')}
									className={classes.grow}
								/>
								<TextField
									id="newQtyUnit"
									select
									name="qtyUnit"
									value={this.state.qtyUnit}
									onChange={this.handleChange('qtyUnit')}
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
									onChange={this.handleChange('number_pkgs')}
									placeholder="Number"
								/>
								<TextField
									id="newPkgDesc"
									name="pkgDesc"
									label="Description"
									type="text"
									onChange={this.handleChange('email')}
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
									onChange={this.handleChange('storage_instructions')}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<TextField
									id="newPrepInst"
									name="prepInts"
									type="text"
									label="Preparation instructions"
									fullWidth
									onChange={this.handleChange('prep_instructions')}
								/>
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<TextField
									id="newNotes"
									name="notes"
									type="text"
									label="Other notes or instructions"
									fullWidth
									onChange={this.handleChange('notes')}
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
}

BasicData.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	state
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(BasicData);