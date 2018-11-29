import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		
	},
	typography: {
		h4: {
			fontFamily: `'Karla', 'Roboto', 'Arial', sans-serif`,
			textTransform: 'uppercase',
		},
		h5: {
			fontFamily: `'BioRhyme', 'Roboto', 'Arial', sans-serif`,
			textTransform: 'lowercase',
		},
		useNextVariants: true,
	},
});

export default theme;