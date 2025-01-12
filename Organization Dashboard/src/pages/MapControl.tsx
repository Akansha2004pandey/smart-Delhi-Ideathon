
import Map from '../components/ui/Map';

const MapControl = () => {

  return (
    <div>
      <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
  <h1 className="text-5xl font-black text-white">Dynamic Surveillance Map</h1>
  <p className="mt-2 text-md text-gray-100 w-[75%]">
    Stay in control with real-time insights! Track your location and monitor your organization’s cameras with ease. Instantly differentiate between active and inactive cameras for smarter, faster decision-making.
  </p>
</div>

        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <Map/>
      </div>

 
    </div>
  );
};

export default MapControl;