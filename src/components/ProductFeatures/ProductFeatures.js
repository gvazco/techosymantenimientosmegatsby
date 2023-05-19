import {
  faBoxOpen,
  faDownLeftAndUpRightToCenter,
  faFlask,
  faIndustry,
  faLeftRight,
  faTags,
  faTruckFast,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ProductFeatures = ({ productFeatures }) => {
  const {
    title,
    marca,
    largo_efectivo,
    largo_estandar,
    ancho_efectivo,
    calibre,
    espesor,
    existencia,
    presentacion,
    contenido,
    entrega,
    otros,
    whatsapp,
  } = productFeatures;

  const separador = (array) => {
    // console.log(array.length);
    if (array.length === 0) return "";
    if (array.length === 1) return array[0];
    const ultimoElemento = array[array.length - 1];
    const primerosElementos = array.slice(0, -1).join(", ");
    return `${primerosElementos} y ${ultimoElemento}`;
  };

  // const handleAddToCart = (products) => {
  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  //   if (!Array.isArray(products)) {
  //     // Si products no es una lista, lo convertimos en una lista
  //     products = [products];
  //   }
  //   products.forEach((product) => {
  //     // console.log(product);
  //     // console.log(cartItems);
  //     const productIndex = cartItems.findIndex(
  //       (item) => item.databaseId === product.databaseId
  //     );
  //     if (productIndex === -1) {
  //       // si el producto no está en el carrito, lo agregamos
  //       cartItems.push(product);
  //     } else {
  //       // si el producto ya está en el carrito
  //       // handleShowErrorToast();
  //       console.log("Hola");
  //     }
  //   });

  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  // };

  return (
    <div className="mx-auto my-10 flex w-full flex-col justify-center bg-transparent text-center text-slate-900 lg:max-w-5xl lg:flex-row lg:justify-around">
      <div className="my-auto flex flex-col align-middle">
        <div>
          <h2 className="mb-3 text-left text-2xl md:text-4xl">{title}</h2>
        </div>
        {!existencia && (
          <div className="relative flex w-full">
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold uppercase text-slate-200 lg:text-3xl">
              <span className="bg-orange-500 p-3">Agotado</span>
            </div>
          </div>
        )}
        {!!marca && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faTags} />
            <span className="p-1 text-left">Marca: {marca}</span>
          </div>
        )}
        {largo_efectivo.length !== 0 && (
          <div className="flex">
            <FontAwesomeIcon
              className="p-2 align-middle"
              icon={faUpRightAndDownLeftFromCenter}
            />

            <span className="p-1 text-left">
              {separador(largo_efectivo)} metros largo estándar.
            </span>
          </div>
        )}
        {largo_estandar.length !== 0 && (
          <div className="flex">
            <FontAwesomeIcon
              className="p-2 align-middle"
              icon={faUpRightAndDownLeftFromCenter}
            />
            <span className="p-1 text-left">
              {separador(largo_estandar)} metros largo estándar.
            </span>
          </div>
        )}
        {ancho_efectivo.length !== 0 && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faLeftRight} />
            <span className="p-1 text-left">
              {separador(ancho_efectivo)} metros ancho efectivo.
            </span>
          </div>
        )}
        {espesor.length !== 0 && (
          <div className="flex">
            <FontAwesomeIcon
              className="p-2 align-middle"
              icon={faDownLeftAndUpRightToCenter}
            />
            <span className="p-1 text-left">
              Espesor disponible: {separador(espesor)} pulgadas.
            </span>
          </div>
        )}
        {calibre !== 0 && (
          <div className="flex">
            <FontAwesomeIcon
              className="p-2 align-middle"
              icon={faDownLeftAndUpRightToCenter}
            />
            <span className="p-1 text-left">
              Calibre disponible: {separador(calibre)}
            </span>
          </div>
        )}
        {!!contenido && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faFlask} />
            <span className="p-1 text-left">{contenido}</span>
          </div>
        )}
        {!!presentacion && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faBoxOpen} />
            <span className="p-1 text-left">{presentacion}</span>
          </div>
        )}

        {!!otros && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faIndustry} />
            <span className="p-1 text-left">{otros}</span>
          </div>
        )}

        {!!entrega && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faTruckFast} />
            <span className="p-1 text-left">{entrega}</span>
          </div>
        )}

        <div className="mt-3 flex flex-col md:flex-row">
          {!!whatsapp && (
            <a className="btn w-full md:mr-3" href={whatsapp}>
              Envíar WhatsApp
            </a>
          )}

          <button
            className="btn mt-3 w-full bg-slate-900 text-slate-100 hover:bg-slate-700 md:ml-3 md:mt-0"

          >
            Añadir a Cotización
          </button>
        </div>
      </div>
    </div>
  );
};
