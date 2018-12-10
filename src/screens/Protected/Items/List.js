import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
		display: 'flex',
		flexGrow: 1,
		margin: 16,
	},
	grow: {
		flexGrow: 1,
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
	},
	icon: {
		color: theme.palette.grey[600],
	},
	actions: {
		display: 'flex',
	},
	button: {
		minWidth: 0,
	},
	test: {
		border: 'solid tomato 1px'
	},
  toolbar: theme.mixins.toolbar,
});

const icons = {
	saved: 'save',
	available: 'share',
	scheduled: 'clock',
	closed: 'archive'
}

class ItemList extends Component {
	state = {};

	rescueItem = (event, item) => {
		event.preventDefault();
		const { user } = this.props;
		// console.log(item);
		if (item.status === 'available') {
			this.props.dispatch({
				type: 'UPDATE_ITEM',
				next_screen: 'available',
				item_id: item.item_id,
				payload: {
					pickup_org_id: user.loc_id,
					status: 'scheduled',
					pickup_status: 'scheduled',
					pickup_created_by: user.id,
					// pickup_created_at: Date.now(),
				}
			})
		}
	}

	closeItem = (event, item) => {
		event.preventDefault();
		const { user } = this.props;
		if (item.status === 'scheduled') {
			this.props.dispatch({
				type: 'UPDATE_ITEM',
				next_screen: 'scheduled',
				item_id: item.item_id,
				payload: {
					status: 'closed',
					pickup_closed_by: user.id,
				}
			})
		}		
	}

	DonorCardActions = (props) => {
		const { classes } = this.props;
		return (
			<CardActions className={classes.actions}>
				<Button className={classes.button} size="small">Edit</Button>
				<Button className={classes.button} size="small">Cancel</Button>
				<div className={classes.grow} />
				<Button className={classes.button} size="small" onClick={(event) => this.closeItem(event, props.item)}>Complete</Button>
			</CardActions>
		)
	}

	BrowserCardActions = (props) => {
		const { classes } = this.props;
		return (
			<CardActions className={classes.actions}>
				<div className={classes.grow} />
				{props.item.status==='available' ?
					<Button className={classes.button} size="small" onClick={(event)=>this.rescueItem(event, props.item)}>Rescue</Button>
					: props.item.status==='scheduled' ?
					<Button className={classes.button} size="small" onClick={(event) => this.closeItem(event, props.item)}>Complete</Button>
					: <Button className={classes.button} size="small">View</Button>}
			</CardActions>
		)
	}

	render() {
		const { classes, itemList, user } = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={16} alignItems="stretch">
				{itemList === null || itemList.length === 0 ? null
				: itemList.map((item, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Card className={classes.card}>
							<CardHeader
								title={item.food_name}
								subheader={`${item.qty} ${item.abbr} in ${item.number_pkgs} \u00d7 ${item.pkg_desc}`}
								avatar={
									<Avatar className={classes.avatar}>
										<FontAwesomeIcon icon={icons[item.status]} />
									</Avatar>
								}
							/>
							<Divider />
							<CardContent className={classes.grow}>
								<Grid container spacing={8} direction="row">
									<Grid item>
										<Typography className={classes.icon}>
											<FontAwesomeIcon icon="info" size="lg" fixedWidth/>
										</Typography>
									</Grid>
									<Grid item xs>
										<Typography>{item.storage_instructions}</Typography>
										<Typography>{item.prep_instructions}</Typography>
										<Typography>{item.notes}</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={8} direction="row">
									<Grid item>
										<Typography className={classes.icon}>
											<FontAwesomeIcon icon="utensils" size="lg" fixedWidth />
										</Typography>
									</Grid>
									<Grid item xs>
										<Typography>{item.loc_name}</Typography>
										<Typography>{item.address1}</Typography>
										<Typography>{item.address2}</Typography>
										<Typography>{item.city}, {item.state} {item.zip}</Typography>
										<Typography>{item.loc_phone}</Typography>
										<Typography>{item.website}</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={8} direction="row">
									<Grid item>
										<Typography className={classes.icon}>
											<FontAwesomeIcon icon="clock" size="lg" fixedWidth />
										</Typography>
									</Grid>
									<Grid item xs>
										<Typography>
											{moment(item.pickup_start).format('MM/DD h:mm A')} - {moment(item.pickup_end).format('MM/DD h:mm A')}
										</Typography>
										<Typography>{item.pickup_notes}</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={8} direction="row">
									<Grid item>
										<Typography className={classes.icon}>
											<FontAwesomeIcon icon="question" size="lg" fixedWidth />
										</Typography>
									</Grid>
									<Grid item xs>
										<Typography>{item.contact_name}</Typography>
										<Typography>{item.contact_phone}</Typography>
										<Typography>{item.contact_email}</Typography>
										<Typography>{item.contact_notes}</Typography>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							{user.loc_type === 'donor' ? <this.DonorCardActions item={item} />
								: user.loc_type === 'rescuer' ?
								<this.BrowserCardActions item={item} />
								: null}
						</Card>
					</Grid>
				))}
				</Grid>
			</div>
		);
	}
}

ItemList.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	itemList: state.item.data,
	user: state.auth.user,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(ItemList);