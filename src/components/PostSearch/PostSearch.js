import React from "react";
import { useQuery, gql } from "@apollo/client";
// import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { CallToActionButton } from "../CallToActionButton";
import { PageNumber } from "./PageNumber";
import { navigate } from "gatsby";

export const PostSearch = ({ style, className }) => {
  const pageSize = 3;
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
      query proyectsQuery($size: Int!, $offset: Int!) {
        proyects(where: {metaQuery: ${metaQuery}, offsetPagination: { size: $size, offset: $offset } }) {
          nodes {
            databaseId
            title
            uri
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            proyectFeatures {
              tipo
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

  const totalResults = data?.proyects?.pageInfo?.offsetPagination?.total || 0;
  const totalPages = Math.ceil(totalResults / pageSize);

  console.log("DATA: ", data, loading, error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams(formData);
    params.set("page", "1");
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div style={style} className={className}>
      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="mb-4 mt-3 flex flex-col sm:flex-row justify-center rounded-lg border border-slate-200 bg-slate-800 p-4"
        >
          <div>
            <strong className="text-slate-200">Filtrar por tipo de proyecto:</strong>
            <select
              name="type"
              defaultValue={defaultType}
              className="bg-slate-200 text-base text-slate-800 focus:ring-blue-500"
            >
              <option value="">Todos los Proyectos</option>
              <option value="lamina_acanalada">Lámina Acanalada</option>
              <option value="lamina_estructural">Lámina Estructural</option>
              <option value="lamina_translucida">Lámina Translúcida</option>
              <option value="panel_aislante">Panel Aislante</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
          <div className="ml-0 mt-2 sm:scroll-mt-0.5 sm:ml-5 flex">
            <button type="submit" className="btn mt-auto mb-[2px]">
              Buscar
            </button>
          </div>
        </form>
      </fieldset>
      {!loading && !!data?.proyects?.nodes?.length && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.proyects.nodes.map((proyect) => (
            <div
              className="flex flex-col border border-stone-200 bg-stone-100 p-2"
              key={proyect.databaseId}
            >
              {!!proyect.featuredImage?.node?.sourceUrl && (
                <img
                  className="h-[200px] w-full object-cover"
                  src={proyect.featuredImage.node.sourceUrl}
                  alt=""
                />
              )}
              <div className="my-2 justify-between gap-2 font-heading text-xl font-bold lg:flex">
                <div className="my-2">{proyect.title}</div>
              </div>
              <div>
                <CallToActionButton
                  fullWidth
                  label="View more details"
                  destination={proyect.uri}
                />
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
    </div>
  );
};
