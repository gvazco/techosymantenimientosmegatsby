import React from "react";
import {
  BlockRenderer,
  getClasses,
  getStyles,
} from "@webdeveducation/wp-block-tools";
import {
  CallToActionButton,
  MediaText,
  Cover,
  TickItem,
  CarSearch,
  ContactForm7,
  ProyectSearch,
  ProductSearch,
  PostSearch,
  BudgetList,
  BudgetForm,
  SimpleSlider,
  ImagesGallery,
} from "../components";

import { GatsbyImage } from "gatsby-plugin-image";
import numeral from "numeral";
import { ProductFeatures } from "../components/ProductFeatures/ProductFeatures";
import { CallToActionExtButton } from "../components/CallToActionExtButton";

export const blockRendererComponents = (block) => {
  switch (block.name) {
    case "contact-form-7/contact-form-selector": {
      return (
        <ContactForm7
          key={block.id}
          formId={block.attributes.id}
          formMarkup={block.attributes.formMarkup
            .replace('novalidate="novalidate"', "")
            .split('aria-required="true"')
            .join('aria-required="true" required')}
        />
      );
    }
    case "tgg/carsearch": {
      return (
        <CarSearch
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
        />
      );
    }
    case "tgg/carprice": {
      return (
        <div className="flex justify-center">
          <div className="bg-black px-8 py-5 font-heading text-3xl text-white">
            £{numeral(block.attributes.price).format("0,0")}
          </div>
        </div>
      );
    }
    case "tgg/tickitem": {
      return (
        <TickItem key={block.id}>
          <BlockRenderer blocks={block.innerBlocks} />
        </TickItem>
      );
    }
    case "acf/proyectsearch": {
      // console.log("PROYECT: ", block);
      return (
        <ProyectSearch
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
        />
      );
    }
    case "acf/productsearch": {
      // console.log("PODUCT: ", block);
      return (
        <ProductSearch
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
        />
      );
    }
    case "acf/productfeatures": {
      // console.log("PODUCT FEATURES: ", block);
      return (
        <ProductFeatures
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
          productFeatures={block.attributes}
        />
      );
    }
    case "acf/postsearch": {
      // console.log("POST: ", block);
      return (
        <PostSearch
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
        />
      );
    }
    case "core/cover": {
      return (
        <Cover
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
          gatsbyImage={block.attributes.gatsbyImage}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </Cover>
      );
    }
    case "core/image": {
      // console.log("IMAGE: ", block);
      return (
        <figure key={block.id} className={getClasses(block)}>
          <GatsbyImage
            style={getStyles(block)}
            image={block.attributes.gatsbyImage}
            alt={block.attributes.alt || ""}
            width={block.attributes.width}
            height={block.attributes.height}
          />
        </figure>
      );
    }
    case "tgg/ctabutton": {
      const alignMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      };
      return (
        <div key={block.id} className={alignMap[block.attributes.data.align]}>
          <CallToActionButton
            destination={block.attributes.data.destination}
            label={block.attributes.data.label}
          />
        </div>
      );
    }
    case "tym/ctaexternal": {
      // console.log("EXTERNAL: ", block);
      const alignMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      };
      return (
        <div key={block.id} className={alignMap[block.attributes.data.align]}>
          <CallToActionExtButton
            destination={block.attributes.data.destination.url}
            label={block.attributes.data.label}
          />
        </div>
      );
    }
    case "tym/budgetlist": {
      // console.log("BUDGET: ", block);
      return <BudgetList key={block.id} />;
    }
    case "tym/budgetform": {
      // console.log("BUDGET FORM: ", block);
      return <BudgetForm key={block.id} />;
    }
    case "core/media-text": {
      return (
        <MediaText
          key={block.id}
          className={getClasses(block)}
          style={getStyles(block)}
          verticalAlignment={block.attributes.verticalAlignment}
          gatsbyImage={block.attributes.gatsbyImage}
          mediaPosition={block.attributes.mediaPosition}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </MediaText>
      );
    }
    case "core/group": {
      // console.log("GROUP: ", block);
      const customClass = block.attributes.className;

      if (customClass === "productsSlider") {
        return (
          <SimpleSlider
            key={block.id}
            title={block.innerBlocks[0].originalContent}
          >
            <BlockRenderer blocks={block.innerBlocks[1].innerBlocks} />
          </SimpleSlider>
        );
      }
      return;
    }
    case "core/gallery": {
      // console.log("GALLERY: ", block);
      const customClass = block.attributes.className;

      if (customClass === "imageGallery") {
        return (
          <ImagesGallery key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </ImagesGallery>
        );
      }

      return;
    }
    case "core/embed": {
      // console.log("EMBED", block.attributes.url);

      return (
        <iframe
          key={block.id}
          width="100%"
          height="600"
          className={getClasses(block)}
          style={getStyles(block)}
          src={block.attributes.url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      );
    }

    default:
      console.log(block);

      return null;
  }
};
