import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { runInThisContext } from 'vm';

const drawerWidth = 256;
const menuItems = {
	new: 	{text: 'Create New', icon: 'plus'},
	all: 	{text: 'All', icon: 'cloud-meatball', queryText: '%'},
	saved: {text: 'Saved', icon: 'save', queryText: 'saved'},
	scheduled: {text: 'Scheduled', icon: ['far', 'clock'], queryText: 'scheduled'},
	available: {text: 'Available', icon: 'share', queryText: 'available'},
	closed: {text: 'Closed', icon: 'archive', queryText: 'closed%'},
}
const menuItemsOther = [
	menuItems.all,
	menuItems.scheduled,
	menuItems.available,
	menuItems.closed
]
const menuItemsOrg = [
	menuItems.all,
	menuItems.saved,
	menuItems.scheduled,
	menuItems.available,
	menuItems.closed
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

class DonorMenu extends Component {
	state = {
		selectedIndex: 0,
		params: { status: '%'},
	}

  handleOrgListItemClick = (event, index, item) => {
		this.setState({
			selectedIndex: index,
			params: {
				...this.state.params,
				status: item.queryText,
			}
		});
		this.props.dispatch({
			type: 'FETCH_ORG_ITEMS',
			payload: {
				...this.state.params,
				status: item.queryText,
			},
		})
	};

	componentDidMount() {
		const { params } = this.state;
		this.props.dispatch({
			type: 'FETCH_ORG_ITEMS',
			payload: {
				...params,
				status: params.status,
			},
		})
	}
	
	NewButton = () => {
		const { classes } = this.props;
		return (
			<div>
				<Typography align='center' className={classes.content}>
					<Button variant="contained" color="secondary">Create New</Button>
				</Typography>
				<Divider />
			</div>			
		)
	}

	render() {
		const { classes, loc_type } = this.props;
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
					{loc_type === 'donor' ? <this.NewButton /> : null}
					<List>
						<ListItem button>
							<ListItemText primary={'Our Donations'} />
						</ListItem>
						{menuItemsOrg.map((item, index) => (
							<ListItem
								button
								key={index}
								selected={this.state.selectedIndex === index}
								onClick={event => this.handleOrgListItemClick(event, index, item)}
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
							<ListItemText primary={'Other Donations'} />
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

DonorMenu.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	loc_type: state.auth.user.loc_type,
	state: state,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(DonorMenu);