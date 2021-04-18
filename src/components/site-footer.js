import { Header } from "@primer/components"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"

const SiteFooter = ({ siteTitle }) => (
    <div className="site-footer">
        <div className="container-xl">
            <Header className="nav">
                <Header.Item>
                    <Header.Link as={GatsbyLink} to="/">
                        {siteTitle}
                    </Header.Link>
                </Header.Item>
                <Header.Item>
                    <Header.Link as={GatsbyLink} to="/tutorials">
                        Tutorials
                    </Header.Link>
                </Header.Item>
                <Header.Item full>
                    <Header.Link as={GatsbyLink} to="/questions">
                        Questions
                    </Header.Link>
                </Header.Item>
                <Header.Item>
                    <p>
                        Built by{" "}
                        <a href="https://danielfrg.com">Daniel Rodriguez</a>
                    </p>
                </Header.Item>
                <Header.Item>
                    <p>
                        Source on{" "}
                        <a href="https://github.com/danielfrg/sql-interview">
                            GitHub
                        </a>
                    </p>
                </Header.Item>
            </Header>
        </div>
    </div>
)

SiteFooter.propTypes = {
    siteTitle: PropTypes.string,
}

SiteFooter.defaultProps = {
    siteTitle: `SQL-Interview`,
}

export default SiteFooter
