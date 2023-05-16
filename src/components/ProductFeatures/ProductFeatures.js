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
    precio,
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
    console.log(array.length)
    if (array.length === 0) return "";
    if (array.length === 1) return array[0];
    const ultimoElemento = array[array.length - 1];
    const primerosElementos = array.slice(0, -1).join(", ");
    return `${primerosElementos} y ${ultimoElemento}`;
  };

  return (
    <div className="mx-auto my-10 flex w-full flex-col justify-center bg-transparent text-center text-slate-900 lg:max-w-5xl lg:flex-row lg:justify-around">
      <div className="my-auto flex flex-col align-middle">
        <div>
          <h2 className="text-left text-2xl md:text-4xl mb-3">{title}</h2>
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
        {largo_efectivo != "" && (
          <div className="flex">
            <FontAwesomeIcon
              className="p-2 align-middle"
              icon={faUpRightAndDownLeftFromCenter}
            />

            <span className="p-1 text-left">
              {separador(largo_efectivo)} largo estándar.
            </span>
          </div>
        )}
        {largo_estandar != "" && (
          <div className="flex">
            <FontAwesomeIcon
              className="p-2 align-middle"
              icon={faUpRightAndDownLeftFromCenter}
            />
            <span className="p-1 text-left">
              {separador(largo_estandar)} largo estándar.
            </span>
          </div>
        )}
        {ancho_efectivo != "" && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faLeftRight} />
            <span className="p-1 text-left">
              {separador(ancho_efectivo)} ancho efectivo.
            </span>
          </div>
        )}
        {espesor != "" && (
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
        {calibre != "" && (
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
        {!!entrega && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faTruckFast} />
            <span className="p-1 text-left">Disponibilidad: {entrega}</span>
          </div>
        )}
        {!!otros && (
          <div className="flex">
            <FontAwesomeIcon className="p-2 align-middle" icon={faIndustry} />
            <span className="p-1 text-left">{otros}</span>
          </div>
        )}
      </div>
    </div>
  );
};
