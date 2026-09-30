import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export const Nav = () => {
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
          <li>
            <Link to="/carrito" className={styles.link}>Carrito</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};