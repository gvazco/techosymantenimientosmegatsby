require("dotenv").config({
  path: ".env",
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Techos y Mantenimientos`,
    description: `Comercializadora de lámina y aceros, somos especialistas en techos y mantenimientos industriales y residenciales`,
    author: `@gvazco`,
    image: "./src/images/GOPR5753-1024x640.jpg",
    url: `https://www.techosymantenimientos.com.mx`,
    siteUrl: `https://www.techosymantenimientos.com.mx`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-apollo",
      options: {
        uri: process.env.WPGRAPHQL_URL,
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    `gatsby-transformer-sharp`, // Needed for dynamic images,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.WPGRAPHQL_URL,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "static/favicon-bco.webp",
      },
    },
  ],
};
