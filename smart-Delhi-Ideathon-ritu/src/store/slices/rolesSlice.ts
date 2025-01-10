import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../types';

interface RolesState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  roles: [
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access',
      permissions: [],
    },
    {
      id: '2',
      name: 'Editor',
      description: 'Can edit content',
      permissions: [],
    },
    {
      id: '3',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: [],
    },
  ],
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.roles.findIndex(role => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
    deleteRole: (state, action: PayloadAction<string>) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
  },
});

export const { addRole, updateRole, deleteRole } = rolesSlice.actions;
export default rolesSlice.reducer;