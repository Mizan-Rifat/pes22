import ArrowBack from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import React from 'react';

const BackToLIstButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={<ArrowBack />}
      size="small"
      sx={{ mb: 6 }}
      onClick={onClick}
    >
      Back to list
    </Button>
  );
};

export default BackToLIstButton;
