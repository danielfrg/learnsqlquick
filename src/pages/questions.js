import { graphql } from "gatsby"
import * as React from "react"
import PostLink from "../components/post-link"

const QuestionsPage = ({
    data: {
        allMdx: { edges },
    },
}) => {
    const Posts = edges.map(edge => (
        <PostLink key={edge.node.id} post={edge.node} />
    ))
    return <div>{Posts}</div>
}

export default QuestionsPage

export const questionsQuery = graphql`
    query GET_QUESTIONS {
        allMdx(
            filter: { fields: { collection: { eq: "question" } } }
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
