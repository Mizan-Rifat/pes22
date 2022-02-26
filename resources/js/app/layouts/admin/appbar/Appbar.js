import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import ProfileMenu from './ProfileMenu';
import { Box } from '@mui/material';
import NotificationMenu from './NotificationMenu';
import AppbarBreadcrumbs from './AppbarBreadcrumbs';

const drawerWidth = 240;

const Appbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <MuiAppBar
      position="fixed"
      color="transparent"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: 0
        // borderBottom: 1
      }}
    >
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
        <Box sx={{ flex: 1 }}>
          <AppbarBreadcrumbs />
        </Box>
        <NotificationMenu />
        <ProfileMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default Appbar;
