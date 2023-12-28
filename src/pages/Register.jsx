import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthProvider.jsx';

const Register = () => {
  const { registrarUsuario } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const nombreUsuario = e.target.nombreUsuario.value;

    registrarUsuario(email, password, nombreUsuario);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Nombre de usuario</label>
        <input type="text" id="nombreUsuario" placeholder="nombre de usuario" />
        <label>Correo electronico</label>
        <input type="email" id="email" placeholder="email" />
        <label htmlFor="contraseña">Contraseña</label>
        <input type="text" id="password" placeholder="contraseña" />
        <button>Registrarse</button>
      </form>
      <Link to="/login">Iniciar sesion</Link>
    </div>
  );
};

export default Register;
