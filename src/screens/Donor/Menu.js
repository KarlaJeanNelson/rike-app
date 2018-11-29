import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 256;
const menuItemsAll = [
	{text: 'Scheduled', icon: ['far', 'clock']},
	{text: 'Available', icon: 'share'},
	{text: 'Closed', icon: 'archive'},
]
const menuItems = [
	{text: 'Create New', icon: 'plus'}, ...menuItemsAll
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

const UserMenu = props => {
  const { classes } = props;

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
        <List>
					<ListItem button>
						<ListItemText primary={'Our Donations'} />
					</ListItem>
          {menuItems.map((item, index) => (
            <ListItem button key={index}>
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
						<ListItemText primary={'All Donations'} />
					</ListItem>
          {menuItemsAll.map((item, index) => (
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

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserMenu);