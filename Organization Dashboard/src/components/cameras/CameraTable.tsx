import React, { useState } from 'react';
import StreamModal from './StreamModal';
import { Camera as CameraIcon, Edit2, Trash2, ToggleLeft, ToggleRight, Video } from 'lucide-react';
import { Camera as CameraType } from '../../types';

interface CameraTableProps {
  cameras: CameraType[];
  onEdit: (camera: CameraType) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const CameraTable: React.FC<CameraTableProps> = ({
  cameras,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const [selectedCamera, setSelectedCamera] = useState<CameraType | null>(null);

  const openStream = (camera: CameraType) => {
    if (camera.status === 'active') {
      setSelectedCamera(camera);
    }
  };

  const closeModal = () => {
    setSelectedCamera(null);
  };

  const currentOrganization: { email: string } | null = JSON.parse(
    localStorage.getItem('currentOrganization') || 'null'
  );

  return (
    <>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 cursor-pointer">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Camera Name</th>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Organization Email</th>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Stream</th>
                    <th className="px-6 py-3.5 text-left text-md font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {cameras.map((camera) => (
                  
                    <tr key={camera.id}>
                      
                      <td className="whitespace-nowrap px-3 py-4 text-md text-gray-900">
                        <div className="flex items-center">
                          <CameraIcon
                            className={`h-8 w-8 p-1 text-white rounded-full ${
                              camera.status === 'active' ? 'bg-indigo-500' : 'bg-red-500'
                            } mr-2`}
                          />
                          {camera.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {currentOrganization?.email || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => openStream(camera)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                            camera.status === 'active'
                              ? 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={camera.status !== 'active'}
                          title={camera.status !== 'active' ? 'Stream unavailable for inactive cameras' : ''}
                        >
                          <Video size={20} />
                          <span>Open Stream</span>
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-sm font-semibold leading-5 ${
                            camera.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {camera.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-between">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => onEdit(camera)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => onToggleStatus(camera.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            {camera.status === 'active' ? (
                              <ToggleRight className="h-5 w-5" />
                            ) : (
                              <ToggleLeft className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => onDelete(camera.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedCamera && (
        <StreamModal
          isOpen={!!selectedCamera}
          onClose={closeModal}
          cameraName={selectedCamera.name}
        />
      )}
    </>
  );
};

export default CameraTable;
