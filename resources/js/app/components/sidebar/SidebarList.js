import List from '@mui/material/List';
import { alpha, styled } from '@mui/material/styles';

const SidebarList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  zIndex: 4,
  '& .MuiListSubheader-root': {
    backgroundColor: 'transparent',
    color: alpha(theme.palette.common.white, 0.5),
    // textTransform: 'uppercase',
    fontWeight: 300,
    fontSize: '0.75rem',
    padding: 0
  },
  '& .MuiDivider-root': {
    '& .MuiDivider-wrapper': {
      paddingLeft: 0
    },
    '&:before': {
      content: 'unset'
    },
    '&:after': {
      borderColor: alpha(theme.palette.common.white, 0.3)
    }
  },
  '& .MuiListItemButton-root': {
    width: 'auto',
    transition: 'all 300ms linear',
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: theme.themeShadows.primary,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        boxShadow: theme.themeShadows.primary
      }
    },
    '& .MuiListItemText-primary': {
      color: theme.palette.common.white
      // fontWeight: theme.typography.fontWeightLight
    },
    '& .MuiListItemIcon-root': {
      minWidth: '40px'
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white,
      fontSize: 20
    }
  }
}));

export default SidebarList;
