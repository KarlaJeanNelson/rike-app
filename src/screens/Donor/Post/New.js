import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DatePicker, DateTimePicker } from 'material-ui-pickers';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
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
		minWidth: 120,
		marginLeft: theme.spacing.unit * 2,	
	},
	leftIcon: {
    marginRight: theme.spacing.unit,
	},
	grey: {
		color: theme.palette.grey[600],
	},
  toolbar: theme.mixins.toolbar,
});

const units = [
	{ id: 10, abbr: 'Kg' },
	{ id: 9, abbr: 'g' },
	{ id: 3, abbr: 'lb' },
]

class NewItem extends Component {
	state = {
		qtyUnit: 3,
		expDate: moment().add(1, 'w').endOf('day'),
		pickupStart: moment().startOf('d').add(1, 'd'),
		pickupEnd: moment().endOf('d').add(1, 'd'),
	}

  handleChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
		});
	}

	setDate = propName => date => {
		let setToDate = date;
		console.log(date);
		// For expiration date, set to end of day
		if (propName === 'expDate') {
			setToDate = moment(setToDate).endOf('d');
		}

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

	componentWillUnmount() {
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

							<Grid item xs={12} sm={9} className={classes.item}>
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
							<Grid item xs={12} sm={3} className={classes.item}>
								<DatePicker
									label="Use by date"
									id="newExpDate"
									name="expDate"
									fullWidth
									allowKeyboardControl
									disablePast
									format="MM/DD/YYYY"
										showTodayButton
									minDateMessage="Whoa, time traveller! Try again."
									value={this.state.expDate}
									onChange={this.setDate('expDate')}
								/>
							</Grid>
							<Grid item xs={12} sm={3} className={classes.item}>
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
							<Grid item xs={12} sm={9} className={classes.item}>
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
								<Typography variant="h5">pickup information</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3} className={classes.item}>
								<DateTimePicker
									label="Pickup window start"
									id="newPickupStart"
									name="pickupDate"
									fullWidth
									ampm
									allowKeyboardControl
									autoOk
									disablePast
									showTodayButton
									maxDate={this.state.pickupEnd}
									maxDateMessage="Start time must be before end time."
									value={this.state.pickupStart}
									onChange={this.setDate('pickupStart')}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3} className={classes.item}>
								<DateTimePicker
									label="Pickup window end"
									id="newPickupEnd"
									name="pickupDate"
									fullWidth
									ampm
									allowKeyboardControl
									autoOk
									disablePast
									showTodayButton
									minDate={this.state.pickupStart}
									minDateMessage="End time must be after start time."
									maxDate={this.state.expDate}
									maxDateMessage="End time must be before expiration date."
									value={this.state.pickupEnd}
									onChange={this.setDate('pickupEnd')}
								/>
							</Grid>
							<Grid item className={classNames(classes.item, classes.grow)}>
								<TextField
									id="newPickupNotes"
									name="notes"
									type="text"
									label="Pickup instructions"
									placeholder="E.g., come to the door in the alley behind the building."
									fullWidth
									onChange={this.handleChange('pickup_notes')}
								/>
							</Grid>

							<Grid item xs={12} className={classes.item}>
								<Typography variant="h5">contact information</Typography>
							</Grid>
							<Grid item xs={12} sm={6} md={4} className={classes.item}>
								<TextField
									id="newContactName"
									name="contactName"
									type="text"
									label="Name"
									fullWidth
									onChange={this.handleChange('contactName')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FontAwesomeIcon icon="user-circle" size="lg" className={classes.grey} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4} className={classes.item}>
								<TextField
									id="newContactPhone"
									name="contactPhone"
									type="text"
									label="Phone"
									fullWidth
									onChange={this.handleChange('contactPhone')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FontAwesomeIcon icon="blender-phone" size="lg" className={classes.grey} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={4} className={classes.item}>
								<TextField
									id="newContactEmail"
									name="contactEmail"
									type="text"
									label="E-mail"
									fullWidth
									onChange={this.handleChange('contactEmail')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FontAwesomeIcon icon="at" size="lg" className={classes.grey} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6} md={12} className={classes.item}>
								<TextField
									id="newContactNotes"
									name="contactNotes"
									type="text"
									label="Notes"
									placeholder="E.g., responds fastest to text message."
									fullWidth
									onChange={this.handleChange('contactNotes')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FontAwesomeIcon icon="sticky-note" size="lg" className={classes.grey} />
											</InputAdornment>
										),
									}}
								/>
							</Grid>

							<Grid item xs={12} className={classes.item}>
								<div className={classes.grow} />
								<Typography align="right" className={classes.spacing}>
									<Button
										variant="contained"
										className={classes.button}
									>
										<FontAwesomeIcon icon="save" size="lg" className={classes.leftIcon}/>
										save
									</Button>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										className={classes.button}
									>
										<FontAwesomeIcon icon="paper-plane" size="lg" className={classes.leftIcon}/>
										submit
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

NewItem.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	state
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(NewItem);