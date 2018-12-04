import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 256;
const menuItems = {
	new: 	{text: 'Create New', icon: 'plus'},
	all: 	{text: 'All', icon: 'cloud-meatball', queryField: '', queryText: ''},
	saved: {text: 'Saved', icon: 'save', queryField: 'status', queryText: 'saved'},
	scheduled: {text: 'Scheduled', icon: ['far', 'clock'], queryField: 'status', queryText: 'scheduled'},
	available: {text: 'Available', icon: 'share', queryField: 'status', queryText: 'available'},
	closed: {text: 'Closed', icon: 'archive', queryField: 'status', queryText: 'closed'},
}

const menuItemsOther = [
	// menuItems.all,
	menuItems.scheduled,
	menuItems.available,
	menuItems.closed,
]

const menuItemsDonor = [
	// menuItems.all,
	menuItems.saved,
	menuItems.scheduled,
	menuItems.available,
	menuItems.closed,
]

const menuItemsRescuer = [
	// menuItems.all,
	menuItems.scheduled,
	menuItems.closed,
]

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
		width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
		width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
});

class UserMenu extends Component {
	state = {
		selectedIndex: 0,
	}

	menuItemsOrg = () => {
		const { user } = this.props;
		switch (user.loc_type) {
			case 'donor':				
				return menuItemsDonor;
			case 'rescuer':
				return menuItemsRescuer;
			default:
				return null;
		}
	}

  handleOrgListItemClick = (event, index, item) => {
		event.preventDefault();
		this.setState({
			selectedIndex: index,
		});

		const { user } = this.props;
		this.props.dispatch({
			type: 'FETCH_ORG_ITEMS',
			id: user.loc_id,
			payload: {
				[item.queryField]: item.queryText,
			},
		})
	};

	getAvailable = event => {
		event.preventDefault();
		this.setState({
			selectedIndex: '',
		})
		this.props.dispatch({
			type: 'FETCH_ITEMS',
			payload: {
				status: 'available',
			}
		})
	}

	handleNew = event => {
		this.setState({
			selectedIndex: '',
		})
		this.props.dispatch({
			type: 'RENDER_USER_HOME',
			payload: 'NewItem',
		})
	}
	
	NewButton = () => {
		const { classes } = this.props;
		return (
			<div>
				<Typography align='center' className={classes.content}>
					<Button 
						variant="contained"
						color="secondary"
						onClick={this.handleNew}
					>
						Create New
					</Button>
				</Typography>
				<Divider />
			</div>			
		)
	};

	BrowseButton = () => {
		const { classes } = this.props;
		return (
			<div>
				<Typography align='center' className={classes.content}>
					<Button 
						variant="contained"
						color="secondary"
						onClick={this.getAvailable}
					>
						Browse Available
					</Button>
				</Typography>
				<Divider />
			</div>			
		)
	};

	componentDidMount() {
		const { user } = this.props;
			this.props.dispatch({
				type: 'FETCH_ORG_ITEMS',
				id: user.loc_id,
				payload: {},
			})		
	};

	render() {
		const { user, classes } = this.props;
		return (
			<div className={classes.root}>
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.toolbar} />
					{user.loc_type === 'donor' ? <this.NewButton /> : <this.BrowseButton />}
					<List>
						<ListItem button>
							<ListItemText primary={`My Org's Items`} />
						</ListItem>
						{this.menuItemsOrg().map((item, index) => (
							<ListItem
								button
								key={index}
								selected={this.state.selectedIndex === index}
								onClick={event => this.handleOrgListItemClick(event, index, item)}
								component={Link} to="/home"
							>
								<ListItemIcon>
									<FontAwesomeIcon icon={item.icon} fixedWidth size="lg" />
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						<ListItem button>
							<ListItemText primary={'Other Items'} />
						</ListItem>
						{menuItemsOther.map((item, index) => (
							<ListItem button key={index}>
								<ListItemIcon>
									<FontAwesomeIcon icon={item.icon} fixedWidth size="lg" />
								</ListItemIcon>
								<ListItemText primary={item.text} />
							</ListItem>
						))}
					</List>
				</Drawer>
			</div>
		);
	}
}

UserMenu.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user,
	state: state,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(UserMenu);