import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { CallToActionButton } from "../CallToActionButton";
import React, { useEffect, useState } from "react";
import {
  faBars,
  faCartArrowDown,
  faHouseUser,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faFacebookMessenger,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { CartList } from "./CartList/CartList";
import Modal from "./CartList/Modal";

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
            }
          }
        }
      }
      wp {
        acfOptionsSocialMenu {
          socialMenu {
            socialItems {
              socialItem {
                label
                destination {
                  url
                }
              }
            }
          }
        }
      }
    }
  `);
  // console.log("MAIN MENU DATA: ", data);
  const { menuItems } = data.wp.acfOptionsMainMenu.mainMenu;
  const { socialItems } = data.wp.acfOptionsSocialMenu.socialMenu;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Agrega el estado local para controlar si el menú mobile está abierto o cerrado
  const [selectedItem, setSelectedItem] = useState(-1); // Inicializar con un valor por defecto

  // Función de manejo de eventos para abrir/cerrar el menú mobile
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      setCartCount(cartItems.length);
    }
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav>
      <div className="sticky top-0 z-20 flex h-16 items-center justify-between bg-gradient-to-tr from-slate-steel-color to-slate-700 px-5 px-4 font-bold text-white">
        <Link className="px-5" to="/">
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

            <div>
              <button onClick={openModal} className="ml-1 mr-6">
                <FontAwesomeIcon icon={faCartArrowDown} />
                {cartCount > 0 && (
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <Modal isOpen={isOpen} onClose={closeModal}>
                <h2 className="mb-4 text-lg font-bold">
                  Añadir a la cotización:
                </h2>
                <CartList />
                <button onClick={closeModal}>Cerrar</button>
              </Modal>
            </div>

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

        <div className="flex flex-row items-center justify-between text-[1.3rem] md:hidden">
          <span className="sr-only">Abrir carrito</span>
          <div>
            <button onClick={openModal} className="mx-7">
              <FontAwesomeIcon icon={faCartArrowDown} />
              {cartCount > 0 && (
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
              <h2 className="mb-4 text-lg font-bold">
                Añadir a la cotización:
              </h2>
              <CartList />
              <button onClick={closeModal}>Cerrar</button>
            </Modal>
          </div>
          <button
            type="button"
            className="mx-6"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen} // Usa el estado local para determinar si el menú mobile está abierto o cerrado
            onClick={handleMobileMenuToggle} // Asigna la función de manejo de eventos al evento onClick del botón
          >
            <span className="sr-only">Abrir menú</span>

            <FontAwesomeIcon icon={faBars} />
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
                <Link
                  to={menuItem.root.destination.uri}
                  className="block p-3 no-underline"
                >
                  {menuItem.root.label}
                </Link>
              </div>
            </div>
          ))}
          <>
            <div className="mt-2">
              <FontAwesomeIcon className="align-middle" icon={faPhoneAlt} />
              <span className="p-2 align-middle">(55) 8280-2149</span>
            </div>
          </>
          <>
            <div className="sticky top-0 z-20 flex h-[64px] justify-center px-5">
              <div className="block md:hidden">
                <div className="flex flex-1 justify-end">
                  {(socialItems || []).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedItem(item.socialItem.label)}
                      className={`group relative cursor-pointer hover:bg-slate-200 hover:text-amber-600 ${
                        selectedItem === item.socialItem.label
                          ? "bg-slate-300 text-amber-600"
                          : ""
                      }`}
                    >
                      <div>
                        <a
                          href={item.socialItem.destination.url}
                          className="block py-4 px-2"
                        >
                          {item.socialItem.label === "Facebook" && (
                            <FontAwesomeIcon
                              icon={faFacebookF}
                              className="p-2 align-middle"
                            />
                          )}
                          {item.socialItem.label === "Messenger" && (
                            <FontAwesomeIcon
                              icon={faFacebookMessenger}
                              className="p-2 align-middle"
                            />
                          )}
                          {item.socialItem.label === "Instagram" && (
                            <FontAwesomeIcon
                              icon={faInstagram}
                              className="p-2 align-middle"
                            />
                          )}
                          {item.socialItem.label === "Youtube" && (
                            <FontAwesomeIcon
                              icon={faYoutube}
                              className="p-2 align-middle"
                            />
                          )}
                          {item.socialItem.label === "WhatsApp" && (
                            <FontAwesomeIcon
                              icon={faWhatsapp}
                              className="p-2 align-middle"
                            />
                          )}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};
