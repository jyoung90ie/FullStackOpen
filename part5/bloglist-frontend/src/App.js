import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
    // const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const userLoggedInBlogApp = window.localStorage.getItem('userLoggedInBlogApp')

        if (userLoggedInBlogApp) {
            const user = JSON.parse(userLoggedInBlogApp)
            setUser(user)

            blogService.setToken(user.token)
        }

        const blogs = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }

        blogs()
    }, [])

    const handleSetMessage = (message) => {
        setMessage(message)
        setTimeout(() => setMessage(null), 5000)
    }

    const handleSetError = (error) => {
        setError(`Error: ${error}`)
        setTimeout(() => setError(null), 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'userLoggedInBlogApp', JSON.stringify(user)
            )

            blogService.setToken(user.token)

            setUser(user)
            handleSetMessage('You are now logged in')
            setUsername('')
            setPassword('')
        } catch (exception) {
            handleSetError(exception.response.data.error)
        }
    }

    const handleLogout = () => {
        if (user) {
            setUser(null)
            window.localStorage.removeItem('userLoggedInBlogApp')
            blogService.setToken(null)
            handleSetMessage('You are now logged out')
        }
    }


    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                Username: <input
                    id="username"
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                /> <br />
                    Password: <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                /><br />
                <input type="submit" />
            </form>
        </div>
    )

    const userLoggedIn = () => (
        <div>
            <p>Welcome back {user.name}
                <button onClick={handleLogout}>logout</button></p>
            {addBlogForm()}
        </div>
    )

    const addBlog = async blogObject => {
        try {
            const newBlog = await blogService.create(blogObject)

            setBlogs(blogs.concat(newBlog))
            handleSetMessage(`New blog '${blogObject.title}' by ${blogObject.author} added`)
        } catch (exception) {
            handleSetError(exception.response.data.error)
        }
    }

    const updateLikes = async (blogObject) => {
        // filter for only blog user clicked
        // const blogObject = blogs.filter(blog => blog.id === blogId)[0]

        const updatedBlogObject = {
            ...blogObject,
            likes: blogObject.likes + 1
        }

        try {
            // send put request
            const response = await blogService.update(blogObject.id, updatedBlogObject)

            // refresh blogs state variable
            setBlogs(blogs.map(blog => {
                if (blog.id === blogObject.id) {
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

    const removeBlog = async (blogObject) => {
        const confirmation = window.confirm(`Are you sure you want to delete '${blogObject.title}' ?`)

        if (!confirmation) {
            return null
        }

        try {
            await blogService.remove(blogObject.id)

            handleSetMessage(`Removed the blog '${blogObject.title}'`)
            setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        } catch (exception) {
            handleSetError(exception.response.data.error)
        }
    }

    const addBlogForm = () => {
        return (
            <Togglable buttonLabel='new blog'>
                <BlogForm createBlog={addBlog} />
            </Togglable>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={error} className='messageBox error' />
            <Notification message={message} className='messageBox success' />
            {user === null
                ? loginForm()
                : userLoggedIn()
            }
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => {
                    return (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            updateLikes={updateLikes}
                            removeBlog={removeBlog} />
                    )
                })
            }
        </div>
    )
}

export default App