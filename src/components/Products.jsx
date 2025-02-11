// src/components/Products.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Pagination from "./Pagination";
import { useTheme } from "../context/ThemeContext";

function Products() {
  const [data, setData] = useState([]); // Estado para los productos
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [pageSize, setPageSize] = useState(10); // Número de registros por página
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en response");
        }
        return response.json();
      })
      .then(response => {
        setData(response);
        setTotalPages(Math.ceil(response.length / pageSize));
        setError('');
      })
      .catch(error => {
        setError(error.message);
      });
  }, [pageSize]);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    // Buscar coincidencia parcial en el título, ignorando mayúsculas
    const foundProduct = data.find(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (foundProduct) {
      navigate(`/products/${foundProduct.id}`);
    } else {
      setSearchError("Producto no encontrado");
    }
  };

  if (data.length === 0) {
    return <h1 className="flex justify-center py-4">Loading...</h1>;
  }

  return (
    <div
      className={`pt-20 h-[100vh] py-10 px-10 flex flex-col justify-center items-center ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className={"w-[65vw] rounded overflow-hidden shadow-2xl flex flex-col gap-8 px-2 flex-grow "}>
        <div className="font-Oswald items-center py-4 px-10 flex flex-col flex-grow">
          {error && <div className="text-purple-800">{error}</div>}
          <h2 className="text-2xl font-bold mb-4">PRODUCTOS</h2>
          
          {/* Formulario de búsqueda */}
          <form onSubmit={handleSearch} className="mb-4 w-full flex items-center">
            <input 
              type="text" 
              placeholder="Buscar producto por nombre..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="flex-grow p-2 border border-gray-300 rounded-l "
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
              Buscar
            </button>
          </form>
          {searchError && <div className="text-red-600 mb-4">{searchError}</div>}
          
          {/* Lista de productos */}
          <div className="flex-grow overflow-y-auto w-full">
            {currentItems.map((product) => (
              <div key={product.id} className="py-2 border-b">
                {/* Al hacer clic en el nombre, se redirige al detalle */}
                <Link to={`/products/${product.id}`} className="hover:underline">
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
          
          {/* Paginación */}
          <div className="mt-4 w-full">
            <Pagination
              numberPage={currentPage}
              numberTotalPages={totalPages}
              changeFirstPage={handleFirstPage}
              changePreviousPage={handlePreviousPage}
              changeNextPage={handleNextPage}
              changeLastPage={handleLastPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
