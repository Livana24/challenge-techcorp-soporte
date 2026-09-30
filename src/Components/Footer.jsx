import React from 'react';
import styles from './Footer.module.css';

 const Footer = () => {
  // Arreglo con las tarjetas de al menos 3 personas del equipo
  const equipo = [
    { id: 1, nombre: 'Ana Gómez', rol: 'Desarrolladora Frontend', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60' },
    { id: 2, nombre: 'Carlos López', rol: 'Diseñador UI/UX', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60' },
    { id: 3, nombre: 'María Rodríguez', rol: 'Project Manager', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=60' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Sección 1: Información de la Empresa y Políticas */}
        <div className={styles.column}>
          <h3>Información Corporativa</h3>
          <p>© 2026 Mi E-Commerce S.A. Todos los derechos reservados.</p>
          <ul className={styles.linksList}>
            <li><a href="#privacidad">Políticas de Privacidad</a></li>
            <li><a href="#terminos">Términos y Condiciones</a></li>
            <li><a href="#contacto">Contacto: soporte@tienda.com</a></li>
          </ul>
        </div>

        {/* Sección 2: Sucursales y Newsletter */}
        <div className={styles.column}>
          <h3>Sucursales & Novedades</h3>
          <p><strong>Casa Central:</strong> Av. Libertador 1234, Cordoba.</p>
          <p><strong>Sucursal CABA:</strong> Av. Corrientes 567, Buenos Aires.</p>
          <div className={styles.newsletter}>
            <span>Suscribite al Newsletter:</span>
            <input type="email" placeholder="Tu correo electrónico" />
            <button>Enviar</button>
          </div>
        </div>

        {/* Sección 3: Tarjetas del Equipo de Trabajo */}
        <div className={styles.column}>
          <h3>Nuestro Equipo</h3>
          <div className={styles.teamGrid}>
            {equipo.map((miembro) => (
              <div key={miembro.id} className={styles.card}>
                <img src={miembro.img} alt={miembro.nombre} className={styles.cardImg} />
                <div className={styles.cardInfo}>
                  <p className={styles.cardName}>{miembro.nombre}</p>
                  <span className={styles.cardRole}>{miembro.rol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;