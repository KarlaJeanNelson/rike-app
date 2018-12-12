import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withWidth, Hidden } from '@material-ui/core/';
import grey from '@material-ui/core/colors/grey';

import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import ItemList from './ItemList';
import NewItem from './NewItem';
import MobileListHeader from './MobileListHeader'

const styles = theme => ({
  root: {
		display: 'flex',
		flexGrow: 1,
		minHeight: '100vh',
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column',
			background: grey[700],
		},
		[theme.breakpoints.up('md')]: {
			background: '#b0e0e6'
		}
	},
  toolbar: theme.mixins.toolbar,
});

// TODO: use index to manage state.
// TODO: update get api to include org filter
class UserHome extends Component {
	state = {
		selectedMenuItem: 0,
	}

	menuItemClick = (event, index, menuItem) => {
		event.preventDefault();
		this.setState({
			selectedMenuItem: index,
		});
		this.getOrgItems(menuItem);
	};

	getOrgItems = menuItem => {
		const { user } = this.props;
		this.props.dispatch({
			type: 'FETCH_ORG_ITEMS',
			id: user.loc_id,
			payload: {
				[menuItem.queryField]: menuItem.queryText,
			},
		})
	}

	getAvailable = event => {
		event.preventDefault();
		this.setState({
			selectedMenuItem: 0,
		})
		this.props.dispatch({
			type: 'FETCH_ITEMS',
			payload: {
				status: 'available',
			}
		})
	}

	newItem = event => {
		event.preventDefault();
		this.setState({
			selectedMenuItem: 0,
		})
		this.props.dispatch({
			type: 'RENDER_USER_HOME',
			payload: 'NewItem',
		})
	}

	rescueItem = (event, item) => {
		event.preventDefault();
		const { user } = this.props;
		// console.log(item);
		if (item.status === 'available') {
			this.props.dispatch({
				type: 'UPDATE_ITEM',
				next_screen: 'available',
				item_id: item.item_id,
				payload: {
					pickup_org_id: user.loc_id,
					status: 'scheduled',
					pickup_status: 'scheduled',
					pickup_created_by: user.id,
					// pickup_created_at: Date.now(),
				}
			})
		}
	}

	closeItem = (event, item) => {
		// event.preventDefault();
		// console.log(`in closeItem; item:`, item)
		const { user } = this.props;
		if (item.status === 'scheduled') {
			this.props.dispatch({
				type: 'UPDATE_ITEM',
				next_screen: 'scheduled',
				item_id: item.item_id,
				payload: {
					status: 'closed',
					pickup_closed_by: user.id,
				}
			})
		}		
	}

	componentDidMount() {
		const { selectedMenuItem } = this.state
		this.getOrgItems(selectedMenuItem)
	}

	render() {
		const { classes, item, user } = this.props;
		const { selectedMenuItem } = this.state;
		return (
			<div className={classes.root}>
				<Hidden smDown>
					<UserMenu menuItemClick={this.menuItemClick} getAvailable={this.getAvailable} newItem={this.newItem} selectedMenuItem={selectedMenuItem} locType={user.loc_type} />
					<div className={classes.toolbar} />
				</Hidden>
				<Hidden mdUp>
					<MobileListHeader newItem={this.newItem} getAvailable={this.getAvailable} />
				</Hidden>
				{item.data ? 
					<main className={classes.root}>
						{item.renderScreen.view === 'NewItem' ? <NewItem /> : <ItemList itemList={item.data} rescueItem={this.rescueItem} closeItem={this.closeItem} user={user} /> }
					</main>
				: null}
				<Hidden mdUp>
					<MobileMenu menuItemClick={this.menuItemClick} getAvailable={this.getAvailable} newItem={this.newItem} selectedMenuItem={selectedMenuItem} locType={user.loc_type} />
					<div className={classes.toolbar} />
				</Hidden>
			</div>
		)
	}
}

UserHome.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ 
	item: state.item,
	user: state.auth.user
 });

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
	withWidth()
)(UserHome);