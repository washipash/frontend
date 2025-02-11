import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; 
import "../setting_lib/css/Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const { darkMode } = useTheme(); // Obtiene el estado del tema
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rol })
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();
      login();
      console.log("Respuesta de la API", data);
      navigate("/products");
    } catch (error) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className={`auth-container ${darkMode ? "dark" : ""}`}> 
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario/Correo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={rol} onChange={(e) => setRol(e.target.value)} required>
            <option value="">Selecciona un rol</option>
            <option value="ADMIN">Administrador</option>
            <option value="CLIENT">Cliente</option>
            <option value="VEND">Vendedor</option>
            <option value="SUPER">Supervisor de Venta</option>
          </select>
          <button type="submit">Ingresar</button>
        </form>
        <p>
          ¿No tienes cuenta?{" "}
          <button className="link-btn" onClick={() => navigate("/Register")}>
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
