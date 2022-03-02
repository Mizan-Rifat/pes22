import * as React from 'react';
import Box from '@mui/material/Box';
import Appbar from './appbar/Appbar';
import Sidebar from './sidebar/Sidebar';
import { Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
