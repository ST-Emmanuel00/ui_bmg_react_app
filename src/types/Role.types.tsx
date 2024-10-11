// types.ts
export interface Privilege {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  roleId: string;
  moduleId: string;
  status: boolean;
  privilege: Privilege;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  module: Module;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  status: boolean;
  permissions?: Permission[];
  _count?: { users: number };
}

// Define initial role state with default values
export const initialRoleState = {
  id: '',
  name: '',
  description: '',
  status: false,
  createdAt: '',
  updatedAt: '',

};
