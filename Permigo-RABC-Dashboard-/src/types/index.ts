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
  latitude:number;
  longitude:number;
  userName:string;
  password:string;
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