import { configureStore } from '@reduxjs/toolkit';
import permissionsReducer from './slices/permissionsSlice';
import rolesReducer from './slices/rolesSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    roles: rolesReducer,
    permissions: permissionsReducer,
    users: usersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
