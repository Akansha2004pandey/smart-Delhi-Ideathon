import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ShowDetails = ({ details }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <Card className="shadow-sm border border-gray-200 rounded-md bg-white">
        <CardContent>
          <form className="space-y-4">
            <div className="flex justify-between items-center mt-4">
              <label htmlFor="name" className="font-medium text-gray-700 text-sm">Name:</label>
              <input
                type="text"
                id="name"
                value={details.name}
                disabled
                className="text-gray-600 text-sm bg-gray-100 p-1 rounded-sm border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="phone" className="font-medium text-gray-700 text-sm">Phone:</label>
              <input
                type="text"
                id="phone"
                value={details.phone}
                disabled
                className="text-gray-600 text-sm bg-gray-100 p-1 rounded-sm border border-gray-300"
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="address" className="font-medium text-gray-700 text-sm">Email:</label>
              <input
                type="text"
                id="address"
                value={details.email}
                disabled
                className="text-gray-600 text-sm bg-gray-100 p-1 rounded-sm border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="gender" className="font-medium text-gray-700 text-sm">Gender:</label>
              <input
                type="text"
                id="gender"
                value={details.gender}
                disabled
                className="text-gray-600 text-sm bg-gray-100 p-1 rounded-sm border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="age" className="font-medium text-gray-700 text-sm">Age:</label>
              <input
                type="text"
                id="age"
                value={details.age}
                disabled
                className="text-gray-600 text-sm bg-gray-100 p-1 rounded-sm border border-gray-300"
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="address" className="font-medium text-gray-700 text-sm">Address:</label>
              <input
                type="text"
                id="address"
                value={details.address}
                disabled
                className="text-gray-600 text-sm bg-gray-100 p-1 rounded-sm border border-gray-300"
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowDetails;
