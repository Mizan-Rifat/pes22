import { Stack } from '@mui/material';
import React from 'react';

const ActionToolbar = ({ children, start }) => {
  return (
    <Stack
      direction="row"
      justifyContent={start ? 'flex-start' : 'flex-end'}
      alignItems="center"
      spacing={2}
      sx={{ my: 3 }}
    >
      {children}
    </Stack>
  );
};

export default ActionToolbar;
