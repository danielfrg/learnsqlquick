import { Link } from "gatsby"
import React from "react"

const PostLink = ({ post }) => (
    <div>
        <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
    </div>
)

export default PostLink
