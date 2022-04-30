import { configureStore } from '@reduxjs/toolkit';
import clubsReducer from './slices/clubsSlice';
import permissionsReducer from './slices/permissionsSlice';
import rolesReducer from './slices/rolesSlice';
import usersReducer from './slices/usersSlice';
import tournamentsReducer from './slices/tournamentSlice';

export default configureStore({
  reducer: {
    roles: rolesReducer,
    permissions: permissionsReducer,
    users: usersReducer,
    clubs: clubsReducer,
    tournaments: tournamentsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
