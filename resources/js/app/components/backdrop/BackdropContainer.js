import { Backdrop, Box, CircularProgress } from '@mui/material';
import React from 'react';

const BackdropContainer = ({ children, sx, loading = false, hideContent }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        opacity: loading ? 0.5 : 1,
        minHeight: 200,
        ...sx
      }}
    >
      {hideContent ? !loading && children : children}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme => theme.zIndex.drawer + 1,
          position: 'absolute',
          bgcolor: 'transparent'
        }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

export default BackdropContainer;
