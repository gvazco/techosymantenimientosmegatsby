import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMailBulk,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export const MainFooter = ({ items }) => {
  return (
    <footer className="bg-slate-900 p-4 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-center lg:justify-around">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="mx-auto flex hidden items-center rounded-lg border-4 border-slate-400 lg:block"
            >
              <StaticImage
                src="../../../static/favicon-bco.webp"
                layout="fixed"
                height={100}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-3 md:text-left">
            <div>
              <h2 className="mb-6 mt-3 text-sm font-semibold uppercase text-slate-900 dark:text-slate-100 md:mt-0">
                Recursos
              </h2>
              <ul>
                <li className="mb-4">
                  <Link
                    to="/blog/all-posts"
                    className="text-slate-600 no-underline dark:text-slate-300"
                  >
                    Blog
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/contacto"
                    className="text-slate-600 no-underline dark:text-slate-300"
                  >
                    Contacto
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/portafolios/all-proyects"
                    className="text-slate-600 no-underline dark:text-slate-300"
                  >
                    Portafolios
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/all-products"
                    className="text-slate-600 no-underline dark:text-slate-300"
                  >
                    Productos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase text-slate-900 dark:text-slate-100">
                Encuentranos en:
              </h2>
              <ul className="text-slate-600 dark:text-slate-300">
                <li className="mb-4 ">
                  <FontAwesomeIcon
                    className="ml-2 align-middle"
                    icon={faLocationDot}
                  />
                  <span className="p-2 align-middle">Dirección fiscal:</span>
                  <br />
                  <span className="p-2 align-middle">
                    Ricardo Flores Magón #105
                  </span>
                  <br />
                  <span className="p-2 align-middle">
                    Col. Izcalli Chamapa,
                  </span>
                  <br />
                  <span className="p-2 align-middle">
                    C.P. 53689, Naucalpan,
                  </span>
                  <br />
                  <span className="p-2 align-middle">Estado de México.</span>
                </li>
                <li className="mb-4">
                  <FontAwesomeIcon
                    className="ml-2 align-middle"
                    icon={faMailBulk}
                  />
                  <span className="p-2 align-middle">
                    info.mevasa@gmail.com
                  </span>
                  <br></br>
                  <FontAwesomeIcon
                    className="ml-2 align-middle"
                    icon={faPhoneAlt}
                  />
                  <span className="p-2 align-middle">(55) 8280-2149</span>
                </li>
              </ul>
            </div>

            <div className="lg:text-right">
              <h2 className="mb-6 text-sm font-semibold uppercase text-slate-900 dark:text-slate-100">
                Legales
              </h2>
              <ul className="text-slate-600 dark:text-slate-400">
                <li className="mb-4">
                  <Link
                    to="/"
                    className="text-slate-600 no-underline dark:text-slate-300"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-slate-600 no-underline dark:text-slate-300"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-slate-200 dark:border-slate-700 sm:mx-auto lg:my-8" />
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          © 2023 Techos y Mantenimientos | Mevasa. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};
