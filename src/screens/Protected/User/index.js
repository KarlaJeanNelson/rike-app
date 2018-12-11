import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withWidth, Hidden } from '@material-ui/core/';

import UserMenu from './Menu';
import MobileMenu from './MobileMenu';
import ItemList from '../Items/List';
import NewItem from '../Items/New';
import MobileListHeader from '../Items/MobileListHeader'

const styles = theme => ({
  root: {
		display: 'flex',
		flexGrow: 1,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		},
	},
  toolbar: theme.mixins.toolbar,
});

// TODO: use index to manage state.
const UserHome = (props) => {
		const { classes, history, item } = props;
		return (
			<div className={classes.root}>
				<Hidden smDown>
					<UserMenu history={history}/>
					<div className={classes.toolbar} />
				</Hidden>
				<Hidden mdUp>
					<MobileListHeader />
				</Hidden>
				<main className={classes.root}>
					{item.renderScreen.view === 'NewItem' ? <NewItem /> : <ItemList /> }
				</main>
				<Hidden mdUp>
					<MobileMenu />
					<div className={classes.toolbar} />
				</Hidden>
			</div>
		)
	
}

UserHome.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ 
	item: state.item,
 });

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
	withWidth()
)(UserHome);