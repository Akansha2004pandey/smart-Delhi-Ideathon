import React, { useEffect, useState,useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X 
} from 'lucide-react';
import { Alert, Severity } from '../types/alert';
import emailjs from 'emailjs-com';
import toast, { Toaster } from 'react-hot-toast';

const severityColors: Record<Severity, string> = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800',
};

const alertStyles = {
  Critical: {
    bg: 'bg-[#FFEBEB]', // Light red background
    border: 'border-[#FF0000]', // Intense red border
    icon: AlertCircle, // Icon for critical alerts
  },
  Red: {
    bg: 'bg-[#FFF1E8]', // Light orange-red background
    border: 'border-[#FF4500]', // Orange-red border
    icon: AlertTriangle, // Icon for red alerts
  },
  High: {
    bg: 'bg-[#FFE8E8]', // Light red-pink background
    border: 'border-[#FF4D4D]', // Bright red border
    icon: AlertCircle, // Icon for high alerts
  },
  Moderate: {
    bg: 'bg-[#FFF8E8]', // Light yellow-orange background
    border: 'border-[#FFB84D]', // Bright orange border
    icon: AlertTriangle, // Icon for medium alerts
  },
  Low: {
    bg: 'bg-[#E8FFE8]', // Light green background
    border: 'border-[#4DFF4D]', // Bright green border
    icon: CheckCircle, // Icon for low alerts
  },
  Info: {
    bg: 'bg-[#E8F4FF]', // Light blue background
    border: 'border-[#4D94FF]', // Bright blue border
    icon: Info, // Icon for informational alerts
  },
};


interface AlertCardProps {
  alert: Alert;
  onMarkAddressed: (id: string) => void;
  onDismiss: (id: string) => void;
  response: any;
  loading: boolean;
}

export function AlertCard({ alert, onDismiss,response,loading }: AlertCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

 

  const style = alertStyles[alert.severity];

  

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (alert.isAddressed) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    setIsDismissing(true);
    setTimeout(() => onDismiss(alert.id), 400);
  };








  return (
    <>
      
    <div
      className={`
        relative border rounded-lg p-4 mb-4
        
        ${style.bg} ${style.border}
        transform transition-all duration-300 ease-in-out
        hover:translate-x-1 hover:shadow-md
        ${isDismissing ? 'animate-slide-out opacity-0' : 'animate-fade-in'}
        ${isShaking ? 'animate-shake' : ''}
       ${isExpanded? "ease-in-out duration-500":""} 


      `}
      onClick={() => setIsExpanded(!isExpanded)}
      role="alert"
    >

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-sm font-medium  bg-white`}>
              {alert.severity}
            </span>
            <span className="text-gray-500">
              <Clock className="w-4 h-4 inline mr-1" />
              {new Date(alert.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 flex items-start">
            <MapPin className="w-4 h-4 text-gray-500 mt-1 mr-2" />
            <p className="text-gray-700">
              {alert.location.city}, {alert.location.area}
            </p>
          </div>
          <p className="mt-4 text-gray-600">{alert.description}</p>
        </div>
        <div className="ml-4 flex flex-col items-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-black/5 rounded-full transition-colors duration-200 mt-2"
            aria-label="Dismiss alert"
          >
            {alert.isAddressed ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                Addressed
              </span>
            ) : (
             null
            )}
          </button>
        </div>
      </div>

      {isExpanded && alert.evidence && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence</h4>
          <div className="grid grid-cols-2 gap-4">
          {alert.evidence.map((item:any, index:any) => (
              <div key={index} className="rounded-lg w-full h-96 overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt="Evidence"
                    className="object-cover w-full h-full"
                  />
                ) : item.type === 'video' ? (
                  <video
                    src={item.url}
                    controls
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <p className="text-gray-600">Unsupported media type</p>
                  </div>
                )}
              </div>
            ))}
             {/* {loading ? (
        <div>Loading prediction...</div>
      ) : response ? (
        <div>Prediction: {response.prediction}</div> // Customize based on actual response structure
      ) : (
        <div>No prediction available.</div>
      )} */}
          </div>
        </div>
      )}

      {!alert.isAddressed && (
        <button
        onClick={handleDismiss}
          className="mt-4 flex items-center text-indigo-600 hover:text-indigo-700"
        >
          <CheckCircle2 className="w-4 h-4 mr-1" />
          Mark as Addressed
        </button>
      )}
    </div>
    </>
  );
}
