import { Box, Paper } from '@mui/material';
import PaperHeader from 'app/components/paper/PaperHeader';
import EnhancedTable from 'app/components/table/Table';
import React from 'react';
import TableExample from './TableExample';

const Permissions = () => {
  return (
    <Paper variant="layout" sx={{ width: '100%' }}>
      <PaperHeader
        title="Permissions"
        subTitle="Choose user roles"
        color="primary"
      />
      <Box sx={{ px: 2 }}>
        <TableExample />
      </Box>
    </Paper>
  );
};

export default Permissions;
