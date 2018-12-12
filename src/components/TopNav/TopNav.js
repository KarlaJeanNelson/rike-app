import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import withWidth from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import MenuButton from '../UI/MenuButton';
import LogInButton from '../UI/LogInButton';
import UserNavButtons from './UserNavButtons';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1
	},
	appBar: {
		backgroundColor: 'black',
		zIndex: theme.zIndex.drawer + 1,
	},
	logo: {
		fontFamily: `'BioRhyme', sans-serif`,
		textDecoration: 'none',
		[theme.breakpoints.only('sm')]: {
			textAlign: 'center',
		},
		[theme.breakpoints.only('xs')]: {
			fontSize: '1.5rem',
		}
	},
})

const TopNav = props => {
	const { classes, user } = props;
	// console.log(props)
	return (
    <header className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
					<MenuButton {...props}/>
          <Typography
						color="inherit"
						variant="h4"
						className={classNames(classes.grow, classes.logo)}
						component={Link} to="/"
					>
							rike
          </Typography>
					<Hidden smDown>
						<Button component={Link} to="/" color="inherit">Home</Button>
						<Button component={Link} to="/about" color="inherit">About</Button>
						<Button component={Link} to="/contact" color="inherit">Contact</Button>
					</Hidden>
					{user.id ? <UserNavButtons /> : <LogInButton />}
        </Toolbar>
      </AppBar>
    </header>
  );
}

TopNav.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
	withWidth(),
)(TopNav);