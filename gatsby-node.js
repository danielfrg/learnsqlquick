const _ = require("lodash")
const path = require("path")

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (_.get(node, "internal.type") === `MarkdownRemark`) {
        // Get the parent node
        const parent = getNode(_.get(node, "parent"))

        createNodeField({
            node,
            name: "collection",
            value: _.get(parent, "sourceInstanceName"),
        })
    }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const results = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        fields {
                            collection
                        }
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `)

    // Handle errors
    if (results.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    // Handle success
    const lessonTemplate = path.resolve(`src/templates/lesson.js`)
    const questionTemplate = path.resolve(`src/templates/question.js`)

    const allEdges = results.data.allMarkdownRemark.edges

    const lessonEdges = allEdges.filter(
        edge => edge.node.fields.collection === `lesson`
    )
    const questionEdges = allEdges.filter(
        edge => edge.node.fields.collection === `question`
    )

    _.each(lessonEdges, (edge, index) => {
        const previous =
            index === lessonEdges.length - 1
                ? null
                : lessonEdges[index + 1].node
        const next = index === 0 ? null : lessonEdges[index - 1].node

        createPage({
            path: `${edge.node.frontmatter.slug}`,
            component: lessonTemplate,
            context: {
                slug: edge.node.frontmatter.slug,
                previous,
                next,
            },
        })
    })

    _.each(questionEdges, (edge, index) => {
        const previous =
            index === questionEdges.length - 1
                ? null
                : questionEdges[index + 1].node
        const next = index === 0 ? null : questionEdges[index - 1].node

        createPage({
            path: `${edge.node.frontmatter.slug}`,
            component: questionTemplate,
            context: {
                slug: edge.node.frontmatter.slug,
                previous,
                next,
            },
        })
    })
}
