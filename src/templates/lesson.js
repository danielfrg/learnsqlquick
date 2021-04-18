import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BaseStyles, Flex, Grid } from "@primer/components"
import React from "react"
import SEO from "../components/seo"

export default function Template({ data }) {
    const { mdx } = data
    const { frontmatter, body } = mdx

    return (
        <>
            <SEO title={frontmatter.title} />
            <Flex
                className="lesson container markdown-body"
                flexDirection="column"
            >
                <h1>{frontmatter.title}</h1>
                <MDXRenderer>{body}</MDXRenderer>
            </Flex>
        </>
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
