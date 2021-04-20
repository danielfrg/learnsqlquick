import { Header, Sticky } from "@primer/components"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"

export const HEADER_HEIGHT = 62

const SiteHeader = ({ siteTitle }) => (
    <Sticky className="site-header">
        <div>
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
    </Sticky>
)

SiteHeader.propTypes = {
    siteTitle: PropTypes.string,
}

SiteHeader.defaultProps = {
    siteTitle: `Learn SQL quick`,
}

export default SiteHeader
