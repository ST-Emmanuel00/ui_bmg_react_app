import React, { useState, createContext, ReactNode, useEffect } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  iduser: string ;
  setIduser: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  RoleId: string;
  setRoleId: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [iduser, setIduser] = useState<any>(() => localStorage.getItem('iduser') || null);
  const [token, setToken] = useState<string>(() => localStorage.getItem('token') || '');
  const [RoleId, setRoleId] = useState<string>(() => localStorage.getItem('RoleId') || '');
  const isLoading = false; // Puedes ajustar esto según tus necesidades

  useEffect(() => {
    if (iduser) {
      localStorage.setItem('iduser', iduser);
    } else {
      localStorage.removeItem('iduser');
    }
  }, [iduser]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (RoleId) {
      localStorage.setItem('RoleId', RoleId);
    } else {
      localStorage.removeItem('RoleId');
    }
  }, [RoleId]);

  const authContextValue = {
    iduser,
    setIduser,
    token,
    setToken,
    RoleId,
    setRoleId,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
