import * as React from 'react';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useTheme} from '@mui/material/styles'

function MobileNavigation({
  mobileOpen = false,
  handleDrawerToggle = () =>
    console.log('No handleDrawToggle function provided'),
  drawerWidth = 240,
}) {

  const theme = useTheme();

  const lightTextColor = theme.palette.common.white;

  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          }, 
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#81c784' }}>
          <Typography variant="h6" sx={{ my: 2, color: lightTextColor }}>
            MY RECIPES APP
          </Typography>

          <Divider />

          <List>
            <ListItem>
              <ListItemButton
                sx={{ textAlign: 'center', color: lightTextColor  }}
                component={NavLink}
                to="/"
              >
                <ListItemText primary={'RECIPES LIST'} />
              </ListItemButton>
            </ListItem>
            
            <ListItem>
              <ListItemButton
                sx={{ textAlign: 'center', color: lightTextColor  }}
                component={NavLink}
                to="/add"
              >
                <ListItemText primary={'ADD RECIPE'} />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                sx={{ textAlign: 'center', color: lightTextColor  }}
                component={NavLink}
                to="/contact"
              >
                <ListItemText primary={'CONTACT'} />
              </ListItemButton>
            </ListItem>


          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavigation;
