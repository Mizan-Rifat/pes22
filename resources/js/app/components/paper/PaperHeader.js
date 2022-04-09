import { Box } from '@mui/system';
import React from 'react';

const PaperHeader = props => {
  const { children, color, title, subTitle, ...rest } = props;

  return (
    <Box
      sx={theme => ({
        p: 2,
        mt: -5.5,
        // mx: 2,
        borderRadius: 1,
        zIndex: '3 !important',
        color: theme.palette.common.white,
        background: `linear-gradient(60deg,${theme.palette[color].light},${theme.palette[color].dark})`,
        boxShadow: theme.themeShadows[color],
        '& h4': {
          mt: 0,
          mb: 0.5
        },
        '& p': {
          m: 0
        }
      })}
      {...rest}
    >
      {title && <h4>{title}</h4>}
      {subTitle && <p style={{ color: 'rgba(255,255,255,.62)' }}>{subTitle}</p>}
      {children}
    </Box>
  );
};

export default PaperHeader;
