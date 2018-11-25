import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import RestaurantIcon from '@material-ui/icons/Restaurant';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1
	},
	bg: {
		backgroundColor: 'black',
	},
	logo: {
		fontFamily: `'BioRhyme', sans-serif`,
		textDecoration: 'none',
	},
})

const TopNav = props => {
	const { classes } = props;
	return (
    <header className={classes.root}>
      <AppBar position="sticky" className={classes.bg}>
        <Toolbar>
          <Typography
						color="inherit"
						variant="h4"
						className={classNames(classes.grow, classes.logo)}
						component={Link} to="/"
					>
							LOGO
          </Typography>
					<Button component={Link} to="/" color="inherit">Home</Button>
					<Button component={Link} to="/about" color="inherit">About</Button>
					<Button component={Link} to="/contact" color="inherit">Contact</Button>
					<IconButton component={Link} to="/home" color="inherit">
						<PersonIcon />
					</IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
}

TopNav.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles)
)(TopNav);