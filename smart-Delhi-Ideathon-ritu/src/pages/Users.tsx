import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus } from 'lucide-react';
import { RootState } from '../store';
import { setSearchQuery, deleteUser, toggleUserStatus, addUser, updateUser } from '../store/slices/usersSlice';
import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import { User } from '../types';

const Users = () => {
  const dispatch = useDispatch();
  const { users, searchQuery } = useSelector((state: RootState) => state.users);
  const { roles } = useSelector((state: RootState) => state.roles);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleToggleStatus = (id: string) => {
    dispatch(toggleUserStatus(id));
  };

  const handleSubmit = (userData: Partial<User>) => {
    if (selectedUser) {
      dispatch(updateUser({ ...selectedUser, ...userData }));
    } else {
      dispatch(addUser({ id: Date.now().toString(), ...userData } as User));
    }
    setShowModal(false);
    setSelectedUser(undefined);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-5xl font-black text-white">Users</h1>
          <p className="mt-2 text-md text-gray-100">
            Manage user accounts and their roles
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => {
              setSelectedUser(undefined);
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center rounded-md border border-none outline-none bg-indigo-800 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-indigo-900  focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
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
            placeholder="Search users..."
          />
        </div>
      </div>

      <UserTable
        users={filteredUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <UserModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedUser(undefined);
        }}
        onSubmit={handleSubmit}
        user={selectedUser}
        roles={roles}
      />
    </div>
  );
};

export default Users;