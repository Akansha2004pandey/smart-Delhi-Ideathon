import React from 'react';
import { Shield } from 'lucide-react';
import { Permission } from '../../types';

interface PermissionSelectProps {
  selectedPermissions: Permission[];
  onPermissionChange: (permissions: Permission[]) => void;
}

const availablePermissions: Permission[] = [
  { id: '1', name: 'Create Users', description: 'Can create new users', module: 'Users' },
  { id: '2', name: 'Edit Users', description: 'Can modify user details', module: 'Users' },
  { id: '3', name: 'Delete Users', description: 'Can remove users', module: 'Users' },
  { id: '4', name: 'View Users', description: 'Can view user list', module: 'Users' },
  { id: '5', name: 'Manage Roles', description: 'Can manage roles', module: 'Roles' },
  { id: '6', name: 'Assign Roles', description: 'Can assign roles to users', module: 'Roles' },
  { id: '7', name: 'View Dashboard', description: 'Can view dashboard', module: 'Dashboard' },
  { id: '8', name: 'System Settings', description: 'Can modify system settings', module: 'Settings' },
];

const PermissionSelect: React.FC<PermissionSelectProps> = ({
  selectedPermissions,
  onPermissionChange,
}) => {
  const modules = [...new Set(availablePermissions.map(p => p.module))];

  const handlePermissionToggle = (permission: Permission) => {
    const isSelected = selectedPermissions.some(p => p.id === permission.id);
    if (isSelected) {
      onPermissionChange(selectedPermissions.filter(p => p.id !== permission.id));
    } else {
      onPermissionChange([...selectedPermissions, permission]);
    }
  };

  return (
    <div className="space-y-6">
      {modules.map(module => (
        <div key={module} className="space-y-3">
          <h4 className="text-xl font-medium text-gray-900 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-gray-400  " />
            {module} Permissions
          </h4>

  <hr className="border-0 h-0.5 bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300 rounded-full md:w-1/2" />





          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {availablePermissions
              .filter(permission => permission.module === module)
              .map(permission => (
                <label
                  key={permission.id}
                  className="relative flex items-start py-2"
                >
                  <div className="min-w-0 flex-1 text-sm">
                    <div className="select-none font-medium text-md text-gray-700">
                      {permission.name}
                    </div>
                    <p className="text-gray-500">{permission.description}</p>
                  </div>
                  <div className="ml-3 flex h-6 items-center">
  <input
    type="checkbox"
    checked={selectedPermissions.some(p => p.id === permission.id)}
    onChange={() => handlePermissionToggle(permission)}
    className="h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-indigo-500 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
  />
</div>


                </label>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionSelect;