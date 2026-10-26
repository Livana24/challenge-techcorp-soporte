import React from 'react';
import Cupon from './Cupon'; // Opcional: si quieres mostrar los cupones dentro de la sección de contacto

const Contacto = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Sección de Contacto</h1>
      <p>¿Tienes dudas con tu compra en Trapezio? ¡Escríbenos!</p>
      
      {/* Aquí puedes renderizar tu componente de cupones o formularios */}
      <Cupon />
    </div>
  );
};

export default Contacto;