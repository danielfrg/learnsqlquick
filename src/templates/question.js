import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

export default function Template({ data }) {
    const { mdx } = data
    const { frontmatter, body } = mdx

    return (
        <div className="blog-post-container">
            <div className="blog-post">
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
                <MDXRenderer>{body}</MDXRenderer>
            </div>
        </div>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        mdx(frontmatter: { slug: { eq: $slug } }) {
            frontmatter {
                slug
                title
            }
            body
        }
    }
`
