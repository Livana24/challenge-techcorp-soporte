import React from "react";
import styles from "./HeroBanner.module.css";

export const HeroBanner = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Video de fondo */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className={styles.backgroundVideo}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-stylish-woman-walking-in-the-street-41580-large.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Capa oscura semitransparente */}
      <div className={styles.overlay}></div>

      {/* Contenido de texto */}
      <div className={styles.content}>
        <h1 className={styles.title}>¡Bienvenidos a tu Tienda de Indumentaria!</h1>
        <p className={styles.subtitle}>Encuentra las últimas tendencias en moda para hombres, mujeres y niños.</p>
      </div>
    </div>
  );
};















