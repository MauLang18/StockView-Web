// PrivateRoute.js
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTokenStore } from "../tokenStore"; // Ajusta la ruta según tu estructura de archivos
import Home from "../Pages/Home";
import About from "../Pages/About";
import Settings from "../Pages/Settings";
import LoginPage from "../Pages/Auth";

export const PrivateRoute = ({ element }) => {
  const { bearerToken } = useTokenStore.getState();

  // Verifica si hay un token presente antes de renderizar las rutas privadas
  return bearerToken ? element : <Navigate to="/login" />;
};

// AppRouter.js
export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/inventory"
          element={<PrivateRoute element={<About />} />}
        />
        <Route
          path="/history"
          element={<PrivateRoute element={<Settings />} />}
        />
      </Routes>
    </>
  );
};
