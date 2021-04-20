import { Header } from "@primer/components"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"

const SiteHeader = ({ siteTitle }) => (
    <div className="site-header">
        <div className="container-xl">
            <Header className="nav">
                <Header.Item>
                    <Header.Link as={GatsbyLink} to="/" fontSize={3}>
                        <span>{siteTitle}</span>
                    </Header.Link>
                </Header.Item>
                <Header.Item>
                    <Header.Link as={GatsbyLink} to="/lessons">
                        Lessons
                    </Header.Link>
                </Header.Item>
                <Header.Item>
                    <Header.Link as={GatsbyLink} to="/questions">
                        Questions
                    </Header.Link>
                </Header.Item>
            </Header>
        </div>
    </div>
)

SiteHeader.propTypes = {
    siteTitle: PropTypes.string,
}

SiteHeader.defaultProps = {
    siteTitle: `Learn SQL quick`,
}

export default SiteHeader
