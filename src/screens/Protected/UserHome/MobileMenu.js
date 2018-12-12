import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '@material-ui/core/Paper';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core/'

import { menuItemsDonor, menuItemsRescuer } from './MenuItems';

const styles = theme => ({
  root: {
		flexGrow: 1,
		width: '100%',
		position: 'fixed',
		bottom: 0,
		background: '#b0e0e6'
	},
	icons: {
		minWidth: 0,
	},
  toolbar: theme.mixins.toolbar,
});

const menuItemsOrg = {
	donor: menuItemsDonor,	
	rescuer: menuItemsRescuer
}

// TODO: refactor to reuse code for menu items (org vs all).
const MobileMenu = props => {
	const { locType, classes, selectedMenuItem, menuItemClick } = props;
	return (
		<Paper square className={classes.root}>
			<BottomNavigation
				value={selectedMenuItem}
				fullWidth
				className={classes.root}
			>
				{menuItemsOrg[locType].map((item, index) => (
					<BottomNavigationAction
						key={index}
						className={classes.icons}
						onClick={event => menuItemClick(event, index, item)}
						component={Link} to="/user"
						label={item.text}
						icon={<FontAwesomeIcon icon={item.icon} />}
					/>
				))}
			</BottomNavigation>
		</Paper>
	);
}

MobileMenu.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(MobileMenu);