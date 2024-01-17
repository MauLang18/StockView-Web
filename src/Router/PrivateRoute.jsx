import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTokenStore } from "../tokenStore"; // Ajusta la ruta según tu estructura de archivos

export const PrivateRoute = ({ children }) => {
  const { state } = useLocation();
  const { bearerToken } = useTokenStore.getState();

  // Verifica si hay un token presente y si el estado de la sesión está marcado como autenticado
  return bearerToken && state?.logged ? children : <Navigate to="/login" />;
};
