import React from 'react'

const Blog = ({ blog }) => (
    <div>
        {blog.title} <b>{blog.author}</b>
    </div>
)

export default Blog
