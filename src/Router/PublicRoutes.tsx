import { Route, Routes } from "react-router-dom";

// import { Roles } from "../Pages/Rols";

import {
  LogIn,
  NotFound,
  RecoveryCode,
  RecoveryEmail,
  RecoveryPassword,
  Welcome,
} from "../Pages/Auth";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/welcome/:token" element={<Welcome />} />
      <Route path="/reset-password/:token" element={<RecoveryPassword />} />
      <Route path="/password-reset" element={<RecoveryEmail />} />
      <Route path="/verify-code/:token" element={<RecoveryCode />} />
      {/* <Route path="/roles" element={< Roles/>} /> */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};
