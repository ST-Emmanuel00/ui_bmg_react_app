export interface Module {
  id: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string; 
}

export const initialModule: Module = {
  id: "",
  name: "",
  status: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
