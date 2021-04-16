/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import PropTypes from "prop-types"
import * as React from "react"
import "../styles/index.scss"
import Header from "./header"

const Layout = ({ children }) => {
    // const data = useStaticQuery(graphql`
    //     query SiteTitleQuery {
    //         site {
    //             siteMetadata {
    //                 title
    //             }
    //         }
    //     }
    // `)

    return (
        <>
            <Header />
            {/*<Content> */}
            <div className="container">
                <main>{children}</main>
            </div>
            {/* <Footer>
                    con ♥︎ por
                    <a href="https://www.platzi.com">Platzi</a>
                </Footer>
            </Content> */}
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
