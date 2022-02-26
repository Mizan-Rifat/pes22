import { Box } from '@mui/system';
import React from 'react';
import clsx from 'clsx';

const PaperHeader = props => {
  const { children, color, plain, title, subTitle, ...rest } = props;

  //   const bgColor = clsx({
  // 'linear-gradient(60deg, ' + warningColor[1] + ', ' + warningColor[2] + ')',
  //     ...warningBoxShadow
  //   })

  return (
    <Box
      sx={theme => ({
        p: 2,
        mt: -2.5,
        mx: 2,
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
      {subTitle && <p>{subTitle}</p>}
      {children}
    </Box>
  );
};

export default PaperHeader;
