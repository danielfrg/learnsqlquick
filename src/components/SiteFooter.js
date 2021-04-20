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
                    <Header.Link as={GatsbyLink} to="/lessons">
                        Lessons
                    </Header.Link>
                </Header.Item>
                <Header.Item full>
                    <Header.Link as={GatsbyLink} to="/questions">
                        Questions
                    </Header.Link>
                </Header.Item>
                <Header.Item>
                    <span>
                        Built by{" "}
                        <a href="https://danielfrg.com">Daniel Rodriguez</a>
                    </span>
                </Header.Item>
                <Header.Item>
                    <span>
                        Source on{" "}
                        <a href="https://github.com/danielfrg/learnsqlquick">
                            GitHub
                        </a>
                    </span>
                </Header.Item>
            </Header>
        </div>
    </div>
)

SiteFooter.propTypes = {
    siteTitle: PropTypes.string,
}

SiteFooter.defaultProps = {
    siteTitle: `Learn SQL quick`,
}

export default SiteFooter
