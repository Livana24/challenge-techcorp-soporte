import React from 'react';
import { useCart } from '../Components/context/CartContext';
import { formatCurrency } from '../Components/context/formatCurrency';

export const CarritoPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Cálculo seguro del total general asegurando que price y quantity sean números
  const totalGeneral = cart.reduce((acc, prod) => {
    const precio = Number(prod.price) || 0;
    const cantidad = Number(prod.quantity) || 0;
    return acc + precio * cantidad;
  }, 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Carrito de Compras</h2>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Carrito de Compras</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        {cart.map((producto) => {
          const precioUnitario = Number(producto.price) || 0;
          const subtotal = precioUnitario * (Number(producto.quantity) || 1);
          
          // CORREGIDO: Buscamos correctamente 'image' primero (como viene en tu JSON), luego 'img'
          const imagenSrc = producto.image || producto.img || 'https://via.placeholder.com/60';

          return (
            <div 
              key={producto.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                border: '1px solid #ccc', 
                padding: '1rem', 
                borderRadius: '8px',
                background: '#fff'
              }}
            >
              {/* Sección Izquierda: Imagen, Título y Tipo de Producto */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={imagenSrc} 
                  alt={producto.title} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{producto.title}</h4>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                    <strong>Tipo / Categoría:</strong> {producto.categoria || 'Indumentaria'}
                  </p>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                    <strong>Precio Unitario:</strong> {formatCurrency(precioUnitario)}
                  </p>
                </div>
              </div>

              {/* Sección Derecha: Cantidad, Subtotal y Botón */}
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>
                  <strong>Cantidad:</strong> {producto.quantity}
                </p>
                <p style={{ margin: '0 0 10px 0', color: '#059669', fontWeight: 'bold' }}>
                  Subtotal: {formatCurrency(subtotal)}
                </p>
                <button 
                  onClick={() => removeFromCart(producto.id)}
                  style={{ 
                    background: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    padding: '5px 10px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen Final */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
        <button 
          onClick={clearCart}
          style={{ 
            background: '#6b7280', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Vaciar Carrito
        </button>
        
        <h3>Total a Pagar: <span style={{ color: '#059669' }}>{formatCurrency(totalGeneral)}</span></h3>
      </div>
    </div>
  );
};