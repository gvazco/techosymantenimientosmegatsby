import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { CallToActionButton } from "../CallToActionButton";
import { SocialMenu } from "../SocialMenu";

import React, { useState } from "react";
import {
  faBars,
  faHouseUser,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Menu = () => {
  const data = useStaticQuery(graphql`
    query MainMenuQuery {
      wp {
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              destination {
                ... on WpPage {
                  uri
                }
              }
              label
            }
            menuItems {
              root {
                destination {
                  ... on WpPage {
                    uri
                  }
                }
                label
              }
              subMenuItems {
                label
                destination {
                  ... on WpPage {
                    uri
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  console.log("MAIN MENU DATA: ", data);
  const { menuItems } = data.wp.acfOptionsMainMenu.mainMenu;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Agrega el estado local para controlar si el menú mobile está abierto o cerrado
  const [selectedItem, setSelectedItem] = useState(-1); // Inicializar con un valor por defecto

  // Función de manejo de eventos para abrir/cerrar el menú mobile
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      <div className="sticky top-0 z-20 flex h-16 items-center justify-between bg-gradient-to-tr from-slate-steel-color to-slate-700 px-5 px-4 font-bold text-white">
        <Link className="pl-5" to="/">
          <StaticImage
            src="../../../static/icon-bco.webp"
            layout="fixed"
            height={35}
            alt="Logo"
          />
        </Link>

        <div className="hidden md:block">
          <div className="flex h-full flex-1 items-center justify-end pr-5">
            {(menuItems || []).map((menuItem, index) => (
              <div
                key={index}
                className="group relative flex h-full cursor-pointer hover:bg-slate-700"
              >
                <Link
                  to={menuItem.root.destination.uri}
                  className="flex h-full items-center p-4 text-white no-underline"
                >
                  {menuItem.root.label}
                </Link>
              </div>
            ))}

            <CallToActionButton
              label={
                data.wp.acfOptionsMainMenu.mainMenu.callToActionButton.label
              }
              destination={
                data.wp.acfOptionsMainMenu.mainMenu.callToActionButton
                  .destination.uri
              }
            />
          </div>
        </div>

        <div className="mr-2 flex md:hidden">
          <button
            type="button"
            className=""
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen} // Usa el estado local para determinar si el menú mobile está abierto o cerrado
            onClick={handleMobileMenuToggle} // Asigna la función de manejo de eventos al evento onClick del botón
          >
            <span className="sr-only">Abrir menú</span>
            <div className="row-auto flex align-middle">
              <FontAwesomeIcon icon={faBars} className="mr-2" />
              <FontAwesomeIcon icon={faHouseUser} className="mr-2" />
            </div>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-slate-300`}
        id="mobile-menu"
      >
        <div className="flex-col text-center">
          {(menuItems || []).map((menuItem, index) => (
            <div
              key={index}
              onClick={() => setSelectedItem(menuItem.root.label)}
              className={`group relative cursor-pointer hover:bg-slate-200 hover:text-amber-600 ${
                selectedItem === menuItem.root.label
                  ? "bg-slate-300 text-amber-600"
                  : ""
              }`}
            >
              <div>
                <Link to={menuItem.root.destination} className="block p-3">
                  {menuItem.root.label}
                </Link>
              </div>
            </div>
          ))}

          <FontAwesomeIcon className="align-middle" icon={faPhoneAlt} />
          <span className="p-2 align-middle">(55) 8280-2149</span>
          <SocialMenu />
        </div>
      </div>
    </nav>
  );
};
