// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './setting_lib/css/index.css';
// Páginas públicas
import { Home, Login, Register, Logout, NotFound } from './pages/pages';
// Páginas privadas y otros componentes
import { Sidebar, Order, Products, Reports, Statistics, Setting, Pagination } from './components/components';
import ProductDetail from './components/ProductDetail'; // Importa ProductDetail

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>  {/* Asegúrate de importar ThemeProvider desde ThemeContext */}
        <div className='flex'>
          <Sidebar />
          <div className='flex-grow p2'>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
              <Route path="/products2" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="/Statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
              <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
              <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

