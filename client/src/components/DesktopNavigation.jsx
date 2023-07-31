import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useTheme} from '@mui/material/styles'
// import RecipeForm from './form/RecipeForm';



function DesktopNavigation({
  handleDrawerToggle = () =>
    console.log('No handleDrawToggle function provided'),
}) {
  const theme = useTheme();

  const lightTextColor = theme.palette.common.white;

  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ mb: 5, bgcolor: '#81c784'}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              textDecoration: "none",
              color: lightTextColor,
            }}
          >
            MY RECIPES App
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: '#fff' }} component={NavLink} to="/">
              Home
            </Button>

            <Button sx={{ color: '#fff' }} component={NavLink} to="/add">
              Add Recipe
            </Button>

            <Button sx={{ color: '#fff' }} component={NavLink} to="/contact">
              Contact
            </Button>

          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default DesktopNavigation;
