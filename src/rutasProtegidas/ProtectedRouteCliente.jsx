import { Navigate, Outlet, Route } from "react-router-dom"
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";


const ProtectedRouteClientes = () => {
  const { autenticado, usuario } = useAuth();

  //Si entra en esta ruta y no esta cargando y no esta autenticado manda al login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Outlet/>
  );
};

export default ProtectedRouteClientes