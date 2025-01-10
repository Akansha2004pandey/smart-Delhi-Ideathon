import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const users = Array.from({ length: 50 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: {
    id: (index % 3 + 1).toString(), // Cycles through 3 roles (1, 2, 3)
    name: ['Admin', 'Editor', 'Viewer'][index % 3], // Alternates roles
    permissions: [],
    description: ['Administrator', 'Content Editor', 'Content Viewer'][index % 3], // Matches role
  },
  status: ['active', 'inactive'][index % 2], // Alternates statuses
  createdAt: `2024-03-${(index % 31 + 1).toString().padStart(2, '0')}`, // Cycles through March dates
}));

const initialState: UsersState = {
  users,
  loading: false,
  error: null,
  searchQuery: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    toggleUserStatus: (state, action: PayloadAction<string>) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
      }
    },
  },
});

export const { setSearchQuery, addUser, updateUser, deleteUser, toggleUserStatus } = usersSlice.actions;
export default usersSlice.reducer;