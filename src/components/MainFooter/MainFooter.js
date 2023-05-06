import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMailBulk,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";

export const MainFooter = () => {
  return (
    <footer className="bg-white p-4 dark:bg-slate-900 sm:p-6">
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 md:grid-cols-3 md:text-left">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-slate-900 dark:text-slate-100">
              Recursos
            </h2>
            <ul>
              <li className="mb-4">
                <Link
                  to="/blog/all-posts"
                  className="text-slate-600 dark:text-slate-300"
                >
                  Blog
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/contacto"
                  className="text-slate-600 dark:text-slate-300"
                >
                  Contacto
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/portafolios/all-proyects"
                  className="text-slate-600 dark:text-slate-300"
                >
                  Portafolios
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/all-products"
                  className="text-slate-600 dark:text-slate-300"
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
                <span className="p-2 align-middle">Col. Izcalli Chamapa,</span>
                <br />
                <span className="p-2 align-middle">C.P. 53689, Naucalpan,</span>
                <br />
                <span className="p-2 align-middle">Estado de México.</span>
              </li>
              <li className="mb-4">
                <FontAwesomeIcon
                  className="ml-2 align-middle"
                  icon={faMailBulk}
                />
                <span className="p-2 align-middle">info.mevasa@gmail.com</span>
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
                <Link to="/" className="text-slate-600 dark:text-slate-300">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-300">
                  Términos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
