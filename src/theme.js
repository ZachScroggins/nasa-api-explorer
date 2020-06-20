import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Create a theme instance.
let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#705DCF',
    },
    secondary: {
      main: '#483699',
      // main: '#483699',
    },
    type: 'dark',
    background: {
      default: '#161616',
      paper: '#080808',
    },
  },
  typography: {
    h6: {
      fontWeight: 400,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          '@media (min-width: 960px)': {
            overscrollBehavior: 'none',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
