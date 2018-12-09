import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';

const LogInButton = props => (
	<IconButton
		color="inherit"
		component={Link}
		to="/user"
	>
		<FontAwesomeIcon icon="user" size="xs" />
	</IconButton>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default LogInButton;
