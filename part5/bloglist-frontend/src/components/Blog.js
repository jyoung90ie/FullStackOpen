import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }

    const toggleVisbility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        marginTop: 3,
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 2
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                <strong>{blog.title}</strong>
                <button onClick={toggleVisbility}>view</button>
            </div>
            <div style={showWhenVisible}>
                <strong>{blog.title}</strong>
                <button onClick={toggleVisbility}>hide</button> <br />
                {blog.url} <br />
                likes {blog.likes} <button>like</button> <br />
                {blog.author}
            </div>
        </div>
    )
}
export default Blog
