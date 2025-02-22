import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slices/cameraSlice'
import rolesReducer from './slices/rolesSlice';
import permissionsReducer from './slices/permissionsSlice';
import alertReducer from './slices/alertSlice';

export const store = configureStore({
  reducer: {
    cameras: cameraReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    alerts: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;