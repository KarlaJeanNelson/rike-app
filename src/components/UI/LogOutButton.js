import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';

const LogOutButton = props => (
	<IconButton
		color="inherit"
		onClick={() => props.dispatch({ type: 'LOGOUT' })}
	>
		<FontAwesomeIcon icon="user-slash" size="xs" />
	</IconButton>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
