import { BorderBox, Flex, Position } from "@primer/components"
import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"
import NavItems from "./NavItems"
import { HEADER_HEIGHT } from "./SiteHeader"

function LessonsSidebar({}) {
    const { allMdx } = useStaticQuery(
        graphql`
            query GET_LESSONS_SIDEBAR {
                allMdx(
                    filter: { fields: { collection: { eq: "lesson" } } }
                    sort: { order: ASC, fields: [frontmatter___date] }
                    limit: 1000
                ) {
                    totalCount
                    edges {
                        node {
                            id
                            frontmatter {
                                date(formatString: "MMMM DD, YYYY")
                                slug
                                title
                            }
                        }
                    }
                }
            }
        `
    )

    const { edges } = allMdx

    const children = edges.map(edge => ({
        title: edge.node.frontmatter.title,
        url: edge.node.frontmatter.slug,
    }))
    // <PostLink key={edge.node.id} post={edge.node} />

    const items = [
        { title: "SQL Lessons", url: "/lessons", children: children },
    ]
    console.log(edges)

    return (
        <Position
            position="sticky"
            top={HEADER_HEIGHT}
            height={`calc(100vh - ${HEADER_HEIGHT}px)`}
            minWidth={260}
            color="gray.8"
            bg="gray.0"
        >
            <BorderBox
                borderWidth={0}
                borderRightWidth={1}
                borderRadius={0}
                height="100%"
                style={{ overflow: "auto" }}
            >
                <Flex flexDirection="column">
                    <NavItems items={items} />
                </Flex>
            </BorderBox>
        </Position>
    )
}

export default LessonsSidebar
