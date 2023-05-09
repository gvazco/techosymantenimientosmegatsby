import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
  faBoxOpen,
  faCartFlatbed,
  faDownLeftAndUpRightToCenter,
  faFlask,
  faIndustry,
  faLeftRight,
  faTags,
  faTruckFast,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { CallToActionButton } from "../CallToActionButton";
import { PageNumber } from "./PageNumber";
import { navigate } from "gatsby";
import SuccessToast from "./SuccessToast/SuccessToast";

export const ProductSearch = ({ style, className, props }) => {
  const [showDescription, setShowDescription] = useState(false); // agregar estado
  const pageSize = 6;
  let page = 1;
  let defaultType = "";
  // let defaultMaxPrice = "";
  // let defaultMinPrice = "";
  // let defaultColor = "";

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    page = parseInt(params.get("page") || "1");
    defaultType = params.get("type");
  }

  let metaQuery = "{}";
  if (defaultType) {
    let typeQuery = "";

    if (defaultType) {
      typeQuery = `{key: "type", compare: EQUAL_TO, value: "${defaultType}"},`;
    }

    // if (defaultMinPrice) {
    //   minPriceQuery = `{key: "price", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC, value: "${defaultMinPrice}"},`;
    // }

    // if (defaultMaxPrice) {
    //   maxPriceQuery = `{key: "price", compare: LESS_THAN_OR_EQUAL_TO, type: NUMERIC, value: "${defaultMaxPrice}"},`;
    // }

    metaQuery = `{
      relation: AND
      metaArray: [${typeQuery}]
    }`;
  }

  const { data, loading, error } = useQuery(
    gql`
      query productsQuery($size: Int!, $offset: Int!) {
        products(where: {metaQuery: ${metaQuery}, offsetPagination: { size: $size, offset: $offset } }) {
          nodes {
            databaseId
            title
            uri
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            productFeatures {
              type
              description {
                anchoEfectivo
                calibre
                contenido
                entrega
                espesor
                existencia
                largoEfectivo
                largoEstandar
                marca
                otros
                precio
                presentacion
                whatsapp
              }
            }
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
    {
      variables: {
        size: pageSize,
        offset: pageSize * (page - 1),
      },
    }
  );

  const totalResults = data?.products?.pageInfo?.offsetPagination?.total || 0;
  const totalPages = Math.ceil(totalResults / pageSize);

  console.log("DATA: ", data, loading, error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData);
    params.set("page", "1");
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  // const handleAddToCart = (product) => {
  //   const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  //   const productInCart = cartItems.find((item) => item.id === product.id);
  //   if (productInCart) {
  //     alert("¡Upss! El producto ya esta en la lista.");
  //     return; // El producto ya está en el carrito, no lo agregamos de nuevo
  //   }

  //   cartItems.push(product);
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  //   handleShowToast();
  // };

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const productInCart = cartItems.find((item) => item.id === product.id);
    if (productInCart) {
      alert("¡Upss! El producto ya esta en la lista.");
      return; // El producto ya está en el carrito, no lo agregamos de nuevo
    }

    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    handleShowToast();
    props.updateCartCount();
  };

  const [showToast, setShowToast] = useState(false);

  function handleShowToast() {
    setShowToast(true);
  }

  function handleCloseToast() {
    setShowToast(false);
  }

  const separador = (array) => {
    if (array.length === 0) return "";
    if (array.length === 1) return array[0];
    const ultimoElemento = array[array.length - 1];
    const primerosElementos = array.slice(0, -1).join(", ");
    return `${primerosElementos} y ${ultimoElemento}`;
  };

  const handleToggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div style={style} className={className}>
      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="mb-4 mt-3 flex flex-col justify-center rounded-lg border border-slate-200 bg-slate-800 p-4 sm:flex-row"
        >
          <div>
            <strong className="text-slate-200">
              Filtrar por tipo de producto:
            </strong>
            <select
              name="type"
              defaultValue={defaultType}
              className="bg-slate-200 text-base text-slate-800 focus:ring-blue-500"
            >
              <option value="">Todos los Productos</option>
              <option value="aislantes">Aislantes</option>
              <option value="fijacion">Fijación</option>
              <option value="lamina_acanalada">Lámina Acanalada</option>
              <option value="lamina_lisa">Lámina Lisa</option>
              <option value="lamina_ondulada">Lámina Ondulada</option>
              <option value="lamina_translucida">Lámina Translúcida</option>
              <option value="panel_aislante">Panel Aislante</option>
              <option value="remates_lamina">Remates de Lámina</option>
              <option value="selladores">Selladores</option>
            </select>
          </div>
          <div className="ml-0 mt-2 flex sm:ml-5 sm:scroll-mt-0.5">
            <button type="submit" className="btn mt-auto mb-[2px]">
              Buscar
            </button>
          </div>
        </form>
      </fieldset>
      {!loading && !!data?.products?.nodes?.length && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.products.nodes.map((product) => (
            <div
              className="roun flex flex-col border border-slate-300 bg-slate-100 p-2 hover:bg-slate-200"
              key={product.databaseId}
            >
              {!!product.featuredImage?.node?.sourceUrl && (
                <img
                  className="h-[300px] w-full object-cover"
                  src={product.featuredImage.node.sourceUrl}
                  alt=""
                  style={{ objectFit: "cover", maxHeight: "300px" }}
                />
              )}

              <>
                <div className="my-2 text-center font-heading text-xl font-bold">
                  {product.title}
                </div>

                {!!product.productFeatures.description.precio && (
                  <div className="text-lg">
                    $
                    {numeral(product.productFeatures.description.precio).format(
                      "0,0"
                    )}
                  </div>
                )}

                {!!product.productFeatures.description.marca && (
                  <div className="flex">
                    <FontAwesomeIcon
                      className="p-2 align-middle"
                      icon={faTags}
                    />
                    <span className="overflow-hidden truncate text-ellipsis p-1">
                      Marca: {product.productFeatures.description.marca}
                    </span>
                  </div>
                )}

                {!!product.productFeatures.description.anchoEfectivo && (
                  <div className="flex">
                    <FontAwesomeIcon
                      className="p-2 align-middle"
                      icon={faLeftRight}
                    />
                    <span className="overflow-hidden truncate text-ellipsis p-1">
                      {separador(
                        product.productFeatures.description.anchoEfectivo
                      )}
                      ancho efectivo.
                    </span>
                  </div>
                )}

                {!!product.productFeatures.description.largoEfectivo && (
                  <div className="flex">
                    <FontAwesomeIcon
                      className="p-2 align-middle"
                      icon={faUpRightAndDownLeftFromCenter}
                    />

                    <span className="overflow-hidden truncate text-ellipsis p-1">
                      {separador(
                        product.productFeatures.description.largoEfectivo
                      )}
                      largo estándar.
                    </span>
                  </div>
                )}

                {!!product.productFeatures.description.largoEstandar && (
                  <div className="flex">
                    <FontAwesomeIcon
                      className="p-2 align-middle"
                      icon={faUpRightAndDownLeftFromCenter}
                    />
                    <span className="overflow-hidden truncate text-ellipsis p-1">
                      {separador(
                        product.productFeatures.description.largoEstandar
                      )}{" "}
                      largo estándar.
                    </span>
                  </div>
                )}

                {!showDescription && (
                  <button
                    className="btn bg-slate-200 hover:bg-slate-300"
                    onClick={handleToggleDescription}
                  >
                    <span className="text-slate-800">
                      <FontAwesomeIcon
                        icon={faArrowDownShortWide}
                        className="mr-2 text-slate-800"
                      />
                      Previsualizar Info
                    </span>
                  </button>
                )}

                {showDescription && (
                  <div id="description">
                    {!!product.productFeatures.description.espesor && (
                      <div className="flex">
                        <FontAwesomeIcon
                          className="p-2 align-middle"
                          icon={faDownLeftAndUpRightToCenter}
                        />
                        <span className="overflow-hidden truncate text-ellipsis p-1">
                          Espesor disponible:{" "}
                          {separador(
                            product.productFeatures.description.espesor
                          )}{" "}
                          pulgadas.
                        </span>
                      </div>
                    )}

                    {!!product.productFeatures.description.calibre && (
                      <div className="flex">
                        <FontAwesomeIcon
                          className="p-2 align-middle"
                          icon={faDownLeftAndUpRightToCenter}
                        />
                        <span className="overflow-hidden truncate text-ellipsis p-1">
                          Calibre disponible:{" "}
                          {separador(
                            product.productFeatures.description.calibre
                          )}
                        </span>
                      </div>
                    )}

                    {!!product.productFeatures.description.contenido && (
                      <div className="flex">
                        <FontAwesomeIcon
                          className="p-2 align-middle"
                          icon={faFlask}
                        />
                        <span className="overflow-hidden truncate text-ellipsis p-1">
                          {product.productFeatures.description.contenido}
                        </span>
                      </div>
                    )}

                    {!!product.productFeatures.description.presentacion && (
                      <div className="flex">
                        <FontAwesomeIcon
                          className="p-2 align-middle"
                          icon={faBoxOpen}
                        />
                        <span className="overflow-hidden truncate text-ellipsis p-1">
                          {product.productFeatures.description.presentacion}
                        </span>
                      </div>
                    )}

                    {!!product.productFeatures.description.entrega && (
                      <div className="flex">
                        <FontAwesomeIcon
                          className="p-2 align-middle"
                          icon={faTruckFast}
                        />
                        <span className="overflow-hidden truncate text-ellipsis p-1">
                          Disponibilidad:{" "}
                          {product.productFeatures.description.entrega}
                        </span>
                      </div>
                    )}

                    {!!product.productFeatures.description.otros && (
                      <div className="flex">
                        <FontAwesomeIcon
                          className="p-2 align-middle"
                          icon={faIndustry}
                        />
                        <span className="overflow-hidden truncate text-ellipsis p-1">
                          {product.productFeatures.description.otros}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {showDescription && (
                  <button
                    className="btn bg-slate-200 hover:bg-slate-300"
                    onClick={handleToggleDescription}
                  >
                    <span className="text-slate-800">
                      <FontAwesomeIcon
                        icon={faArrowUpShortWide}
                        className="mr-2 text-slate-800"
                      />
                      Cerrar Info
                    </span>
                  </button>
                )}
              </>

              <div className="my-2 flex flex-col gap-2 md:flex-row">
                <CallToActionButton
                  fullWidth
                  label="Ver detalles"
                  destination={product.uri}
                />

                <button
                  className="btn w-full bg-slate-900 text-slate-100 hover:bg-slate-700"
                  onClick={() => handleAddToCart(product)}
                >
                  <span className="">
                    <FontAwesomeIcon
                      className="mr-2 text-slate-100"
                      icon={faCartFlatbed}
                    />
                    Cotizar
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!!totalResults && (
        <div className="my-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            return <PageNumber key={i} pageNumber={i + 1} />;
          })}
        </div>
      )}

      {showToast && (
        <SuccessToast
          message="Este es un mensaje Toast"
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};
