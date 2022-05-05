import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from 'assets/theme/theme';
import { CssBaseline } from '@mui/material';
import AdminLayout from './layouts/admin/AdminLayout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import Clubs from './pages/admin/clubs/Clubs';
import Club from './pages/admin/clubs/Club';
import ClubEdit from './pages/admin/clubs/ClubEdit';
import Tournaments from './pages/admin/tournaments/Tournaments';
import Tournament from './pages/admin/tournaments/tournament/Tournament';
import TournamentAdd from './pages/admin/tournaments/TournamentAdd';
import TournamentEdit from './pages/admin/tournaments/TournamentEdit';
import TournamentDetails from './pages/admin/tournaments/tournament/TournamentDetails';
import TournamentFixtures from './pages/admin/tournaments/tournament/TournamentFixtures';
import TournamentResults from './pages/admin/tournaments/tournament/TournamentResults';
import TournamentOfficials from './pages/admin/tournaments/tournament/TournamentOfficials';
import PlayerModels from './pages/admin/player-models/PlayerModels';
import PlayerModel from './pages/admin/player-models/PlayerModel';
import PlayerModelEdit from './pages/admin/player-models/PlayerModelEdit';

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
                <Route path="clubs">
                  <Route index element={<Clubs />} />
                  <Route path=":club" element={<Club />} />
                  <Route path=":club/edit" element={<ClubEdit />} />
                  <Route path="create" element={<PermissionAdd />} />
                </Route>
                <Route path="player-models">
                  <Route index element={<PlayerModels />} />
                  <Route path=":playerModel" element={<PlayerModel />} />
                  <Route
                    path=":playerModel/edit"
                    element={<PlayerModelEdit />}
                  />
                  <Route path="create" element={<PermissionAdd />} />
                </Route>
                <Route path="tournaments">
                  <Route index element={<Tournaments />} />
                  <Route path=":tournament" element={<Tournament />}>
                    <Route index element={<TournamentDetails />} />
                    <Route path="details" element={<TournamentDetails />} />
                    <Route path="fixtures" element={<TournamentFixtures />} />
                    <Route path="results" element={<TournamentResults />} />
                    <Route path="officials" element={<TournamentOfficials />} />
                  </Route>
                  {/* <Route path=":tournament" element={<Tournament />} /> */}
                  <Route path=":tournament/edit" element={<TournamentEdit />} />
                  <Route path="create" element={<TournamentAdd />} />
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
