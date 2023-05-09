import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebookF,
  faFacebookMessenger,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const SocialMenu = () => {
  const data = useStaticQuery(graphql`
    query SocialMenuQuery {
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
  console.log("SOCIAL MENU DATA: ", data);
  const { socialItems } = data.wp.acfOptionsSocialMenu.socialMenu;

  const [selectedItem, setSelectedItem] = useState(-1);
  return (
    <nav className="font-bold">
      <div className="sticky top-0 z-20 flex h-[64px] justify-between px-5">
        <div className="hidden md:block">
          <div className="flex flex-1 justify-end">
            {(socialItems || []).map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item.socialItem.label)}
                className={`group relative cursor-pointer hover:bg-slate-100 hover:text-amber-600 ${
                  selectedItem === item.socialItem.label
                    ? "bg-slate-200 text-amber-600"
                    : ""
                }`}
              >
                <div>
                  <a href={item.socialItem.destination.url} className="block py-4 px-2">
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
    </nav>
  );
};
