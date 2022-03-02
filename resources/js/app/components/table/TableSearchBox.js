import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const TableSearchBox = ({
  globalFilter,
  setGlobalFilter,
  placeholder = 'Search...'
}) => {
  return (
    <TextField
      size="small"
      id="standard-basic"
      variant="standard"
      color="primary"
      sx={{ minWidth: '14rem' }}
      value={globalFilter || ''}
      onChange={e => {
        setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      InputProps={{
        placeholder,
        type: 'search',
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              color: theme => theme.palette.grey[400],
              '.Mui-focused &': {
                color: 'primary.main'
              }
            }}
          >
            <Search fontSize="small" sx={{ mb: 0.25 }} />
          </InputAdornment>
        )
      }}
    />
  );
};

export default TableSearchBox;
