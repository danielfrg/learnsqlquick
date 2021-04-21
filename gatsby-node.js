const _ = require("lodash")
const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        node: {
            fs: "empty",
        },
        resolve: {
            fallback: {
                crypto: false,
                fs: false,
                path: require.resolve("path-browserify"),
            },
        },
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === "Mdx") {
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

    // Ger all MDX content
    const results = await graphql(`
        query ALL_CONTENT {
            allMdx(
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

    // Split MDX content per collection
    const allEdges = results.data.allMdx.edges
    const lessonEdges = allEdges.filter(
        edge => edge.node.fields.collection === `lesson`
    )
    const questionEdges = allEdges.filter(
        edge => edge.node.fields.collection === `question`
    )

    // Create Lesson pages
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

    // Create Question pages
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
