import ArrowBack from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import React from 'react';

const BackToLIstButton = ({ onClick, label = 'Go Back' }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<ArrowBack />}
      size="small"
      sx={{ mb: 6 }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default BackToLIstButton;
