import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos el carrito leyendo de localStorage si existe
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Guardar en localStorage cada vez que cambie el carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función unificada: soporta tanto (item, quantity) como ({ producto, cantidad })
  const addToCart = (param1, param2 = 1) => {
    // Detectamos si pasaron un objeto tipo { producto, cantidad } o un item directo
    let item, quantity;
    if (param1 && param1.producto) {
      item = param1.producto;
      quantity = Number(param1.cantidad || param2) || 1;
    } else {
      item = param1;
      quantity = Number(param2) || 1;
    }

    if (!item) return;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(prod => prod.id === item.id);

      if (existingIndex > -1) {
        // Si ya existe, actualizamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Si no existe, lo agregamos asegurando propiedades clave
        const precioUnitario = Number(item.price || item.precio) || 0;
        const newItem = {
          id: item.id,
          title: item.title || item.name,
          price: precioUnitario,
          precio: precioUnitario, // Guardamos ambas por si acaso
          image: item.image || item.img,
          categoria: item.categoria || item.category || 'General',
          quantity: quantity
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Funciones para incrementar y decrementar cantidad desde el carrito
  const incrementarCantidad = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementarCantidad = (id) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0) // Si llega a 0 se elimina
    );
  };

  // Alias para mantener compatibilidad con addItem
  const addItem = (item, quantity) => {
    addToCart(item, quantity);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      carrito: cart, // Alias 'carrito' por si alguna página lo usa en español
      addToCart, 
      addItem, 
      removeFromCart, 
      clearCart,
      incrementarCantidad,
      decrementarCantidad
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para consumir el contexto fácilmente
export const useCarrito = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CartProvider');
  }
  return context;
};