import { Box, Paper } from '@mui/material';
import PaperHeader from 'components/paper/PaperHeader';
import React from 'react';
import TableExample from './TableExample';

const Roles = () => {
  return (
    <Paper variant="layout" sx={{ width: '100%' }}>
      <PaperHeader title="Roles" subTitle="Choose user roles" color="primary" />
      <Box sx={{ px: 2 }}>
        <TableExample />
      </Box>
    </Paper>
  );
};

export default Roles;
