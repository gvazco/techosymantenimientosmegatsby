import React, { useEffect, useState, useContext } from "react";
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
// import { CallToActionButton } from "../CallToActionButton";
import { PageNumber } from "./PageNumber";
import { Link, navigate } from "gatsby";
import SuccessToast from "./SuccessToast/SuccessToast";
import ErrorToast from "./ErrorToast/ErrorToast";
import { CartContext } from "../CartContext";

export const ProductSearch = ({ style, className }) => {
  const [showDescription, setShowDescription] = useState(false); // agregar estado
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  let page = 1;
  let defaultType = "";
  // let defaultMaxPrice = "";
  // let defaultMinPrice = "";
  // let defaultColor = "";
  const { updateCartCount } = useContext(CartContext);

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
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  console.log("DATA: ", data, loading, error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData);
    params.set("page", "1");
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (!loading) {
      const products = data?.products?.nodes;
      // Guardar los productos en el localStorage
      localStorage.setItem("items", JSON.stringify(products));
    }
  }, [loading]);

  const handleAddToCart = (products) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (!Array.isArray(products)) {
      // Si products no es una lista, lo convertimos en una lista
      products = [products];
    }
    products.forEach((product) => {
      // console.log(product);
      // console.log(cartItems);
      const productIndex = cartItems.findIndex(
        (item) => item.databaseId === product.databaseId
      );
      if (productIndex === -1) {
        // si el producto no está en el carrito, lo agregamos
        cartItems.push(product);
        handleShowToast();
      } else {
        // si el producto ya está en el carrito
        handleShowErrorToast();
      }
    });

    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
  };

  const handleAddToStorage = (products) => {
    const items = JSON.parse(localStorage.getItem("items")) || [];

    if (!Array.isArray(products)) {
      // Si products no es una lista, lo convertimos en una lista
      products = [products];
    }
    products.forEach((product) => {
      // console.log(product);
      // console.log(items);
      const productIndex = items.findIndex(
        (item) => item.databaseId === product.databaseId
      );
      if (productIndex === -1) {
        // si el producto no está en el carrito, lo agregamos
        items.push(product);
      }
    });

    localStorage.setItem("items", JSON.stringify(items));
  };

  function handleShowToast() {
    setShowSuccessToast(true);
  }

  function handleCloseToast() {
    setShowSuccessToast(false);
  }

  function handleShowErrorToast() {
    setShowErrorToast(true);
  }

  function handleCloseErrorToast() {
    setShowErrorToast(false);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
            <button type="submit" className="btn mb-[2px] mt-auto w-full ">
              Buscar
            </button>
          </div>
        </form>
      </fieldset>

      {loading && (
        <div className="flex h-40 items-center justify-center">
          <div
            className=" inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}

      {!loading && !!data?.products?.nodes?.length && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.products.nodes.map((product) => (
            <div
              className="roun flex flex-col border border-slate-300 bg-slate-100 p-2 hover:bg-slate-200"
              key={product.databaseId}
            >
              {!!product.featuredImage?.node?.sourceUrl && (
                <img
                  className="h-[450px] w-full object-cover"
                  src={product.featuredImage.node.sourceUrl}
                  alt=""
                  style={{ objectFit: "cover", maxHeight: "350px" }}
                />
              )}

              <>
                <div className="my-2 text-center font-heading text-xl font-bold">
                  {product.title}
                </div>

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
                    {!!product.productFeatures.description.precio && (
                      <div className="text-lg">
                        $
                        {numeral(
                          product.productFeatures.description.precio
                        ).format("0,0")}
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
                <Link className="btn w-full " to={product.uri}>
                  <button onClick={() => handleAddToStorage(product)}>
                    <span className="">VER DETALLES</span>
                  </button>
                </Link>
                <button
                  className="btn w-full bg-slate-900 text-slate-100 hover:bg-slate-700"
                  onClick={() => handleAddToCart(product)}
                >
                  <span className="">
                    <FontAwesomeIcon
                      className="mr-2 text-slate-100"
                      icon={faCartFlatbed}
                    />
                    COTIZAR
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!!totalResults && (
        <div className="my-4 flex items-center justify-center gap-2">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &lt;
          </button>
          {Array.from({ length: totalPages })
            .slice(currentPage - 1, currentPage + 4) // Muestra máximo 5 botones
            .map((_, i) => {
              return <PageNumber key={i} pageNumber={i + currentPage} />;
            })}
          <button
            onClick={handleNextPage}
            disabled={currentPage + 4 >= totalPages}
          >
            &gt;
          </button>
        </div>
      )}

      {showSuccessToast && (
        <SuccessToast
          message="¡Genial! Este producto se ha añadido a tu lista de cotización..."
          onClose={handleCloseToast}
        />
      )}

      {showErrorToast && (
        <ErrorToast
          message="¡Ooops! Este producto ya se añadió a tu lista de cotización..."
          onClose={handleCloseErrorToast}
        />
      )}
    </div>
  );
};
