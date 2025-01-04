import React from 'react';
import { Video } from 'lucide-react';

interface StreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const StreamModal: React.FC<StreamModalProps> = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-lg">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <Video className="mr-2" size={24} />
            {userName}'s Stream
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700">The stream is now open for {userName}!</p>
          {/* Add your video player or stream integration logic here */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamModal;
