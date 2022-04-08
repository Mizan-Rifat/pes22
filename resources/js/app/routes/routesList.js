/* eslint-disable react/react-in-jsx-scope */
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import Permissions from 'app/pages/admin/permissions/Permissions';
import Roles from 'app/pages/admin/roles/Roles';
import Users from 'app/pages/admin/users/users';

export const authorizationRoutes = {
  title: 'Authorization',
  routes: [
    {
      title: 'Users',
      path: 'users',
      icon: <KeyIcon />,
      name: 'user',
      element: <Users />
    },
    {
      title: 'Roles',
      path: 'roles',
      icon: <KeyIcon />,
      name: 'roles',
      element: <Roles />
    },
    {
      title: 'Permissions',
      path: 'permissions',
      icon: <LockIcon />,
      name: 'permissions',
      element: <Permissions />
    }
  ]
};

export default [authorizationRoutes];
