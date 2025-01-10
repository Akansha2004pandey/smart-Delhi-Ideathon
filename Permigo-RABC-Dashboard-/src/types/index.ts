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