import React from 'react';
import { useCarrito } from '../Components/context/CartContext'; // O el archivo donde esté tu contexto
import { formatCurrency } from '../Components/context/formatCurrency';

export const CarritoPage = () => {
  const { 
    carrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    incrementarCantidad, 
    decrementarCantidad 
  } = useCarrito();

  // Cálculo seguro usando 'price' y 'quantity' como vienen en tu JSON
  const totalGeneral = carrito.reduce((acc, prod) => {
    const precio = Number(prod.price) || 0;
    const cantidad = Number(prod.quantity) || 0;
    return acc + precio * cantidad;
  }, 0);

  if (carrito.length === 0) {
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
        {carrito.map((producto) => {
          const precioUnitario = Number(producto.price) || 0;
          const cantidad = Number(producto.quantity) || 0;
          const subtotal = precioUnitario * cantidad;
          
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
              {/* Sección Izquierda: Imagen, Título y Precio Unitario */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={imagenSrc} 
                  alt={producto.title} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>{producto.title}</h4>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                    <strong>Categoría:</strong> {producto.categoria || 'Indumentaria'}
                  </p>
                  <p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>
                    <strong>Precio Unitario:</strong> {formatCurrency(precioUnitario)}
                  </p>
                </div>
              </div>

              {/* Sección Derecha: Controles de cantidad (+ / -), subtotal y botón eliminar */}
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                
                {/* Controles para sumar y restar cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', padding: '2px 6px' }}>
                  <button 
                    onClick={() => decrementarCantidad(producto.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    -
                  </button>
                  <span>{producto.quantity}</span>
                  <button 
                    onClick={() => incrementarCantidad(producto.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    +
                  </button>
                </div>

             {/*  <div>
                  <p style={{ margin: '0 0 5px 0', color: '#059669', fontWeight: 'bold' }}>
                    Subtotal: {formatCurrency(subtotal)}
                  </p>
                  <button 
                    onClick={() => eliminarDelCarrito(producto.id)}
                    style={{ 
                      background: '#ef4444', 
                      color: 'white', 
                      border: 'none', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      fontSize: '0.75rem'
                    }}
                  >
                    Eliminar
                  </button>
                </div> */}
                <div>
  <p style={{ margin: '0 0 5px 0', color: '#059669', fontWeight: 'bold' }}>
    Subtotal: {formatCurrency(subtotal)}
  </p>
  <button 
    onClick={() => eliminarDelCarrito(producto.id)}
    style={{ 
      background: '#ef4444', 
      color: 'white', 
      border: 'none', 
      padding: '6px 8px', 
      borderRadius: '4px', 
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  </button>
</div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Sección Inferior: Vaciar carrito y Total general */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
        <button 
          onClick={vaciarCarrito}
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