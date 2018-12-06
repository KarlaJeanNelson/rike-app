import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MaskedInput from 'react-text-mask';
// import classNames from 'classnames';
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
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
		display: 'flex',
		alignItems: 'flex-start',
	},
	pickup: {
		display: 'flex',
		direction: 'column',
		justify: 'space-between',
		alignItems: 'stretch',
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
	test: {
		border: 'solid tomato 1px',
		background: 'powderblue',
	},
	test2: {
		border: 'solid lime 1px',
		background: 'yellow',
	},
  toolbar: theme.mixins.toolbar,
});

const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
			keepCharPositions={true}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const units = [
	{ id: 10, abbr: 'Kg' },
	{ id: 9, abbr: 'g' },
	{ id: 3, abbr: 'lb' },
]

const initialState = {
	qtyUnit: 3,
	expDate: null,
	pickupStart: null,
	pickupEnd: null,
	contactEmail: '',
	contactName: '',
	contactPhone: '',
	contactNotes: '',
	foodName: '',
	notes: '',
	numberPkgs: '',
	pkgDesc: '',
	pickupNotes: '',
	prepInstructions: '',
	qty: '',
	storageInstructions: ''
}

class NewItem extends Component {
	state = initialState;

	demoData = event => {
		// event.preventDefault();
		this.setState({
			expDate: moment().add(1, 'w').endOf('day'), // 1 week from today
			pickupStart: moment().startOf('d').add({days: 1, hours: 7}), // tomorrow 7:00 am
			pickupEnd: moment().startOf('d').add({days: 1, hours: 8}), // tomorrow 8:00 am
			foodName: 'Black beans',
			notes: 'Contains meat products. May contain allergens.',
			numberPkgs: '2',
			pkgDesc: '5-gal pails',
			pickupNotes: 'Please use the deliveries door.',
			prepInstructions: 'Preheat oven to 450F. Bake for 45 min.',
			qty: '20',
			qtyUnit: 10,
			storageInstructions: 'Keep refrigerated or frozen until use.',
		})
		this.currentUser();
	}

	currentUser = () => {
		const { user } = this.props;
		this.setState({
			contactName: user.full_name,
			contactPhone: user.user_phone,
			contactEmail: user.email,
		})
	}

  handleChange = propName => event => {
    this.setState({
      [propName]: event.target.value,
		});
	}

	setDate = propName => date => {
		let setToDate = new Date(date);
		console.log(setToDate);
		// For expiration date, set to end of day
		if (propName === 'expDate') {
			setToDate = moment(setToDate).endOf('d');
		}

		this.setState({
			[propName]: setToDate
		})
	}

	// TODO: error checking for blank form before saving to db.
	handleSubmit = status => event => {
		event.preventDefault();
		if (!this.state.foodName) {
			alert('Sorry, pal. Must give food a name before saving record.')
		} else {
			this.props.dispatch({
				type: 'CREATE_ITEM',
				payload: {
					status: status,
					itemData: this.state,
				}
			})
		}
	}

	componentDidMount() {
		const { user } = this.props;
		this.setState({
			createdById: user.id,
			locId: user.loc_id,
		})
	}

	// componentWillUnmount() {
	// 	this.props.dispatch({
	// 		type: 'SET_ITEM',
	// 		payload: this.state,
	// 	})
	// }

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<form onSubmit={this.handleSubmit('available')}>
						<Grid container spacing={16}>
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h4">New Donation</Typography>
								<div className={classes.grow} />
								<Button onClick={this.demoData} className={classes.Button}>Demo</Button>
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h5">General Information</Typography>
							</Grid>

							<Grid item xs={12} sm={9} className={classes.item}>
								<TextField
									id="newFoodName"
									name="foodName"
									label="Food name"
									type="text"
									fullWidth
									autoFocus
									required
									value={this.state.foodName}
									onChange={this.handleChange('foodName')}
								/>
							</Grid>
							<Grid item xs={12} sm={3} className={classes.item}>
								<DatePicker
									id="newExpDate"
									name="expDate"
									label="Use by date"
									placeholder="mm/dd/yyyy"
									fullWidth
									required
									allowKeyboardControl
									animateYearScrolling={false}
									disablePast
									format="MM/DD/YYYY"
									keyboard
									keyboardIcon={<EventIcon />}
									leftArrowIcon={<KeyboardArrowLeft />}
									rightArrowIcon={<KeyboardArrowRight />}
									showTodayButton
									minDateMessage="Whoa, time traveller! Try again."
									value={this.state.expDate}
									onChange={this.setDate('expDate')}
								/>
							</Grid>
							
