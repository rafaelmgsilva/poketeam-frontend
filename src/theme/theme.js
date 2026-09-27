import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e3350d',
    },
    secondary: {
      main: '#3b4cca',
    },
    background: {
      default: '#f6f7fb',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontWeight: 800,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 14,
  },
});


export default theme;