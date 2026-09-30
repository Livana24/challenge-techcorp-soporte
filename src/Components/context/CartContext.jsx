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

  // Función unificada para agregar productos (compatible tanto para addToCart como addItem)
  const addToCart = (item, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(prod => prod.id === item.id);

      if (existingIndex > -1) {
        // Si ya existe, actualizamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Si no existe, lo agregamos asegurando todas las propiedades clave
        const newItem = {
          id: item.id,
          title: item.title || item.name,
          price: item.price,
          image: item.image || item.img,
          categoria: item.categoria || item.category || 'General',
          quantity: quantity
        };
        return [...prevCart, newItem];
      }
    });
  };

  // Alias para mantener compatibilidad si algún componente llama a addItem
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
    <CartContext.Provider value={{ cart, addToCart, addItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook para consumir el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};