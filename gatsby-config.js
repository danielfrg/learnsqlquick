module.exports = {
    siteMetadata: {
        title: `Learn SQL quick`,
        description: `Learn SQL quick here. For a job interview, an exam, homework, whatever the reason`,
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
        // `gatsby-transformer-remark`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-mdx`,
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
