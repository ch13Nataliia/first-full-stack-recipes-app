import * as React from 'react';
import { Box } from '@mui/material';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Home from '../pages/Home';


function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex'}}>
      <DesktopNavigation handleDrawerToggle={handleDrawerToggle} />
      <MobileNavigation
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
    </Box>
  );
}
export default Header;