/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

const React = require("react")

const Layout = require("./src/components/layout").default

exports.wrapRootElement = ({ element }) => {
    return <Layout>{element}</Layout>
}
