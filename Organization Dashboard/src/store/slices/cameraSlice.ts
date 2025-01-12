import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase'; // Ensure this is the correct path to your Firebase configuration

interface Camera {
  id: string;
  name: string;
  email: string;
  modelNumber: string;
  brand: string;
  ip: string;
  latitude: string;
  longitude: string;
  organizationAddress: string;
  status: string;
  password: string;
  createdAt: string;
}

interface CamerasState {
  cameras: Camera[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filteredCameras: Camera[];
}

const initialState: CamerasState = {
  cameras: [],
  loading: false,
  error: null,
  searchQuery: '',
  filteredCameras: [],
};

// Async thunk for fetching cameras
export const fetchCameras = createAsyncThunk(
  'cameras/fetchCameras',
  async (organizationId: string, { rejectWithValue }) => {
    try {
      const camerasCollectionRef = collection(doc(db, 'Organizations', organizationId), 'cameras');
      const snapshot = await getDocs(camerasCollectionRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Camera[];
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error fetching cameras');
    }
  }
);

// Async thunk for adding a camera
export const addCamera = createAsyncThunk(
  'cameras/addCamera',
  async (
    { organizationId, cameraData }: { organizationId: string; cameraData: Omit<Camera, 'id'> },
    { rejectWithValue }
  ) => {
    try {
      const camerasCollectionRef = collection(doc(db, 'Organizations', organizationId), 'cameras');
      const docRef = await addDoc(camerasCollectionRef, cameraData);
      return { id: docRef.id, ...cameraData };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error adding camera');
    }
  }
);

// Async thunk for updating a camera
export const updateCamera = createAsyncThunk(
  'cameras/updateCamera',
  async (
    {
      organizationId,
      cameraId,
      updatedData,
    }: { organizationId: string; cameraId: string; updatedData: Partial<Camera> },
    { rejectWithValue }
  ) => {
    try {
      const cameraDocRef = doc(db, 'Organizations', organizationId, 'cameras', cameraId);
      await updateDoc(cameraDocRef, updatedData);
      return { cameraId, updatedData };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error updating camera');
    }
  }
);

// Async thunk for deleting a camera
export const deleteCamera = createAsyncThunk(
  'cameras/deleteCamera',
  async ({ organizationId, cameraId }: { organizationId: string; cameraId: string }, { rejectWithValue }) => {
    try {
      const cameraDocRef = doc(db, 'Organizations', organizationId, 'cameras', cameraId);
      await deleteDoc(cameraDocRef);
      return cameraId;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error deleting camera');
    }
  }
);

export const toggleCameraStatus = createAsyncThunk(
  'cameras/toggleCameraStatus',
  async (
    { organizationId, cameraId, currentStatus }: { organizationId: string; cameraId: string; currentStatus: string },
    { rejectWithValue }
  ) => {
    try {
      const cameraDocRef = doc(db, 'Organizations', organizationId, 'cameras', cameraId);
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active'; // Toggle logic
      await updateDoc(cameraDocRef, { status: newStatus });
      return { cameraId, newStatus };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Error toggling camera status');
    }
  }
);

// Slice definition
const camerasSlice = createSlice({
  name: 'cameras',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredCameras = state.cameras.filter(
        (camera) =>
          camera.name.toLowerCase().includes(query) ||
          camera.email.toLowerCase().includes(query) ||
          camera.modelNumber.toLowerCase().includes(query) ||
          camera.brand.toLowerCase().includes(query) ||
          camera.organizationAddress.toLowerCase().includes(query)
      );
    },
    clearSearchQuery: (state) => {
      state.searchQuery = '';
      state.filteredCameras = state.cameras;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cameras
      .addCase(fetchCameras.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCameras.fulfilled, (state, action: PayloadAction<Camera[]>) => {
        state.loading = false;
        state.cameras = action.payload;
      })
      .addCase(fetchCameras.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add camera
      .addCase(addCamera.fulfilled, (state, action: PayloadAction<Camera>) => {
        state.cameras.push(action.payload);
      })
      .addCase(addCamera.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Update camera
      .addCase(updateCamera.fulfilled, (state, action) => {
        const { cameraId, updatedData } = action.payload as { cameraId: string; updatedData: Partial<Camera> };
        const index = state.cameras.findIndex((camera) => camera.id === cameraId);
        if (index !== -1) {
          state.cameras[index] = { ...state.cameras[index], ...updatedData };
        }
      })
      .addCase(updateCamera.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Delete camera
      .addCase(deleteCamera.fulfilled, (state, action: PayloadAction<string>) => {
        state.cameras = state.cameras.filter((camera) => camera.id !== action.payload);
      })
      .addCase(deleteCamera.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Toggle camera status
      .addCase(toggleCameraStatus.fulfilled, (state, action) => {
        const { cameraId, newStatus } = action.payload as { cameraId: string; newStatus: string };
        const index = state.cameras.findIndex((camera) => camera.id === cameraId);
        if (index !== -1) {
          state.cameras[index].status = newStatus;
        }
      })
      .addCase(toggleCameraStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      });

  },
});

export default camerasSlice.reducer;

export const { setSearchQuery, clearSearchQuery } = camerasSlice.actions;
