import { Flex } from "@primer/components"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { LessonsSidebar, SEO, SiteFooter } from "../components"

export default function Template({ data }) {
    const { mdx } = data
    const { frontmatter, body } = mdx

    return (
        <>
            <SEO title={frontmatter.title} />
            <Flex className="lessons-wrapper" flexDirection="row">
                <LessonsSidebar />
                <Flex
                    className="lesson container-text markdown-body"
                    flexDirection="column"
                >
                    <h1>{frontmatter.title}</h1>
                    <MDXRenderer>{body}</MDXRenderer>
                    <SiteFooter />
                </Flex>
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
