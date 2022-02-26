import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import buttonStyle from './styles/button/button';
import {
  primaryColor,
  warningColor,
  errorColor,
  successColor,
  infoColor,
  blackColor,
  whiteColor
} from './variables';

let theme = createTheme({
  palette: {
    primary: {
      main: primaryColor[0],
      light: primaryColor[1],
      dark: primaryColor[2]
    },
    warning: {
      main: warningColor[0],
      light: warningColor[1],
      dark: warningColor[2]
    },
    error: {
      main: errorColor[0],
      light: errorColor[1],
      dark: errorColor[2]
    },
    success: {
      main: successColor[0],
      light: successColor[1],
      dark: successColor[2]
    },
    info: {
      main: infoColor[0],
      light: infoColor[1],
      dark: infoColor[2]
    },
    background: {
      default: '#eee'
    }
  },
  themeShadows: {
    primary: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(
      primaryColor[0],
      0.4
    )}`,
    warning: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(
      warningColor[0],
      0.4
    )}`,
    error: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(errorColor[0], 0.4)}`,
    success: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(
      successColor[0],
      0.4
    )}`,
    info: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(infoColor[0], 0.4)}`
  }
});

theme = createTheme(theme, {
  palette: {
    background: {
      default: theme.palette.grey[200]
    }
  },
  typography: {
    body1: {
      fontSize: theme.typography.fontSize,
      fontWeight: 300
    },
    button: {
      fontSize: '0.75rem',
      fontWeight: 400
    },
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightSemiBold: 500,
    fontWeightBold: 700
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: theme.typography.fontSize,
          '& h1,h2,h3,h4,h5.h6': {
            fontWeight: theme.typography.fontWeightLight
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: buttonStyle(theme)
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          padding: [10, 15],
          margin: '0 5px',
          borderRadius: '2px',
          transition: 'all 150ms linear',
          fontWeight: '400',
          // lineHeight: '1.42857143',
          // color: grayColor[8],
          whiteSpace: 'nowrap',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: whiteColor,
            boxShadow: theme.themeShadows.primary
          }
        }
      }
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: 'layout' },
          style: {
            borderRadius: '0.375rem'
          }
        }
      ],
      styleOverrides: {
        root: {
          boxShadow: `0 1px 4px 0 ${alpha(blackColor, 0.14)}`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
          // '&:not(.MuiAppBar-root)': {
          //   borderRadius: '0.375rem'
          // }
        }
      }
    }
    // MuiListItemText: {
    //   defaultProps: {
    //     primaryTypographyProps: {
    //       variant: 'body2'
    //     }
    //   }
    // }
  }
});

export default theme;
