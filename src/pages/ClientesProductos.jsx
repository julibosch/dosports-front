import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";

const ClientesProductos = () => {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    cerrarSesion();
    navigate("/");
  };
  return (
    <div>
      <h1>Clientes productos</h1>
      <button onClick={handleClick}>Salir del sistema</button>

    </div>
  )
}

export default ClientesProductos