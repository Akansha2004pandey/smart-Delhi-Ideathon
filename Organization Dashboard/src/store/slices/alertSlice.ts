import { createSlice } from "@reduxjs/toolkit";

// Default alerts
const defaultAlerts = [
  {
    id: '1',
    location: { city: 'New Delhi', area: 'Connaught Place' },
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    description: 'Lone woman surrounded by 3+ men showing fear.',
    severity: 'Critical',
    evidence: [{ type: 'image', url: '/alertone.jpeg' }],
    isAddressed: false,
  },
  {
    id: '2',
    location: { city: 'New Delhi', area: 'South Extension' },
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    description: 'Small group of women uneasy in the presence of 3+ men.',
    severity: 'Red',
    evidence: [{ type: 'image', url: '/alerttwo.jpg' }],
    isAddressed: false,
  },
  {
    id: '3',
    location: { city: 'New Delhi', area: 'Karol Bagh' },
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    description: 'A group of two women detected with neutral emotion in a dimly lit area.',
    severity: 'Moderate',
    evidence: [{ type: 'image', url: '/aletthree.jpg' }],
    isAddressed: false,
  },
];

// Function to load alerts from localStorage OR initialize them
const loadAlertsFromStorage = () => {
  const storedAlerts = localStorage.getItem("alerts");

  if (!storedAlerts) {
    localStorage.setItem("alerts", JSON.stringify(defaultAlerts)); // Store default alerts in localStorage
    return defaultAlerts;
  }
  
  return JSON.parse(storedAlerts);
};

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    alerts: loadAlertsFromStorage(),
  },
  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
      localStorage.setItem("alerts", JSON.stringify(state.alerts));
    },
    markAlertAsAddressed: (state, action) => {
      state.alerts = state.alerts.map((alert) =>
        alert.id === action.payload ? { ...alert, isAddressed: true } : alert
      );
      localStorage.setItem("alerts", JSON.stringify(state.alerts));
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
      localStorage.setItem("alerts", JSON.stringify(state.alerts));
    },
  },
});

export const { setAlerts, markAlertAsAddressed, addAlert } = alertSlice.actions;
export default alertSlice.reducer;
