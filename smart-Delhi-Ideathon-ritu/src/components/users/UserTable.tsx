import React from 'react';
import { User, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { User as UserType } from '../../types';

interface UserTableProps {
  users: UserType[];
  onEdit: (user: UserType) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 cursor-pointer">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Role
                  </th>
                  <th className="px-6 py-3.5 text-left text-md font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-md text-gray-900">
                      <div className="flex items-center">
                        <User className={`h-8 w-8 p-1 text-white rounded-full  ${user.status==='active'? 'bg-indigo-500' : 'bg-red-500'} mr-2`} />
                        {user.name}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.role.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 text-sm font-semibold leading-5 ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex justify-between">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => onEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 className="md:h-6 md:w-6 h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onToggleStatus(user.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {user.status === 'active' ? (
                            <ToggleRight className="md:h-6 md:w-6 h-5 w-5" />
                          ) : (
                            <ToggleLeft className="md:h-6 md:w-6 h-5 w-5" />
                          )}
                        </button>

                      </div>
                      <button
                          onClick={() => onDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="md:h-6 md:w-6 h-4 w-4 " />
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
  );
};

export default UserTable;