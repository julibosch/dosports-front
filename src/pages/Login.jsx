import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthProvider.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { login, usuario, autenticado } = useAuth();

  const handleSubmit = (e) => {
    login(e);
  }

  useEffect(() => {
    if (autenticado && usuario?.rol === "admin") {
      navigate("/productos");
    }
    if (autenticado && usuario?.rol === "cliente") {
      navigate("/clientes-productos");
    }
  }, [autenticado, usuario])
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Correo electronico</label>
        <input type="email" id='email' placeholder='email' />
        <label htmlFor="password">Contraseña</label>
        <input type="text" id='password' placeholder='contraseña' />
        <button>Iniciar sesión</button>
      </form>
      <Link to="/registrarse">Registrarse</Link>
    </div>
  )
}

export default Login