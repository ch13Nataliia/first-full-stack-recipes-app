import { createTheme } from '@mui/material/styles';
import orange from '@mui/material/colors/orange';
import grey from '@mui/material/colors/grey';

let theme = createTheme({
  palette: {
    background: {
      paper: '#fff9c4',
    },
    primary: {
      main: orange[500],
      contrastText: grey[900],
    },
    secondary: {
      main: '#edf2ff',
      contrastText: grey[900],
    },
  },
});



export default theme;
