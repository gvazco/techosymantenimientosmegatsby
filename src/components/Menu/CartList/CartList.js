import React from 'react'

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

  console.log(cartItems)

  return (
    <div className="mx-auto mt-3 flex max-w-[1200px] justify-end">
      <ul className="border border-slate-300 p-3 text-right">
        {cartItems.map((item, index) => (
          <li key={index} className='flex flex-row items-center'>
            {!!item.featuredImage?.node?.sourceUrl && (
              <img
                className="h-[50px] w-[50px] object-cover mr-3"
                src={item.featuredImage.node.sourceUrl}
                alt=""
                style={{ objectFit: "cover", maxHeight: "50px" }}
              />
            )}
            <p className='mr-3'>{item.title}</p>
            <button className='btn bg-red-600 hover:bg-red-500' onClick={() => handleRemoveItem(index)}>Eliminar</button>
          </li>
        ))}

        {cartItems == "" && <h3 className='text-sm font-bold'>¡Ooops! No hay productos en su carrito.</h3>}
      </ul>
    </div>
  );
}
