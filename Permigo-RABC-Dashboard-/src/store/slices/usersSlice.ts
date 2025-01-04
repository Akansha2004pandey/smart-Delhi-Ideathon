import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const users = Array.from({ length: 10 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `Camera ${index + 1}`,
  email: `user${index + 1}@example.com`,
  userID: `user-${index + 1}-${Math.random().toString(36).substr(2, 9)}`, // Unique userID
  status: ['active', 'inactive'][index % 2] as 'active' | 'inactive', // Alternates statuses
  createdAt: `2024-03-${(index % 31 + 1).toString().padStart(2, '0')}`, // Cycles through March dates
  modelNumber: index % 2 === 0 ? `Model-${index + 1}` : index + 1, // Mixed string and number
  brand: `Brand ${index + 1}`,
  ip: `192.168.${index % 256}.${index + 1}`, // Example IPv4 addresses
  latitude: (Math.random() * 180 - 90).toFixed(6), // Random latitude
  longitude: (Math.random() * 360 - 180).toFixed(6), // Random longitude
  userName: `user${index + 1}`,
  password: `password${index + 1}`, // Note: Ensure this is hashed in production
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
      const newUser = {
        ...action.payload,
        userID: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
      };
      state.users.push(newUser);
    },
    
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
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
