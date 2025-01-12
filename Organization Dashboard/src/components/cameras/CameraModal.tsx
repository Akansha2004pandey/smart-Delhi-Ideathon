import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';


interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (camera: Partial<any>) => void;
  camera?: any;
}

const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  camera,
}) => {
  const currentOrganization = JSON.parse(
    localStorage.getItem('currentOrganization') || '{}'
  );

  const [showPass,setShowPass]=useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: currentOrganization.email || '',
    password: '',
    modelNumber: '',
    brand: '',
    ip: '',
    latitude: '',
    longitude: '',
    organizationAddress: currentOrganization.organizationAddress || '',
    status: 'active',
  });

  useEffect(() => {
    if (camera) {
      setFormData({
        name: camera.name,
        email: currentOrganization.email || '',
        password: camera.password, // Do not prefill passwords
        modelNumber: camera.modelNumber || '',
        brand: camera.brand || '',
        ip: camera.ip || '',
        latitude: camera.latitude || '',
        longitude: camera.longitude || '',
        organizationAddress: currentOrganization.organizationAddress || '',
        status: camera.status || 'active',
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        email: currentOrganization.email || '',
        organizationAddress: currentOrganization.organizationAddress || '',
      }));

      // Fetch geolocation for new cameras only
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData((prevData) => ({
              ...prevData,
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
            }));
          },
          (error) => {
            console.error('Error fetching location:', error.message);
          }
        );
      }
    }
  }, [camera]);

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    onSubmit(formData);
    onClose();
  }



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-6xl sm:p-6">
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
                {camera ? 'Edit Camera' : 'Add New Camera'}
              </h3>

              <form onSubmit={handleSubmit} className="mt-6  ">
                <div className='grid grid-cols-2 gap-x-32 gap-y-5'>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                    Camera Name
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

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                   Organization Email
                  </label>
                  <input
                    type="email"
                    id="email"

                    value={currentOrganization.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    readOnly
className="mt-1 block w-full rounded-md bg-gray-200 text-gray-600 shadow-sm border border-gray-300 focus:outline-none cursor-not-allowed text-lg py-2 px-3"
                    required
                  />
                </div>

                {/* Role */}
                {/* <div>
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
                </div> */}

                {/* Additional Fields */}
                <div>
                  <label htmlFor="modelNumber" className="block text-lg font-medium text-gray-700">
                    Model Number
                  </label>
                  <input
                    type="text"
                    id="modelNumber"
                    value={formData.modelNumber}
                    onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="brand" className="block text-lg font-medium text-gray-700">
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="ip" className="block text-lg font-medium text-gray-700">
                    IP Address
                  </label>
                  <input
                    type="text"
                    id="ip"
                    value={formData.ip}
                    onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                  />
                </div>

                <div>
  <label htmlFor="latitude" className="block text-lg font-medium text-gray-700">
    Latitude
  </label>
  <input
  type="text"
  id="latitude"
  value={formData.latitude}
  readOnly
  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
  className="mt-1 block w-full rounded-md bg-gray-200 text-gray-600 shadow-sm border border-gray-300 focus:outline-none cursor-not-allowed text-lg py-2 px-3"
/>

</div>

<div>
  <label htmlFor="longitude" className="block text-lg font-medium text-gray-700">
    Longitude
  </label>
  <input
  type="text"
  id="longitude"
  value={formData.longitude}
  readOnly
  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
  className="mt-1 block w-full rounded-md bg-gray-200 text-gray-600 shadow-sm border border-gray-300 focus:outline-none cursor-not-allowed text-lg py-2 px-3"
/>

</div>


                <div>
                  <label htmlFor="userName" className="block text-lg font-medium text-gray-700">
                    Organization Address
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={currentOrganization.organizationAddress}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    readOnly
                    className="mt-1 block w-full rounded-md bg-gray-200 text-gray-600 shadow-sm border border-gray-300 focus:outline-none cursor-not-allowed text-lg py-2 px-3"                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-lg font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg py-2 px-3 border outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

              
                  <div className=" ">
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                      Camera Password
                    </label>
                    <div className="relative w-full">
  <input
    type={showPass ? "text" : "password"}
    id="password"
    value={formData.password}
    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    className="mt-1 block w-full rounded-md bg-gray-50 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 text-lg py-2 px-4 border border-gray-300 outline-none"
    minLength={6}
  />
  <button
    type="button"
    onClick={() => setShowPass(!showPass)}
    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600 focus:outline-none"
  >
    {showPass ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
  </button>
</div>

                  </div>
                
                </div>

                {/* Buttons */}
                <div className='flex mt-4 justify-center items-center'>
                <div className="mt-5 sm:mt-4  justify-center items-center sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-lg"
                  >
                    {camera ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-lg"
                  >
                    Cancel
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;
