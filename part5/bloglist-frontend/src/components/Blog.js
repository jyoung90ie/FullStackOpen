import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, updateLikes, removeBlog }) => {
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
        <div style={blogStyle} className="blog">
            <div style={hideWhenVisible} className="blogHeader">
                <strong>{blog.title}</strong> {blog.author}
                <button onClick={toggleVisbility}>view</button>
            </div>
            <div style={showWhenVisible} className="blogContent">
                <strong>{blog.title}</strong>
                <button onClick={toggleVisbility}>hide</button> <br />
                {blog.url} <br />
                    likes {blog.likes} <button onClick={() => updateLikes(blog)}>like</button> <br />
                {blog.author}<br />
                {(user && (user.username === blog.user.username))
                    ? <button onClick={() => removeBlog(blog)}>remove</button>
                    : ''}
            </div>
        </div>
    )
}


Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object,
    updateLikes: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Blog
