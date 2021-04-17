module.exports = {
    siteMetadata: {
        title: `SQL Interview`,
        description: `Practice for your next SQL Interview`,
        author: `@danielfrg`,
    },
    plugins: [
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-remove-trailing-slashes`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `lesson`,
                path: `${__dirname}/src/lessons`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `question`,
                path: `${__dirname}/src/questions`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-remark`,
        {
            resolve: "gatsby-plugin-copy-files-enhanced",
            options: {
                source: `${__dirname}/node_modules/sql.js/dist/sql-wasm.wasm`,
                destination: "/static/js",
                purge: false,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/page-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-gatsby-cloud`,
    ],
    flags: {
        DEV_SSR: false,
    },
}
