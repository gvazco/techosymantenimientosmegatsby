import { Link } from "gatsby";
import React, { useState } from "react";

export const BudgetList = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="mx-auto my-auto flex min-h-full max-w-[1200px]">
      <ul className="mt-6 border border-slate-300 p-3 text-right">
        {/* Exist products in Cart */}
        {cartItems == "" && (
          <li>
            <h3 className="flex flex-row items-center text-sm font-bold">
              ¡Ooops! No hay productos en su carrito.
            </h3>
          </li>
        )}
        {/* Empty Cart */}
        {cartItems.map((item, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-between border border-solid border-slate-300 p-1"
          >
            {!!item.featuredImage?.node?.sourceUrl && (
              <img
                className="mr-3 h-[50px] w-[50px] object-cover"
                src={item.featuredImage.node.sourceUrl}
                alt=""
                style={{ objectFit: "cover", maxHeight: "50px" }}
              />
            )}
            <div className="flex flex-col md:flex-row md:items-center ">
              <p className="cart_p mr-3 text-sm md:text-base">{item.title}</p>
              <button
                className="btn-delete"
                onClick={() => handleRemoveItem(index)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
        <hr className="mt-3"></hr>
        <div className="flex flex-row justify-between">
          <Link to="/store/all-products" className="btn-secondary">
           Volver
          </Link>
          {cartItems != "" && (
            <>
              <div className="mt-3 flex flex-row justify-between">
                <button onClick={handleClearCart} className="btn-delete mr-3">
                  Limpiar
                </button>
                <button className="btn-delete bg-teal-600 hover:bg-teal-500">
                  Continuar
                </button>
              </div>
            </>
          )}
        </div>
      </ul>
    </div>
  );
};
