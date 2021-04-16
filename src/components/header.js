import { Link } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"

const Header = ({ siteTitle }) => (
    <header className="bg-dark site-header">
        <div className="container">
            <h1 style={{ margin: 0 }}>
                <Link
                    to="/"
                    style={{
                        color: `white`,
                        textDecoration: `none`,
                    }}
                >
                    {siteTitle}
                </Link>
            </h1>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: `SQL-Interview`,
}

export default Header
