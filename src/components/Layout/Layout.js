import React from "react";
import { CartProvider } from "../CartContext";
import { Menu } from "../Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { SocialMenu } from "../SocialMenu";
import { MainFooter } from "../MainFooter/MainFooter";

export const Layout = ({ children }) => {
  return (
    <CartProvider>
      <div>
        <div className="hidden md:block">
          <div className="flex justify-between bg-slate-200 text-slate-800">
            <div className="ml-5 flex h-[64px] items-center p-5">
              <FontAwesomeIcon className="align-middle" icon={faShieldHalved} />
              <span className="p-2 align-middle">
                SEGURIDAD, EXACTITUD Y GARANTÍA
              </span>
              <FontAwesomeIcon
                className="ml-2 align-middle"
                icon={faPhoneAlt}
              />
              <span className="p-2 align-middle">(55) 8280-2149</span>
            </div>
            <SocialMenu />
          </div>
        </div>
        <Menu />
        <div className="xs:max-w-sm">{children}</div>
        <MainFooter />
      </div>
    </CartProvider>
  );
};
