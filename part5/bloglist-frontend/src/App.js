import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const userLoggedInBlogApp = window.localStorage.getItem('userLoggedInBlogApp')

        if (userLoggedInBlogApp) {
            const user = JSON.parse(userLoggedInBlogApp)
            setUser(user)

            blogService.setToken(user.token)
        }
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

    const handleLogout = event => {
        if (user) {
            setUser(null)
            window.localStorage.removeItem('userLoggedInBlogApp')
            blogService.setToken(null)
            handleSetMessage('You are now logged out')
        }
    }

    const addBlog = async event => {
        event.preventDefault()

        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        const blog = {
            title,
            author,
            url,
        }



        try {
            const newBlog = await blogService.create(blog)
            setBlogs(blogs.concat(newBlog))
            handleSetMessage(`New blog '${title}' by ${author} added`)
        } catch (exception) {
            handleSetError(exception.response.data.error)
        }
    }

    const AddBlogForm = () => (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                title: <input
                    type="text"
                    name="title"
                /><br />
            author: <input
                    type="text"
                    name="author"
                /><br />
            url: <input
                    type="text"
                    name="url"
                /><br />
                <input type="submit" value="create" />
            </form>
        </div>
    )

    // output to user below

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                Username: <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                /> <br />
                    Password: <input
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
            <AddBlogForm /><br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={error} className='messageBox error' />
            <Notification message={message} className='messageBox success' />
            {user === null
                ? loginForm()
                : userLoggedIn()
            }

        </div>
    )
}

export default App