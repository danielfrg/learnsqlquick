import { Flex } from "@primer/components"
import { graphql } from "gatsby"
import * as React from "react"
import { LessonsSidebar, PostLink, SEO, SiteFooter } from "../components"

const LessonsPage = ({
    data: {
        allMdx: { edges },
    },
}) => {
    const posts = edges.map(edge => (
        <li>
            <PostLink key={edge.node.id} post={edge.node} />
        </li>
    ))

    return (
        <>
            <SEO title="SQL Lessons" />
            <Flex className="lessons-wrapper" flexDirection="row">
                <LessonsSidebar />
                <Flex
                    className="lesson container-text markdown-body"
                    flexDirection="column"
                >
                    <h1>SQL Lessons</h1>
                    <ul>{posts}</ul>
                    <SiteFooter />
                </Flex>
            </Flex>
        </>
    )
}

export default LessonsPage

export const lessonsQuery = graphql`
    query GET_LESSONS {
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
