import React from 'react'
import { AlertTabs } from '../components/alerts/AlertTabs';
import PredictComponent from '../components/ui/PredictionComponent';

const Alerts = () => {
  return (
    <div>
      <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
  <h1 className="text-5xl font-black text-white">Alerts & Notifications</h1>
  <p className="mt-2 text-md text-gray-100 w-[75%]">
    Stay informed and take immediate action with real-time alerts. Get notifications about potential threats, camera malfunctions, or unusual activities. Our intelligent system prioritizes critical alerts, ensuring you never miss what matters most.
  </p>
</div>


        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          
        </div>
      </div>

      <div className="mt-8 bg-gray-50  rounded-lg  flex flex-col">
        <AlertTabs/>
        {/* <PredictComponent/> */}
      </div>

 
    </div>
  );
};


export default Alerts