import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

import { menuItemsDonor, menuItemsRescuer } from './MenuItems';

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

const menuItemsOrg = {
	donor: menuItemsDonor,	
	rescuer: menuItemsRescuer
}

const NewButton = props => {
	const { classes, newItem } = props;
	return (
		<div>
			<Typography align='center' className={classes.content}>
				<Button 
					variant="contained"
					color="secondary"
					onClick={event => newItem(event)}
				>
					Create New
				</Button>
			</Typography>
		</div>
	)
};

const BrowseButton = props => {
	const { classes, getAvailable } = props;
	// console.log(props)
	return (
		<div>
			<Typography align='center' className={classes.content}>
				<Button 
					variant="contained"
					color="secondary"
					onClick={event => getAvailable(event)}
				>
					Browse Available
				</Button>
			</Typography>
		</div>			
	)
};

// TODO: refactor to reuse code for menu items (org vs all).
const UserMenu = props => {	
	const { locType, classes, getAvailable, selectedMenuItem, menuItemClick, newItem } = props;
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
				{locType === 'donor' ? <NewButton  classes={classes} newItem={newItem} />
				: <BrowseButton classes={classes} getAvailable={getAvailable} />}
				<Divider />
				<List>
					<ListItem button>
						<ListItemText primary={`My Org's Items`} />
					</ListItem>
					{menuItemsOrg[locType].map((item, index) => (
						<ListItem
							button
							key={index}
							selected={selectedMenuItem === index}
							onClick={event => menuItemClick(event, index, item)}
							component={Link} to="/user"
						>
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

UserMenu.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UserMenu);