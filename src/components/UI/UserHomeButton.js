import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';

const UserHomeButton = props => (
	<IconButton
		color="inherit"
		component={Link}
		to="/user"
	>
		<FontAwesomeIcon icon="home" size="xs" />
	</IconButton>
);

export default connect()(UserHomeButton);