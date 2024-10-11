import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AlertHandler, Aside, Footer, LoadingView, Navbar } from "../components";
import { useAuth, useAxios } from "../Hooks";
import { initialPermission, initialUserState, Permission, User } from "../types";
import { AdminRoutes } from "../Router";
import { tableStore } from "../Store/TableStore";
import { Provider } from "react-redux";
import Carousel from "../components/Carousel/Carousel";
import { SocketContext } from "../Providers";
import ButtonsCarousel from "../components/Carousel/ButtonsCarousel"; // Importar el nuevo componente

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { iduser } = useAuth();
  const { response, hasError, isLoading, get } = useAxios();
  const { delete: deleteRequest } = useAxios();
  const [user, setUser] = useState<User>(initialUserState);
  const [permissions, setPermissions] = useState<Permission[]>(initialPermission);
  const [showCarousel, setShowCarousel] = useState(true);
  const socket = useContext(SocketContext);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    get(`auth/user/${iduser}`);
  }, [iduser]);

  useEffect(() => {
    if (response) {
      setUser(response?.info?.user as User);
      setPermissions(response?.info?.modules as Permission[]);
    }
  }, [response]);

  const LogOut = async () => {
    await deleteRequest(`auth/logout`);
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <Provider store={tableStore}>
      <AlertHandler response={response} hasError={hasError} redirec={true} />
      {isLoading ? (
        <LoadingView />
      ) : hasError ? (
        <Navigate to="/" replace />
      ) : (
        <div className="flex h-screen overflow-hidden dark:bg-slate-900">
          {permissions.length > 0 && <Aside permissions={permissions} />}
          <div className="flex flex-col flex-1 min-w-0">
            <Navbar user={user} onClick={LogOut} />

            <div className="flex-1 overflow-auto p-0 relative">
            
              <ButtonsCarousel showCarousel={showCarousel} setShowCarousel={setShowCarousel} />
              {showCarousel && <Carousel />}

              {/* Rutas del administrador */}
              <AdminRoutes permissions={permissions} />
              <Footer />
            </div>
          </div>
        </div>
      )}
    </Provider>
  );
};