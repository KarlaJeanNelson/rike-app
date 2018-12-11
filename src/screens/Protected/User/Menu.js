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

import { menuItemsOther, menuItemsDonor, menuItemsRescuer } from './MenuItems';

const drawerWidth = 256;

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

// TODO: refactor to reuse code for menu items (org vs all).
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
			selectedIndex: 0,
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
			selectedIndex: 0,
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
			</div>			
		)
	};

	BrowseButton = () => {
		const { classes } = this.props;
		return (
			<div>
				<Typography align='center' className={classes.content} >
					<Button 
						variant="contained"
						color="secondary"
						onClick={this.getAvailable}
					>
						Browse Available
					</Button>
				</Typography>
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
					{user.loc_type === 'donor' ? <this.NewButton />
					: <this.BrowseButton />}
					<Divider />
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
								component={Link} to="/user"
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
	withStyles(styles),
)(UserMenu);