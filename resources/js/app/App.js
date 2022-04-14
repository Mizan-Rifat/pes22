import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'assets/theme/theme';
import { CssBaseline } from '@mui/material';
import AdminLayout from './layouts/admin/AdminLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/main/MainLayout';
import Home from './layouts/main/Home';
import Test from './layouts/main/Test';
import Roles from 'pages/admin/roles/Roles';
import Permissions from 'pages/admin/permissions/Permissions';
import Role from 'pages/admin/roles/Role';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationProvider from './providers/ConfirmationProvider';
import Permission from './pages/admin/permissions/Permission';
import Users from './pages/admin/users/Users';
import User from './pages/admin/users/User';
import UserEdit from './pages/admin/users/UserEdit';
import RoleEdit from './pages/admin/roles/RoleEdit';
import RoleAdd from './pages/admin/roles/RoleAdd';
import PermissionEdit from './pages/admin/permissions/PermissionEdit';
import PermissionAdd from './pages/admin/permissions/PermissionAdd';

const App = () => {
  console.log({ theme });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ConfirmationProvider>
          <CssBaseline />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/test" element={<Test />} />
              </Route>

              <Route path="admin" element={<AdminLayout />}>
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path=":user" element={<User />} />
                  <Route path=":user/edit" element={<UserEdit />} />
                </Route>
                <Route path="roles">
                  <Route index element={<Roles />} />
                  <Route path=":role/edit" element={<RoleEdit />} />
                  <Route path=":role" element={<Role />} />
                  <Route path="create" element={<RoleAdd />} />
                </Route>
                <Route path="permissions">
                  <Route index element={<Permissions />} />
                  <Route path=":permission/edit" element={<PermissionEdit />} />
                  <Route path=":permission" element={<Permission />} />
                  <Route path="create" element={<PermissionAdd />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>

          <ToastContainer
            transition={Slide}
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
          />
        </ConfirmationProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
