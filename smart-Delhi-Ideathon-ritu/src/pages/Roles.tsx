import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Shield, Edit2, Trash2, Plus } from 'lucide-react';
import { RootState } from '../store';
import { addRole, updateRole, deleteRole } from '../store/slices/rolesSlice';
import RoleModal from '../components/roles/RoleModal';
import { Role } from '../types';

const Roles = () => {
  const dispatch = useDispatch();
  const { roles } = useSelector((state: RootState) => state.roles);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      dispatch(deleteRole(id));
    }
  };

  const handleSubmit = (roleData: Partial<Role>) => {
    if (selectedRole) {
      dispatch(updateRole({ ...selectedRole, ...roleData }));
    } else {
      dispatch(addRole({ id: Date.now().toString(), ...roleData } as Role));
    }
    setShowModal(false);
    setSelectedRole(undefined);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-5xl font-black text-white">Roles</h1>
          <p className="mt-2 text-sm text-gray-50">
            Manage roles and their permissions
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              setSelectedRole(undefined);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-indigo-900 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                      Role
                    </th>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                      Permissions
                    </th>
                    <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {roles.map((role) => (
                    <tr key={role.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-md text-gray-900">
                        <div className="flex items-center">
                          <Shield className="h-8 w-8 text-white rounded-full p-1 mr-2 bg-yellow-400" />
                          {role.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {role.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {role.permissions.length} permissions
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-between">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleEdit(role)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit2 className="h-6 w-6 " />
                          </button>

                        </div>
                        <button
                            onClick={() => handleDelete(role.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-6 w-6" />
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <RoleModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedRole(undefined);
        }}
        onSubmit={handleSubmit}
        role={selectedRole}
      />
    </div>
  );
};

export default Roles;