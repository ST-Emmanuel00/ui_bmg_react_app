import { initialRoleState, Role } from "./Role.types";

export interface User  {
  id: string;
  name: string;
  lastName: string;
  docType: string;
  docNumber: string;
  sex: string;
  email: string;
  phoneNumber: string;
  password: string;
  birthday: Date;
  online?: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  roleId: string;
  role?: Role; // Debe ser role
}

export interface UserCreateI extends Omit<User, 'id'> {
  passwordConfirmation: string;
}

export interface UserOpcional extends Partial<User> {}


export const initialUserState = {
  id: '',
  name: '',
  lastName: '',
  docType: '',
  docNumber: '',
  sex: 'Female',
  email: '',
  phoneNumber: '',
  password: '',
  birthday: new Date,
  status: false,
  roleId: '',
  createdAt: '',
  updatedAt: '',
  role: initialRoleState
};


