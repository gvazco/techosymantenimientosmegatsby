import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart"));
    const itemCount = storedCartItems ? storedCartItems.length : 0;
    setCartCount(itemCount);
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
