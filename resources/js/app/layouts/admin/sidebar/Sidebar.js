import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SidebarList from './SidebarList.js';
import { sidebarDrawerOverlay } from 'styles/customStyles/sidebarOverlay';

const drawerWidth = 240;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <SidebarList />
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        height: '100vh',
        flexShrink: { sm: 0 }
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
        open
      >
        <Box
          sx={{
            height: '100%',
            // overflow: 'scroll',
            px: 2
          }}
        >
          {drawer}
          <Box sx={theme => sidebarDrawerOverlay(theme)} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
