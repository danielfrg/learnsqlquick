import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"

import { Link } from "gatsby"

export default function Template({ data }) {
    const { mdx } = data
    const { frontmatter, body } = mdx

    return (
        <div>
            <h1>{frontmatter.title}</h1>
            <MDXRenderer>{body}</MDXRenderer>
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
