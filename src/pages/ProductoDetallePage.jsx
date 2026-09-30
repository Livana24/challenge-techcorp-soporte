import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../Components/context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";
import styles from "./ProductoDetallePage.module.css";

export const ProductoDetallePage = () => {
  const { id } = useParams(); // Captura el ID del producto desde la URL (ej: /producto/3)
  const { addToCart } = useCart();
  
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulamos la carga del producto (puede ser un fetch a tu API o productos.json)
  useEffect(() => {
    fetch('/productos.json')
      .then((res) => res.json())
      .then((data) => {
        // Buscamos el producto que coincide con el ID de la URL
        const encontrado = data.find((item) => item.id.toString() === id);
        setProducto(encontrado);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el detalle:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className={styles.detailCard}><p>Cargando detalles...</p></div>;
  }

  if (!producto) {
    return (
      <div className={styles.detailCard}>
        <h2>Producto no encontrado</h2>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className={styles.detailCard}>
      <div className={styles.imageContainer}>
        <img src={producto.image} alt={producto.title} className={styles.image} />
      </div>
      
      <div className={styles.infoContainer}>
        <h2>{producto.title}</h2>
        <p className={styles.category}>Categoría: {producto.categoria || "General"}</p>
        <p className={styles.description}>{producto.description || "Sin descripción detallada."}</p>
        
        {/* Usamos tu utilidad de formato de moneda */}
        <p className={styles.priceTag}>{formatCurrency(producto.price)}</p>
        
        <button 
          onClick={() => addToCart(producto, 1)}
          className={styles.button}
        >
          Agregar al Carrito
        </button>
        
        <br />
        <Link to="/productos" className={styles.backLink}>← Volver a productos</Link>
      </div>
    </div>
  );
};