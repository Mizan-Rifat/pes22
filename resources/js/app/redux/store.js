import { configureStore } from '@reduxjs/toolkit';
import clubsReducer from './slices/clubsSlice';
import permissionsReducer from './slices/permissionsSlice';
import rolesReducer from './slices/rolesSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    roles: rolesReducer,
    permissions: permissionsReducer,
    users: usersReducer,
    clubs: clubsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
