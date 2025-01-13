import axios from 'axios'; // Ensure axios is imported
import React, { useState, useEffect,useMemo } from 'react';
import { Alert, Severity } from "../../types/index"
import { FilterState } from "../../types/index"
import { AlertCard } from './AlertCard';
import { AlertCircle, Filter } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import emailjs from 'emailjs-com';

export function AlertDisplay({ activeTab }: AlertDisplayProps) {
  const dummyAlerts: Alert[] = [
    {
      id: '1',
      location: {
        city: 'New Delhi',
        area: 'Connaught Place',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      description: 'Lone woman surrounded by 3+ men showing fear.',
      severity: 'Critical',
      evidence: [
        {
          type: 'image',
          url: '/alertone.jpeg', // Updated path assuming the public folder
        },
      ],
      isAddressed: false,
    },
    {
      id: '2',
      location: {
        city: 'New Delhi',
        area: 'South Extension',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
      description: 'Small group of women uneasy in the presence of 3+ men.',
      severity: 'Red',
      evidence: [
        {
          type: 'image',
          url: '/alerttwo.jpg',
        },
      ],
      isAddressed: false,
    },
    {
      id: '3',
      location: {
        city: 'New Delhi',
        area: 'Karol Bagh',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
      description: 'A group of two women detected with neutral emotion in a dimly lit area.',
      severity: 'Moderate',
      evidence: [
        {
          type: 'image',
          url: '/aletthree.jpg',
        },
      ],
      isAddressed: false,
    },
  ];

      const currentOrganization = useMemo(
        () => JSON.parse(localStorage.getItem('currentOrganization') || '{}'),
        []
      );
  
  
  
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    severity: 'All',
    location: '',
    timeRange: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [alertResponses, setAlertResponses] = useState<{ [key: string]: any }>({});
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [emailSent, setEmailSent] = useState<{ [key: string]: boolean }>({});

  // Function to send dummy images to the backend
  // const sendDummyImages = async () => {
  //   const responses: { [key: string]: any } = {};
  //   const loadingState: { [key: string]: boolean } = {};
  //   console.log('Sending dummy images...');
  //   try {
  //     for (const alert of dummyAlerts) {
  //       if (alert.evidence?.length > 0) {
  //         loadingState[alert.id] = true; // Set loading state for each alert
  //         for (const evidence of alert.evidence) {
  //           if (evidence.type === 'image') {
  //             const imagePath = evidence.url;
  //             const imageFile = await fetch(imagePath)
  //               .then((res) => {
  //                 if (!res.ok) throw new Error(`Failed to fetch image: ${imagePath}`);
  //                 return res.blob();
  //               })
  //               .then((blob) => new File([blob], imagePath.split('/').pop() || 'dummy.jpg', { type: 'image/jpeg' }));

  //             const formData = new FormData();
  //             formData.append('file', imageFile);

  //             const res = await axios.post('/api/predict', formData, {
  //               headers: {
  //                 'Content-Type': 'multipart/form-data',
  //               },
  //             });
              
  //             responses[alert.id] = res.data.predictions; // Store response for each alert
  //           }
  //         }
  //       }
  //       loadingState[alert.id] = false; // Set loading state to false
  //     }
  //     setAlertResponses(responses); // Update state with responses
  //     console.log(responses);
  //   } catch (err) {
  //     console.error('Failed to send dummy images:', err);
  //   } finally {
  //     setLoadingStates(loadingState); // Update loading states
  //   }
  // };
  
  const fetchAlerts = async () => {
    try {
     
    
      setAlerts(dummyAlerts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch alerts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // Send dummy images when the component mounts
    // sendDummyImages();
  }, []);


  // const sendAlertEmail = async (alert: Alert) => {
  //   console.log(currentOrganization.email)
  //   const templateParams = {
  //     alert_location: alert.location.area,
  //     alert_description: alert.description,
  //     alert_severity: alert.severity,
  //     alert_time: new Date(alert.timestamp).toLocaleString(),
  //     user_email: currentOrganization.email, // Replace with dynamic email
  //   };

  //   try {
  //     await toast.promise(
        
  //       emailjs.send('service_m1q5lne', 'template_rlc9amc', templateParams),
  //       {
  //         loading: `Sending email to notify the organization...`,
  //         success: `Email sent successfully!`,
  //         error: `Failed to send email for alert ID ${alert.id}.`,
  //       },
 
        
  //     );

  //     // Mark this alert as having its email sent
  //     setEmailSent((prev) => ({ ...prev, [alert.id]: true }));
  //   } catch (err) {
  //     console.error(`Failed to send email for alert ID ${alert.id}:`, err);
  //   }
  // };


  const sendAlertEmail = async (alert) => {
    console.log(currentOrganization.email);
  
    const templateParams = {
      alert_location: alert.location.area,
      alert_description: alert.description,
      alert_severity: alert.severity,
      alert_time: new Date(alert.timestamp).toLocaleString(),
      user_email: currentOrganization.email, // Replace with dynamic email
    };
  
    // Mock email sending
    const mockEmailSend = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve(`Mock email sent successfully for service  and template `);
          } else {
            reject(new Error(`Mock email failed to send.`));
          }
        }, 1000); // Simulate network delay
      });
    };
  
    try {
      await toast.promise(
        mockEmailSend('service_m1q5lne', 'template_rlc9amc', templateParams),
        {
          loading: `Sending email to notify the organization...`,
          success: `Email sent successfully!`,
          error: `Failed to send email for alert ID ${alert.id}.`,
        }
      );
  
      // Mark this alert as having its email sent
      setEmailSent((prev) => ({ ...prev, [alert.id]: true }));
    } catch (err) {
      console.error(`Failed to send email for alert ID ${alert.id}:`, err);
    }
  };
  
  const processAlerts = async () => {
    for (const alert of dummyAlerts) {
      // Skip alerts for which the email has already been sent
      if (!emailSent[alert.id]) {
        await sendAlertEmail(alert);
      }
    }
  };

  useEffect(() => {
    if (alerts.length > 0) {
      processAlerts();
    }
  }, [alerts]);


  // The rest of the component remains unchanged


  const handleDismiss = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, isAddressed: true } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter((alert) => {
    // First filter by tab
    if (activeTab === 'addressed' && !alert.isAddressed) return false;
    if (activeTab === 'all' && alert.isAddressed) return false;

    // Then apply other filters
    if (filters.severity !== 'All' && alert.severity !== filters.severity)
      return false;
    if (
      filters.location &&
      !`${alert.location.city} ${alert.location.area}`
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    )
      return false;
    if (filters.timeRange !== 'all') {
      const alertDate = new Date(alert.timestamp);
      const now = new Date();
      const daysDiff =
        (now.getTime() - alertDate.getTime()) / (1000 * 60 * 60 * 24);

      if (filters.timeRange === 'today' && daysDiff > 1) return false;
      if (filters.timeRange === 'week' && daysDiff > 7) return false;
      if (filters.timeRange === 'month' && daysDiff > 30) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
            <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {activeTab === 'all' ? 'Current Alerts' : 'Addressed Alerts'}
        </h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4  rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.severity}
              onChange={(e) =>
                setFilters({ ...filters, severity: e.target.value as Severity | 'All' })
              }
            className="px-4 py-3 transition-all duration-300 border-[2px] rounded-md outline-indigo-500 text-gray-800"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="Red">Red</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>

            </select>

            <input
              type="text"
              placeholder="Filter by location..."
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-4 py-3 transition-all duration-300 border-[2px] rounded-md outline-indigo-500 text-gray-800"
            />

            <select
              value={filters.timeRange}
              onChange={(e) =>
                setFilters({ ...filters, timeRange: e.target.value as FilterState['timeRange'] })
              }
              className="px-4  py-3 transition-all duration-300 border-[2px] rounded-md outline-indigo-500 text-gray-800"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      )}

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-bold">No alerts found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
        <AlertCard
        key={alert.id}
        alert={alert}
        onDismiss={handleDismiss}
        response={alertResponses[alert.id]} // Pass response data
        loading={loadingStates[alert.id]} 
        
      />
          ))}
        </div>
      )}
    </div>
  );
}
