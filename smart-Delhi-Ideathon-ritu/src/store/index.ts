import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import rolesReducer from './slices/rolesSlice';
import permissionsReducer from './slices/permissionsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;