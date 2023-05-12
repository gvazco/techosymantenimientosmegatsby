import React from "react";

export const CartList = () => {
  const [cartItems, setCartItems] = React.useState(
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
    <div className="mx-auto mt-3 flex min-h-full max-w-[1200px]">
      <ul className="border border-slate-300 p-3 text-right">
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
            className="flex flex-row items-center md:justify-between"
          >
            {!!item.featuredImage?.node?.sourceUrl && (
              <img
                className="mr-3 h-[50px] w-[50px] object-cover"
                src={item.featuredImage.node.sourceUrl}
                alt=""
                style={{ objectFit: "cover", maxHeight: "50px" }}
              />
            )}
            <div className="flex flex-col items-center  md:flex-row">
              <p className="mr-3 text-sm md:text-base">{item.title}</p>
              <button
                className="btn-delete bg-red-600 hover:bg-red-500"
                onClick={() => handleRemoveItem(index)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}

        {cartItems != "" && (
          <>
            <hr className="mt-3"></hr>
            <div className="mt-3 flex flex-row justify-between">
              <button onClick={handleClearCart} className="btn-delete">
                Limpiar
              </button>
              <button className="btn-delete bg-teal-600 hover:bg-teal-500">
                Continuar
              </button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};
