import { graphql } from "gatsby"
import * as React from "react"
import PostLink from "../components/post-link"

const LessonsPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}) => {
    const Posts = edges.map(edge => (
        <PostLink key={edge.node.id} post={edge.node} />
    ))
    return <div>{Posts}</div>
}

export default LessonsPage

export const lessonsQuery = graphql`
    query LESSONS {
        allMarkdownRemark(
            filter: { frontmatter: { slug: { regex: "/lesson/" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        slug
                        title
                    }
                }
            }
            totalCount
        }
    }
`
