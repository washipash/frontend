// src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  if (!product)
    return <div className="flex justify-center items-center h-screen">Producto no encontrado</div>;

  return (
    <div
      className={`pt-20 h-[100vh] py-10 px-10 flex flex-col justify-center items-center $${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="w-[65vw] rounded overflow-hidden shadow-2xl p-6 ">
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <img src={product.image} alt={product.title} className="w-48 h-48 object-contain mb-4" />
        <p className="mb-4">{product.description}</p>
        <p className="text-xl font-semibold">Precio: ${product.price}</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver a Productos
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
