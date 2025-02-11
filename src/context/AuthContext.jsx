import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Buscar usuario en la "base de datos"
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const register = (name, lastname, email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el correo ya está registrado
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      return false;
    }

    // Crear nuevo usuario con rol "cliente"
    const newUser = { name, lastname, email, password, role: "Cliente" };
    users.push(newUser);

    // Guardar usuario en localStorage (simulación de base de datos)
    localStorage.setItem("users", JSON.stringify(users));

    // Autenticar automáticamente al usuario
    setIsAuthenticated(true);

    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


/*
// src/AuthContext.js  
import React, { createContext, useContext, useState } from 'react';  

const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);  

  const login = () => {  
    setIsAuthenticated(true);  
  };  

  const logout = () => {  
    setIsAuthenticated(false);  
  };  

  return (  
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>  
      {children}  
    </AuthContext.Provider>  
  );  
};  

export const useAuth = () => {  
  return useContext(AuthContext);  
}; 
*/
