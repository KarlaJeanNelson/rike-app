import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import cyan from '@material-ui/core/colors/cyan';

const theme = createMuiTheme({
	props: {
		MuiInputLabel: {
			shrink: true,
		}
	},
	palette: {
		primary: {
			main: grey[900],
		},
		secondary: {
			main: cyan[700],
		},
	},
	typography: {
		h1: {
			fontFamily: '\'Raleway\', \'Roboto\', \'Arial\', sans-serif',
			textTransform: 'uppercase',
			textAlign: 'center',
		},
		h4: {
			fontFamily: '\'Karla\', \'Roboto\', \'Arial\', sans-serif',
			textTransform: 'uppercase',
		},
		h5: {
			fontFamily: '\'BioRhyme\', \'Roboto\', \'Arial\', sans-serif',
			textTransform: 'lowercase',
		},
		useNextVariants: true,
	},
	shape: {
		borderRadius: 2,
	},
});

export default theme;