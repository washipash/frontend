import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../setting_lib/css/Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const success = register(name, lastname, email, password);
    if (success) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/Login"); // Redirigir a la página de inicio de sesión
    } else {
      alert("El correo ya está registrado.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta?  
          <button className="link-btn" onClick={() => navigate("/Login")}>
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
