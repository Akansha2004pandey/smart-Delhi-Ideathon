import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Shield, Plus, Edit2, Trash2, Clock, Search } from 'lucide-react';
import { RootState } from '../store';
import { setSearchQuery, addPermission, updatePermission, deletePermission } from '../store/slices/permissionsSlice';
import PermissionModal from '../components/permissions/PermissionModal';
import AuditLog from '../components/permissions/AuditLog';
import { Permission } from '../types';

const Permissions = () => {
  const dispatch = useDispatch();
  const { permissions, searchQuery, auditLog } = useSelector((state: RootState) => state.permissions);
  const [showModal, setShowModal] = React.useState(false);
  const [showAuditLog, setShowAuditLog] = React.useState(false);
  const [selectedPermission, setSelectedPermission] = React.useState<Permission | undefined>();

  const modules = [...new Set(permissions.map(p => p.module))];

  const handleEdit = (permission: Permission) => {
    setSelectedPermission(permission);
    setShowModal(true);
  };

  const handleDelete = (permission: Permission) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      dispatch(deletePermission(permission));
    }
  };

  const handleSubmit = (permissionData: Partial<Permission>) => {
    if (selectedPermission) {
      dispatch(updatePermission({ ...selectedPermission, ...permissionData } as Permission));
    } else {
      dispatch(addPermission({
        id: Date.now().toString(),
        ...permissionData,
      } as Permission));
    }
    setShowModal(false);
    setSelectedPermission(undefined);
  };

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    permission.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-5xl text-white font-black">Permissions</h1>
          <p className="mt-2 text-sm text-gray-50">
            Manage system permissions and access controls
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex space-x-3">
          <button
            onClick={() => setShowAuditLog(true)}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50  sm:w-auto"
          >
            <Clock className="h-6 w-6 mr-2" />
            View Audit Log
          </button>
          <button
            onClick={() => {
              setSelectedPermission(undefined);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-900  sm:w-auto"
          >
            <Plus className="h-6 w-6 mr-2" />
            Add Permission
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
          placeholder="Search permissions..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg outline-none px-3 py-2"
        />
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {modules.map(module => {
          const modulePermissions = filteredPermissions.filter(p => p.module === module);
          if (modulePermissions.length === 0) return null;

          return (
            <div key={module} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-xl leading-6 font-medium text-gray-900 flex items-center">
                <Shield className="h-8 w-8 text-white rounded-full p-1 mr-2 bg-yellow-400" />
                  {module}
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {modulePermissions.map(permission => (
                  <div
                    key={permission.id}
                    className="px-4 py-4 sm:px-6 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {permission.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">
                          {permission.description}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center space-x-4">
                        <button
                          onClick={() => handleEdit(permission)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => handleDelete(permission)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <PermissionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPermission(undefined);
        }}
        onSubmit={handleSubmit}
        permission={selectedPermission}
      />

      <AuditLog
        isOpen={showAuditLog}
        onClose={() => setShowAuditLog(false)}
        logs={auditLog}
      />
    </div>
  );
};

export default Permissions;