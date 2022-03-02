import bgImage from 'assets/img/sidebar.jpg';

export const sidebarDrawerOverlay = theme => ({
  backgroundImage: `url(${bgImage})`,
  position: 'absolute',
  zIndex: '1',
  height: '100%',
  width: '100%',
  display: 'block',
  top: '0',
  left: '0',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  '&:after': {
    position: 'absolute',
    zIndex: '3',
    width: '100%',
    height: '100%',
    content: '""',
    display: 'block',
    background: theme.palette.common.black,
    opacity: '.8'
  }
});
