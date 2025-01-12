import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  alerts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch alerts from the backend
export const fetchAlerts = createAsyncThunk('alerts/fetchAlerts', async () => {
  const response = await axios.get('/api/alerts');
  return response.data;
});

// Async thunk to send new alert to the backend
export const sendAlert = createAsyncThunk('alerts/sendAlert', async (alert) => {
  const response = await axios.post('/api/alerts', alert);
  return response.data;
});

// Create alert slice
const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    markAlertAddressed: (state, action) => {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert) {
        alert.isAddressed = true;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAlerts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.alerts = action.payload;
      })
      .addCase(fetchAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendAlert.fulfilled, (state, action) => {
        state.alerts.push(action.payload);
      });
  },
});

export const { addAlert, markAlertAddressed } = alertSlice.actions;

export default alertSlice.reducer;
