import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slices/cameraSlice'
import rolesReducer from './slices/rolesSlice';
import permissionsReducer from './slices/permissionsSlice';

export const store = configureStore({
  reducer: {
    cameras: cameraReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;