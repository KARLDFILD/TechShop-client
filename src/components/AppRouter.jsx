import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Shop from "../pages/Shop";
import { useContext, useEffect } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import ProtectedRoute from "./ProtectedRoute";
import { ADMIN_ROUTE } from "../utils/const";
import Admin from "../pages/Admin";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Shop />} />
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path={ADMIN_ROUTE} element={<Admin />} />
      </Route>
    </Routes>
  );
});

export default AppRouter;
