import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; // Asegúrate de ajustar la ruta si es necesario

export const Item = ({ producto }) => {
  const { id, title, price, image } = producto;
  const { addItem } = useCart(); // Extraemos la función para agregar al carrito

  return (
    <div className={styles.card}>
      {/* Contenedor de la imagen */}
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      {/* Contenido de la tarjeta */}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>$ {price.toLocaleString()}</p>
        
        {/* Acciones: Botón de Carrito + Favorito */}
        <div className={styles.actionsContainer}>
          <button className={styles.favButton} title="Guardar en favoritos">
            ❤️
          </button>
          <button 
            className={styles.cartButton} 
            onClick={() => addToCart(producto, 1)}
          >
            🛒 Añadir al carrito
          </button>
        </div>

        {/* Enlace opcional para ver el detalle completo */}
        <Link to={`/producto/${id}`} className={styles.detailLink}>
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};