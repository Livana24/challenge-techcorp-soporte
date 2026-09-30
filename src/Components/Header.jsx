import React from 'react';
import styles from './Header.module.css'; // o como tengas tu archivo de estilos

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Tu contenido del header, logo, botones, etc. */}
      <div className={styles.logoContainer}>
        <span className={styles.logoIcon}>🛒</span>
        <div>
          <h1 className={styles.title}>Mi E-Commerce</h1>
          <p className={styles.subtitle}>Tienda Oficial</p>
        </div>
      </div>
      <div className={styles.actions}>
        <a href="#cart" className={styles.cartButton}>Carrito</a>
      </div>
    </header>
  );
};

// ¡ESTO ES LO QUE DEBES AGREGAR O CORREGIR AL FINAL!
export default Header;