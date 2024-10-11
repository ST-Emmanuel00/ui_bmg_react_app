import { initialModule, Module } from "./modules.types";

export interface Permission {
  id: string;
  status: boolean;
  privilege: string;
  module: Module;
}

export const initialPermission: Permission[] = [
  {
    id: "",
    status: false,
    privilege: "",
    module: initialModule,
  },
];
