import { configureStore } from '@reduxjs/toolkit';
import permissionsReducer from './slices/permissionsSlice';
import rolesReducer from './slices/rolesSlice';

export default configureStore({
  reducer: {
    roles: rolesReducer,
    permissions: permissionsReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
