import React, { useState, useRef } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { CallToActionButton } from "../CallToActionButton";

const SimpleSlider = ({ title, children }) => {
  function eliminarTags(html) {
    return html.replace(/<.*?>/g, "");
  }

  const content = children.props.blocks;
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const contentRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    const touchDistance = touchStart - touchEnd;
    if (touchDistance > 50) {
      scrollRight();
    } else if (touchDistance < -50) {
      scrollLeft();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 340;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 340;
  };
  const cardItem = content.map((item, index) => (
    <div
      key={index}
      className="card mr-6 h-[437px] w-[350px] bg-slate-50 shadow-lg"
    >
      <div className="h-[320px] w-[320px] object-cover p-2">
        <GatsbyImage
          alt={item.id}
          image={item.innerBlocks[0].attributes.gatsbyImage}
        />
      </div>
      <div className="bottom flex flex-col items-center justify-center p-3">
        <h3 className=" title my-1 text-center text-sm font-semibold">
          {eliminarTags(item.innerBlocks[1].originalContent)}
        </h3>
        <CallToActionButton
          fullWidth
          label="Mostrar Detalles"
          destination={item.innerBlocks[2].attributes.data.destination}
        />
      </div>
    </div>
  ));

  return (
    <div className="alignwide are-vertically-aligned-center mb-2">
      <div className="relative">
        <h3 className="py-4 text-left text-xl font-bold">
          {eliminarTags(title)}
        </h3>
        <div className="absolute right-0 top-0 ">
          <button
            onClick={scrollLeft}
            className="m-2 rounded-lg bg-teal-600 p-2 text-white hover:bg-teal-500"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={scrollRight}
            className="m-2 rounded-lg bg-teal-600 p-2 text-white hover:bg-teal-500"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div
          id="content"
          ref={contentRef}
          className="carousel scrollbar-hide flex touch-pan-x items-center justify-start overflow-x-auto overflow-x-hidden scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cardItem}
        </div>
      </div>
    </div>
  );
};

export default SimpleSlider;
