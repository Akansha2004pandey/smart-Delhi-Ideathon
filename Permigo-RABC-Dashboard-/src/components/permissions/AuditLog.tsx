import React from 'react';
import { X, Clock, Plus, Edit2, Trash2 } from 'lucide-react';

interface AuditLogProps {
  isOpen: boolean;
  onClose: () => void;
  logs: {
    timestamp: string;
    action: 'create' | 'update' | 'delete';
    permissionName: string;
    module: string;
  }[];
}

const AuditLog: React.FC<AuditLogProps> = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'update':
        return <Edit2 className="h-4 w-4 text-blue-500" />;
      case 'delete':
        return <Trash2 className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'create':
        return 'Created';
      case 'update':
        return 'Updated';
      case 'delete':
        return 'Deleted';
      default:
        return action;
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-400" />
                Permission Audit Log
              </h3>

              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {logs.map((log, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getActionIcon(log.action)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {getActionText(log.action)} permission "{log.permissionName}"
                          </p>
                          <p className="text-sm text-gray-500">
                            Module: {log.module}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {logs.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  No audit logs available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;