import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export const ImagesGallery = ({ children }) => {
  const content = children.props.blocks;

  const imageItem = content.map((item, index) => (
    <div class="relative transform rounded-lg border-4 border-slate-800 shadow-md transition duration-500 hover:scale-105">
      <div class="flex justify-center">
        <GatsbyImage
          key={index}
          alt={item.id}
          image={item.attributes.gatsbyImage}
        />
      </div>
    </div>
  ));

  return (
    <div className="alignwide are-vertically-aligned-center mb-2">
      <div class="grid grid-cols-1 gap-5 p-3 sm:grid-cols-2 md:grid-cols-3 md:p-2">
        {imageItem}
      </div>
    </div>
  );
};
