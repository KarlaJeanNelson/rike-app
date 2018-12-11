import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
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

// TODO: refactor to reuse code for menu items (org vs all).
class MobileMenu extends Component {
	state = {
		value: 0,
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

	changeTab = (event, value) => {
		this.setState({ value })
	}

  handleOrgListItemClick = (event, item) => {
		event.preventDefault();
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
			value: 0,
		})
		this.props.dispatch({
			type: 'FETCH_ITEMS',
			payload: {
				status: 'available',
			}
		})
	}

	componentDidMount() {
		const { user } = this.props;
			this.props.dispatch({
				type: 'FETCH_ORG_ITEMS',
				id: user.loc_id,
				payload: {},
			})		
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;
		return (
			<Paper square className={classes.root}>
				<BottomNavigation
					value={value}
					onChange={this.changeTab}
					fullWidth
					className={classes.root}
				>
					{this.menuItemsOrg().map((item, index) => (
						<BottomNavigationAction
							key={index}
							className={classes.icons}
							onClick={event => this.handleOrgListItemClick(event, item)}
							component={Link} to="/user"
							label={item.text}
							icon={<FontAwesomeIcon icon={item.icon} />}
						/>
					))}
				</BottomNavigation>
			</Paper>
		);
	}
}

MobileMenu.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.auth.user,
	state: state,
});

export default compose(
	connect(mapStateToProps),
	withStyles(styles),
)(MobileMenu);