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
      dark: warningColor[2],
      contrastText: '#fff'
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
    error: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(
      errorColor[0],
      0.4
    )}`,
    success: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(
      successColor[0],
      0.4
    )}`,
    info: `0 4px 20px 0 ${alpha(blackColor, 0.14)}, 0 7px 10px -5px ${alpha(
      infoColor[0],
      0.4
    )}`
  }
});

theme = createTheme(theme, {
  palette: {
    background: {
      default: theme.palette.grey[200],
      paper: theme.palette.grey[200]
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
          '& h1,h2,h3,h4,h5,h6': {
            fontWeight: theme.typography.fontWeightLight
          }
        },
        h1: {
          fontSize: '3em',
          lineHeight: '1.15em'
        },

        h2: {
          fontSize: '2.4em'
        },

        h3: {
          fontSize: '1.825em',
          lineHeight: '1.4em',
          margin: '20px 0 10px'
        },

        h4: {
          fontSize: '1.3em',
          lineHeight: '1.4em'
        },

        h5: {
          fontSize: '1.25em',
          lineHeight: '1.4em',
          marginBottom: '15px'
        },

        h6: {
          fontSize: '1em',
          textTransform: 'uppercase',
          fontWeight: '500'
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
          // padding: [10, 15],
          padding: '8px 16px',
          margin: '0 5px',
          borderRadius: '2px',
          transition: 'all 150ms linear',
          fontWeight: '400',
          '&.Mui-selected': {
            '&:hover': {
              color: theme.palette.text.primary,
              '& .MuiCheckbox-root': {
                color: theme.palette.primary.main
              }
            }
          },
          '& .MuiCheckbox-root': {
            padding: '0 8px 0 0'
          },
          whiteSpace: 'nowrap',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: whiteColor,
            boxShadow: theme.themeShadows.primary,
            '& .MuiCheckbox-root': {
              color: theme.palette.common.white
            }
          }
        }
      }
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: 'layout' },
          style: {
            borderRadius: '0.375rem',
            marginTop: 20,
            padding: '24px'
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
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'inherit',
          fontWeight: 300,
          whiteSpace: 'nowrap'
        },
        body: {
          fontSize: '0.75rem'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          // '&:hover': {
          //   '&:not(.Mui-disabled)': {
          //     '&:before': {
          //       borderColor: theme.palette.grey[400],
          //       borderWidth: 1
          //     }
          //   }
          // },
          '&:hover': {
            '&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[400],
              borderWidth: 1
            }
          }
        })
      }
    },
    MuiInput: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          // '&:hover': {
          //   '&:not(.Mui-disabled)': {
          //     '&:before': {
          //       borderColor: theme.palette.grey[400],
          //       borderWidth: 1
          //     }
          //   }
          // },
          '&:hover:not(.Mui-disabled):before,&:before': {
            borderColor: theme.palette.grey[400],
            borderWidth: 1
          },
          '&:after': {
            borderColor: theme.palette[ownerState.color].main
          }
        }),
        input: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[500],
          fontWeight: 400
        }
      }
    },
    MuiDialog: {
      variants: [
        {
          props: { variant: 'edit' },
          style: {
            '& .MuiDialog-paper': {
              minWidth: 400,
              maxWidth: 500
            }
          }
        }
      ],
      styleOverrides: {
        paper: {
          borderRadius: '.375rem',
          '& .MuiDialogTitle-root': {
            fontWeight: 300
          }
        }
      }
    },
    MuiInputBase: {
      input: {
        styleOverrides: {
          backgroundColor: 'red',
          '&:focus': {
            backgroundColor: 'red'
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 400,
          color: theme.palette.grey[600]
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontWeight: 400,
          color: theme.palette.grey[600]
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
