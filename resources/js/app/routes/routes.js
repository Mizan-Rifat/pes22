/* eslint-disable react/react-in-jsx-scope */
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';

export const authorizationRoutes = {
  title: 'Authorization',
  routes: [
    {
      title: 'Roles',
      path: 'roles',
      icon: <KeyIcon />,
      name: 'roles'
    },
    {
      title: 'Permissions',
      path: 'permissions',
      icon: <LockIcon />,
      name: 'permissions'
    }
  ]
};

export default [authorizationRoutes];
