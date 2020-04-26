module.exports = {
    siteMetadata: {
        title: `Виртуальная Лаборатория`,
        description: `Виртуальная Лаборатория приготовлена для школьников.`,
        author: `@gatsbyjs`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
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
                icon: `src/images/favicon_io/favicon-32.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-brotli',
            options: {
                path: 'brotli',
                extensions: ['css', 'html', 'js', 'svg']
            }
        },
        `gatsby-plugin-minify`,
        `gatsby-plugin-offline`,
    ],
}
