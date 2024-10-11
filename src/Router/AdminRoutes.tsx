import { Route, Routes } from "react-router-dom";
import { Profile, UserCreate, Users } from "../Pages/Users";
import { NotFound } from "../Pages/Auth";
import { Roles, RolesEdit, RolesCreate } from "../Pages/Rols";
import Tables from "../Pages/Tables/Tables"; 
import { Permission } from "../types";



interface AdminRoutesProps {
  permissions: Permission[];
}

// Función de utilidad para verificar permisos
const hasPermission = (
  permissions: Permission[],
  routeName: string
): boolean => {
  return permissions.some((permission) => permission.module.name === routeName);
};

export const AdminRoutes: React.FC<AdminRoutesProps> = ({ permissions }) => {
  return (
    <Routes>
      {hasPermission(permissions, "users") && (
        <>
          <Route path="users" element={<Users />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="users/profile/:id" element={<Profile />} />
        </>
      )}
      {hasPermission(permissions, "roles") && (
        <>
        <Route path="roles" element={<Roles />} />
        <Route path="/roles/:id" element={<Roles />} />
        <Route path="/roles/edit/:id" element={<RolesEdit />} />
        <Route path="/roles/create" element={<RolesCreate />} />
        </>
      )}
    
        <Route path="/tables" element={<Tables />} />
      
      
      <Route path="*" element={<NotFound />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};
