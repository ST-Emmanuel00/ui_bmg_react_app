import { useContext } from 'react';
import { AuthContext } from '../Providers/auth.context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
