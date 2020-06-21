import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blog = ({ handleSetMessage, handleSetError }) => {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const blogs = async () => {
            setBlogs(await blogService.getAll())
        }

        blogs()
    }, [])

    const updateLikes = async (blogId) => {
        // filter for only blog user clicked
        const blogObject = blogs.filter(blog => blog.id === blogId)[0]

        const updatedBlogObject = {
            ...blogObject,
            likes: blogObject.likes + 1
        }

        try {
            // send put request
            const response = await blogService.update(blogId, updatedBlogObject)

            // refresh blogs state variable
            setBlogs(blogs.map(blog => {
                if (blog.id === blogId) {
                    return response
                } else {
                    return blog
                }
            }))
            handleSetMessage(`You liked the blog '${blogObject.title}'`)
        } catch (exception) {
            handleSetError(exception.response.data.error)
        }
    }


    const addBlog = async blogObject => {
        try {
            const newBlog = await blogService.create(blogObject)

            setBlogs(blogs.concat(newBlog))
            handleSetMessage(`New blog '${blogObject.title}' by ${blogObject.author} added`)
        } catch (exception) {
            handleSetError(exception.response.data.error)
        }
    }

    const blogForm = () => (
        <Togglable buttonLabel='new blog'>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

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
                    likes {blog.likes} <button onClick={() => updateLikes(blog.id)}>like</button> <br />
                    {blog.author}
                </div>
            </div>
        )
    }

    return (
        <>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </>
    )

}
export default Blog
