import { Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./Router";
import { AdminLayout } from "./Layout";
import { AuthProvider, SocketProvider } from './Providers';

export const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="/admin/*" element={<SocketProvider><AdminLayout /></SocketProvider>} />
        </Routes>
      </AuthProvider>
    </>
  );
};
