import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const BudgetForm = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { updateCartCount } = useContext(CartContext);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      const cartItemsFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      setCartItems(cartItemsFromLocalStorage);
    }
  }, [isBrowser]);

  useEffect(() => {
    const textarea = document
      .querySelector("#wpcf7-f1545-o1")
      .querySelector(".funnel__form")
      .getElementsByTagName("textarea")[0];
    console.log(cartItems);

    const items = cartItems.map((item, index) => item.title);
    const itemsFormatted = items.join(",\n");

    textarea.value = `Por favor, ayudenme a cotizar los siguientes materiales: 
${itemsFormatted}`;
  });

  const handleRemoveItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    if (isBrowser) {
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      updateCartCount();
    }
  };

  return (
    <div className="alignwide are-vertically-aligned-center mb-2">
      <div className="mx-auto max-w-4xl">
        <ul className="mt-6 border border-slate-300 p-3 text-right">
          {/* Exist products in Cart */}
          {cartItems.length === 0 && (
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
              className="mb-3 flex flex-row items-center justify-between border border-solid border-slate-300 p-1"
            >
              {!!item.featuredImage?.node?.sourceUrl && (
                <img
                  className="mr-3 h-[50px] w-[50px] object-cover"
                  src={item.featuredImage?.node?.sourceUrl}
                  alt=""
                  style={{ objectFit: "cover", maxHeight: "50px" }}
                />
              )}
              <div className="flex flex-row items-center ">
                <p className="cart_p mr-3 text-sm md:text-base">{item.title}</p>
                <button
                  className="btn-delete"
                  onClick={() => handleRemoveItem(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
          <hr className="mt-3"></hr>
        </ul>
      </div>
    </div>
  );
};
