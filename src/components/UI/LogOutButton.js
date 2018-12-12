import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';

const LogOutButton = props => (
	<IconButton
		color="inherit"
		onClick={() => props.dispatch({ type: 'LOGOUT' })}
		component={Link} to="/"
	>
		<FontAwesomeIcon icon="user-slash" size="xs" />
	</IconButton>
);

export default connect()(LogOutButton);