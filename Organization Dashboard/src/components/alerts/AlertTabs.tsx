import React, { useState } from 'react';
import { AlertDisplay } from './AlertDisplay';
import { LayoutList, List, ListChecks, ListChecksIcon, Menu, Tablets, TabletSmartphone } from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All Alerts' },
  { id: 'addressed', label: 'Addressed Alerts' }
];

export function AlertTabs() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="w-full  ">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Alert tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-6 font-medium text-lg border-b-2 transition-colors duration-200
                 outline-none 
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {
                tab.id === 'all' ?  <List className="w-5 h-5 inline-block mr-2" /> :<ListChecks className="w-5 h-5 inline-block mr-2" />
              }
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-4">
        <AlertDisplay activeTab={activeTab} />
      </div>
    </div>
  );
}