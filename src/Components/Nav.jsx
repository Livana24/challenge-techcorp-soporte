import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { useCarrito } from './context/CartContext';
import React from 'react';

export const Nav = () => {
  // Consumimos el carrito desde el contexto
  const { carrito } = useCarrito();

  // Calculamos la cantidad total de items sumando la propiedad 'quantity' de cada uno
  const totalItems = carrito.reduce((acc, prod) => acc + (Number(prod.quantity) || 0), 0);
  return (
    <section className={styles.header}>
      <h1 className={styles.logo}><span>TRAPEZIO</span></h1>
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.link}>Inicio</Link>
          </li>
          <li>
            <Link to="/productos" className={styles.link}>Productos</Link>
          </li>
         {/*
          <li>
            <Link to="/carrito" className={styles.link}>Carrito</Link>
          </li>
         */} 
         <li>
  <Link to="/carrito" className={styles.link}>
    <svg
      className={styles.icono}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
    {totalItems > 0 && (
                <span style={{ 
                  background: '#ef4444', 
                  color: 'white', 
                  borderRadius: '50%', 
                  padding: '2px 6px', 
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {totalItems}
                </span>
              )}
  </Link>
</li>
        </ul>
      </nav>
    </section>
  );
};