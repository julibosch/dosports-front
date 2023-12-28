import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const { autenticado, usuario } = useAuth();

  //Si entra en esta ruta y no esta cargando y no esta autenticado manda al login
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Outlet/> 
  );
};

export default ProtectedRoute