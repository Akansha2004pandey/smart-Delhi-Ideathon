import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Permission } from '../../types';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (permission: Partial<Permission>) => void;
  permission?: Permission;
}

const modules = ['Users', 'Roles', 'Dashboard', 'Settings'];

const PermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  permission,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    module: modules[0],
  });

  useEffect(() => {
    if (permission) {
      setFormData({
        name: permission.name,
        description: permission.description,
        module: permission.module,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        module: modules[0],
      });
    }
  }, [permission]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

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
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                {permission ? 'Edit Permission' : 'Add New Permission'}
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-md font-medium text-gray-700">
                    Permission Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                          className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="module" className="block text-md font-medium text-gray-700">
                    Module
                  </label>
                  <select
                    id="module"
                    value={formData.module}
                    onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                                           className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                  >
                    {modules.map((module) => (
                      <option key={module} value={module}>
                        {module}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-md font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                           className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                    required
                  />
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700  sm:ml-3 sm:w-auto sm:text-md"
                  >
                    {permission ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50  sm:mt-0 sm:w-auto sm:text-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;