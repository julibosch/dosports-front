import "./App.css";
import Home from "./pages/home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Productos from "./pages/Productos.jsx";
import ClientesProductos from "./pages/ClientesProductos.jsx";

import ProtectedRoute from "./rutasProtegidas/ProtectedRoute.jsx";
import ProtectedRouteClientes from "./rutasProtegidas/ProtectedRouteCliente.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrarse" element={<Register />} />
            {/* Rutas privadas */}
            <Route element={<ProtectedRoute  />}>
              <Route path="/productos" element={<Productos />} />
            </Route>
            <Route element={<ProtectedRouteClientes/>}>
              <Route path="/clientes-productos" element={<ClientesProductos />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
