export interface User {
  id: string;
  name: string;
  email: string;
  userID: string;
  status: 'active' | 'inactive';
  createdAt: string;
  modelNumber:string|number;
  brand:string;
  ip:string;
  latitude:String;
  longitude:String;
  organizationAddress:string;
  password:string;
}

export interface Camera {
  id: string;
  name: string;
  email: string;
  modelNumber: string;
  brand: string;
  ip: string;
  latitude: string;
  longitude: string;
  organizationAddress: string;
  status: string;
  password: string;
  createdAt: string;
}


export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}



export type Severity = 'High' | 'Medium' | 'Low';

export interface Alert {
  id: string;
  location: {
    city: string;
    area: string;
  };
  timestamp: string;
  description: string;
  severity: Severity;
  evidence?: {
    type: 'image' | 'video';
    url: string;
  }[];
  isAddressed: boolean;
}

export interface FilterState {
  severity: string;
  location: string;
  timeRange: 'all' | 'today' | 'week' | 'month';
}

export interface AlertDisplayProps {
  activeTab: string;
}