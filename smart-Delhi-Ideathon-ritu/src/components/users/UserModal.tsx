import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { User, Role } from '../../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
  user?: User;
  roles: Role[];
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  roles,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleId: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        roleId: user.role.id,
        password: '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        roleId: '',
        password: '',
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRole = roles.find(role => role.id === formData.roleId);
    onSubmit({
      ...formData,
      role: selectedRole!,
      status: 'active',
      createdAt: new Date().toISOString(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6">
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
                {user ? 'Edit User' : 'Add New User'}
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    Name
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
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-lg font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    value={formData.roleId}
                    onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
 className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                    required
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {!user && (
                  <div>
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                      required={!user}
                      minLength={6}
                    />
                  </div>
                )}

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-lg"
                  >
                    {user ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-lg"
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

export default UserModal;