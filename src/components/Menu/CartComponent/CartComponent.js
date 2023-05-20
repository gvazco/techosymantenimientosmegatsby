import React, { useContext, useEffect } from "react";
import { CartContext } from "../../CartContext";

const CartComponent = () => {
  const { cartCount, updateCartCount } = useContext(CartContext);

  useEffect(() => {
    // Actualizar el contador inicialmente
    updateCartCount();
  }, [updateCartCount]);

  return cartCount
};

export default CartComponent;
