import { graphql } from "gatsby"
import * as React from "react"
import PostLink from "../components/post-link"
import SEO from "../components/seo"

const LessonsPage = ({
    data: {
        allMdx: { edges },
    },
}) => {
    const Posts = edges.map(edge => (
        <li>
            <PostLink key={edge.node.id} post={edge.node} />
        </li>
    ))
    return (
        <div className="lesson container markdown-body">
            <SEO title="SQL Lessons" />
            <h1>SQL Lessons</h1>
            <ul>{Posts}</ul>
        </div>
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
