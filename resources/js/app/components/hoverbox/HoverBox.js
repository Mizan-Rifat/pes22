import { Box, Hidden } from '@mui/material';
import React from 'react';

const HoverBoxContent = ({ children }) => {
  return (
    <Box
      className="hoverbox-content"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        display: 'flex',
        transition: 'opacity .2s ease-in-out'
      }}
    >
      {children}
    </Box>
  );
};

const HoverBox = ({ children, sx }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          '& .hoverbox-content': {
            opacity: 1
          }
        },
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

HoverBox.Content = HoverBoxContent;

export default HoverBox;
