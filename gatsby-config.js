module.exports = {
    siteMetadata: {
        title: `Learn SQL quick`,
        description: `Learn SQL quick here. For a job interview, an exam, homework, whatever the reason`,
        author: `@danielfrg`,
    },
    plugins: [
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
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        `gatsby-remark-images`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                root: __dirname,
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1280,
                        },
                    },
                ],
            },
        },
        `gatsby-plugin-remove-trailing-slashes`,
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `learn-sql-quick`,
                short_name: `learn-sql-quick`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/page-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["UA-35523657-9"],
            },
        },
        `gatsby-plugin-gatsby-cloud`,
    ],
    flags: {
        DEV_SSR: false,
    },
}
