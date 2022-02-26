import { alpha } from '@mui/material/styles';
import { capitalizeFirstLetter } from 'config/utils';
import { colors } from '../../variables';

const btnBoxShdow = color =>
  `0 2px 2px 0 ${alpha(color, 0.14)}, 0 3px 1px -2px ${alpha(
    color,
    0.2
  )}, 0 1px 5px 0 ${alpha(color, 0.12)}`;

const btnHoverBoxShdow = color =>
  `0 14px 26px -12px ${alpha(color, 0.42)},  0 4px 23px 0px ${alpha(
    color,
    0.12
  )}, 0 8px 10px -5px ${alpha(color, 0.2)}`;

const btnContainedStyle = theme =>
  colors.reduce(
    (acc, color) => ({
      ...acc,
      [`contained${capitalizeFirstLetter(color)}`]: {
        boxShadow: btnBoxShdow(theme.palette[color].main),
        '&:hover,&:focus': {
          backgroundColor: theme.palette[color].main,
          boxShadow: btnHoverBoxShdow(theme.palette[color].main)
        }
      }
    }),
    {}
  );

const buttonStyle = theme => ({
  root: {
    padding: '12px 30px',
    lineHeight: '1.42857143',
    borderRadius: '.1875rem'
  },
  ...btnContainedStyle(theme),
  sizeLarge: {
    padding: '1.125rem 2.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.333333',
    borderRadius: '0.2rem'
  },
  sizeSmall: {
    padding: '0.40625rem 1.25rem',
    fontSize: '0.6875rem',
    lineHeight: '1.5',
    borderRadius: '0.2rem'
  }
});

export default buttonStyle;
