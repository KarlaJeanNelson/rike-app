const loginMode = (state = 'LOGIN', action) => {
	switch (action.type) {
		case 'SET_TO_LOGIN_MODE':
			return 'LOGIN';
		case 'SET_TO_REGISTER_MODE':
			return 'REGISTER';
		default:
			return state;
	}
};

export default loginMode;