							<Grid item xs={12} sm={3}>
								<Grid container spacing={0} alignItems="flex-end">
									<TextField
										id="newQty"
										name="qty"
										type="number"
										label="Quantity"
										required
										value={this.state.qty}
										onChange={this.handleChange('qty')}
										className={classes.grow}
									/>
									<TextField
										id="newQtyUnit"
										select
										name="qtyUnit"
										required
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
							</Grid>
							<Grid item xs={12} sm={9} className={classes.item}>
								<TextField
									id="newNumberPkgs"
									name="newNumberPkgs"
									label="Containers"
									type="number"
									placeholder="Number"
									required
									value={this.state.numberPkgs}
									onChange={this.handleChange('numberPkgs')}
								/>
								<TextField
									id="newPkgDesc"
									name="pkgDesc"
									label="Description"
									placeholder="E.g., five-gallon pails"
									type="text"
									required
									value={this.state.pkgDesc}
									onChange={this.handleChange('pkgDesc')}
									className={classes.grow}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<TextField
									id="newStorageInst"
									name="storageInst"
									type="text"
									label="Storage instructions"
									placeholder="E.g., must be refrigerated"
									fullWidth
									required
									value={this.state.storageInstructions}
									onChange={this.handleChange('storageInstructions')}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<TextField
									id="newPrepInst"
									name="prepInts"
									type="text"
									label="Preparation instructions"
									placeholder="E.g., heat at 350&#176;F for 35 min"
									fullWidth
									required
									value={this.state.prepInstructions}
									onChange={this.handleChange('prepInstructions')}
								/>
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<TextField
									id="newNotes"
									name="notes"
									type="text"
									label="Other notes or instructions"
									placeholder="E.g., allergen information, special diet suitability, etc."
									fullWidth
									value={this.state.notes}
									onChange={this.handleChange('notes')}
								/>
							</Grid>

							<Grid item xs={12} />
							<Grid item xs={12} className={classes.item}>
								<Typography variant="h5">pickup information</Typography>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<DateTimePicker
									id="newPickupStart"
									name="pickupDate"
									label="Pickup window start"
									placeholder="mm/dd/yyyy h:mm AM/PM"
									fullWidth
									required
									allowKeyboardControl
									animateYearScrolling={false}
									ampm
									autoOk
									disablePast
									format="ddd MM/DD/YYYY h:mm A"
									keyboard
									keyboardIcon={<ScheduleIcon />}
									leftArrowIcon={<KeyboardArrowLeft />}
									rightArrowIcon={<KeyboardArrowRight />}
									showTodayButton
									maxDate={this.state.pickupEnd}
									maxDateMessage="Start time must be before end time."
									value={this.state.pickupStart}
									onChange={this.setDate('pickupStart')}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.item}>
								<DateTimePicker
									id="newPickupEnd"
									name="pickupDate"
									label="Pickup window end"
									placeholder="mm/dd/yyyy h:mm AM/PM"
									fullWidth
									required
									animateYearScrolling={false}
									ampm
									disablePast
									format="ddd MM/DD/YYYY h:mm A"
									keyboard
									keyboardIcon={<ScheduleIcon />}
									leftArrowIcon={<KeyboardArrowLeft />}
									rightArrowIcon={<KeyboardArrowRight />}
									showTodayButton
									minDate={this.state.pickupStart}
									minDateMessage="End time must be after start time."
									maxDate={this.state.expDate}
									maxDateMessage="End time must be before expiration date."
									value={this.state.pickupEnd}
									onChange={this.setDate('pickupEnd')}
								/>
							</Grid>
							<Grid item xs={12} className={classes.item}>
								<TextField
									id="newPickupNotes"
									name="notes"
									label="Pickup notes"
									type="text"
									placeholder="E.g., come to the door in the alley behind the building."
									fullWidth
									multiline
									value={this.state.pickupNotes}
									onChange={this.handleChange('pickupNotes')}
								/>
							</Grid>

							<Grid item xs={12} />
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
									required
									value={this.state.contactName}
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
									required
									value={this.state.contactPhone}
									onChange={this.handleChange('contactPhone')}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<FontAwesomeIcon icon="blender-phone" size="lg" className={classes.grey} />
											</InputAdornment>
										),
										inputComponent: TextMaskCustom,
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
									required
									value={this.state.contactEmail}
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
									placeholder="E.g., responds fastest to text messages"
									fullWidth
									value={this.state.contactNotes}
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
										type="submit"
										variant="contained"
										color="secondary"
										className={classes.button}
									>
										<FontAwesomeIcon icon="paper-plane" size="lg" className={classes.leftIcon}/>
										submit
									</Button>
									<Button
										variant="contained"
										className={classes.button}
										onClick={this.handleSubmit('saved')}
									>
										<FontAwesomeIcon icon="save" size="lg" className={classes.leftIcon}/>
										save
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
	user: state.auth.user,
	item: state.item
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(NewItem);