import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Hidden, withWidth } from '@material-ui/core';

import UserMenu from './Menu';
import ItemList from '../Items/List';
import NewItem from '../Items/New';

const styles = theme => ({
  root: {
		display: 'flex',
    flexGrow: 1,
	},
  toolbar: theme.mixins.toolbar,
});

const UserHome = (props) => {
		const { classes, history, item } = props;
		return (
			<div className={classes.root}>
				<Hidden smDown>
					<UserMenu history={history}/>
				</Hidden>
				<div className={classes.toolbar} />
				<main className={classes.root}>
					{item.renderScreen.view === 'NewItem' ? <NewItem /> : <ItemList /> }
				</main>
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
	withWidth(),
)(UserHome);