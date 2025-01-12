import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus } from 'lucide-react';
import { RootState } from '../store';
import { setSearchQuery, deleteCamera, toggleCameraStatus, addCamera, updateCamera, fetchCameras } from '../store/slices/cameraSlice';
import CameraTable from '../components/cameras/CameraTable';
import CameraModal from '../components/cameras/CameraModal';
import { Camera } from '../types';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { div } from 'framer-motion/client';

const Cameras = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();

  const currentOrganization = useMemo(
    () => JSON.parse(localStorage.getItem('currentOrganization') || '{}'),
    []
  );

  const { cameras, searchQuery, loading, error } = useSelector((state: RootState) => state.cameras);
  const [showModal, setShowModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<Camera | undefined>(undefined);

  useEffect(() => {
    if (currentOrganization?.uid) {
      dispatch(fetchCameras(currentOrganization.uid));
    }
  }, [dispatch, currentOrganization?.uid]);
  console.log(cameras)

  const filteredCameras = useMemo(
    () =>
      cameras.filter(
        (camera) =>
          camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          camera.email.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [cameras, searchQuery]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  const handleEdit = useCallback(
    (camera: Camera) => {
      setSelectedCamera(camera);
      setShowModal(true);
    },
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm('Are you sure you want to delete this camera?')) {
        dispatch(deleteCamera({ organizationId: currentOrganization.uid, cameraId: id }));
      }
    },
    [dispatch, currentOrganization?.uid]
  );

  const handleToggleStatus = useCallback(
    (id: string, currentStatus: string) => {
      dispatch(toggleCameraStatus({ organizationId: currentOrganization.uid, cameraId: id, currentStatus }));
    },
    [dispatch, currentOrganization?.uid]
  );

  const handleSubmit = useCallback(
    (cameraData: Partial<Camera>) => {
      if (selectedCamera) {
        dispatch(updateCamera({ organizationId: currentOrganization.uid, cameraId: selectedCamera.id, updatedData: cameraData }));
      } else {
        dispatch(
          addCamera({
            organizationId: currentOrganization.uid,
            cameraData: { ...cameraData } as Omit<Camera, 'id'>,
          })
        );
      }
      setShowModal(false);
      setSelectedCamera(undefined);
    },
    [dispatch, selectedCamera, currentOrganization?.uid]
  );


  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-5xl font-black text-white">Add Camera</h1>
          <p className="mt-2 text-md text-gray-100">Manage your cameras here</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              setSelectedCamera(undefined);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-none outline-none bg-indigo-800 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-indigo-900 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Camera
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg outline-none px-3 py-2"
            placeholder="Search cameras..."
          />
        </div>
      </div>
      {
        loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-700"></div>
          </div>
        ) : (
          <div>
                  <CameraTable
        cameras={filteredCameras}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={(id) => {
          const camera = cameras.find((c) => c.id === id);
          if (camera) handleToggleStatus(id, camera.status);
        }}
      />

      <CameraModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCamera(undefined);
        }}
        onSubmit={handleSubmit}
        camera={selectedCamera}
      />
          </div>
        )
      }
    </div>
  );
};

export default Cameras;
