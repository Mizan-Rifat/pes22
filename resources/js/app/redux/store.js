import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './slices/rolesSlice';

export default configureStore({
  reducer: {
    roles: rolesReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
