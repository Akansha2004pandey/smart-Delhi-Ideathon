import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Shield, Edit2, Trash2, Plus } from 'lucide-react';
import { RootState } from '../store';
import { addRole, updateRole, deleteRole } from '../store/slices/rolesSlice';
import RoleModal from '../components/roles/RoleModal';
import { Role } from '../types';
import Map from '../components/ui/Map';

const MapControl = () => {
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
          <h1 className="text-5xl font-black text-white">Map</h1>

        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <Map/>
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

export default MapControl;