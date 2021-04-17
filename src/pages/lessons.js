import { graphql } from "gatsby"
import * as React from "react"
import PostLink from "../components/post-link"

const LessonsPage = ({
    data: {
        allMdx: { edges },
    },
}) => {
    const Posts = edges.map(edge => (
        <PostLink key={edge.node.id} post={edge.node} />
    ))
    return <div>{Posts}</div>
}

export default LessonsPage

export const lessonsQuery = graphql`
    query GET_LESSONS {
        allMdx(
            filter: { fields: { collection: { eq: "lesson" } } }
            sort: { order: DESC, fields: [frontmatter___date] }
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
