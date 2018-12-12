import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

const DonorCardActions = props => {
	const { classes, item, closeItem } = props;
	return (
		<CardActions className={classes.actions}>
			<Button className={classes.button} size="small">Edit</Button>
			<Button className={classes.button} size="small">Cancel</Button>
			<div className={classes.grow} />
			<Button className={classes.button} size="small" onClick={(event) => closeItem(event, item)}>Complete</Button>
		</CardActions>
	)
}

const BrowserCardActions = props => {
	const { classes, item, rescueItem, closeItem } = props;
	return (
		<CardActions className={classes.actions}>
			<div className={classes.grow} />
			{item.status==='available' ?
				<Button className={classes.button} size="small" onClick={(event)=>rescueItem(event, item)}>Rescue</Button>
				: item.status==='scheduled' ?
				<Button className={classes.button} size="small" onClick={(event) => closeItem(event, item)}>Complete</Button>
				: <Button className={classes.button} size="small">View</Button>}
		</CardActions>
	)
}

const ItemList = props => {
	// console.log(`ItemList props`, props)
	const { classes, itemList, user } = props;
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
							{user.loc_type === 'donor' ? <DonorCardActions item={item} {...props}/>
								: user.loc_type === 'rescuer' ?
								<BrowserCardActions item={item} {...props}/>
								: null}
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

ItemList.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItemList);