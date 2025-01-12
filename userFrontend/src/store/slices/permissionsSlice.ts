import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Permission } from '../../types';

interface PermissionsState {
  permissions: Permission[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  auditLog: {
    timestamp: string;
    action: 'create' | 'update' | 'delete';
    permissionName: string;
    module: string;
  }[];
}

const initialState: PermissionsState = {
  permissions: [
    { id: '1', name: 'Create Users', description: 'Can create new users', module: 'Users' },
    { id: '2', name: 'Edit Users', description: 'Can modify user details', module: 'Users' },
    { id: '3', name: 'Delete Users', description: 'Can remove users', module: 'Users' },
    { id: '4', name: 'View Users', description: 'Can view user list', module: 'Users' },
    { id: '5', name: 'Manage Roles', description: 'Can manage roles', module: 'Roles' },
    { id: '6', name: 'Assign Roles', description: 'Can assign roles to users', module: 'Roles' },
    { id: '7', name: 'View Dashboard', description: 'Can view dashboard', module: 'Dashboard' },
    { id: '8', name: 'System Settings', description: 'Can modify system settings', module: 'Settings' },
  ],
  loading: false,
  error: null,
  searchQuery: '',
  auditLog: [],
};

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addPermission: (state, action: PayloadAction<Permission>) => {
      state.permissions.push(action.payload);
      state.auditLog.push({
        timestamp: new Date().toISOString(),
        action: 'create',
        permissionName: action.payload.name,
        module: action.payload.module,
      });
    },
    updatePermission: (state, action: PayloadAction<Permission>) => {
      const index = state.permissions.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.permissions[index] = action.payload;
        state.auditLog.push({
          timestamp: new Date().toISOString(),
          action: 'update',
          permissionName: action.payload.name,
          module: action.payload.module,
        });
      }
    },
    deletePermission: (state, action: PayloadAction<Permission>) => {
      state.permissions = state.permissions.filter(p => p.id !== action.payload.id);
      state.auditLog.push({
        timestamp: new Date().toISOString(),
        action: 'delete',
        permissionName: action.payload.name,
        module: action.payload.module,
      });
    },
  },
});

export const { setSearchQuery, addPermission, updatePermission, deletePermission } = permissionsSlice.actions;
export default permissionsSlice.reducer;