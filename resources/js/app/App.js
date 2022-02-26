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

const App = () => {
  console.log({ theme });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="roles" element={<Roles />} />
              <Route path="permissions" element={<Permissions />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <AdminLayout /> */}
      </ThemeProvider>
    </>
  );
};

export default App;
