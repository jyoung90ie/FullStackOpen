import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLogout = event => {
        if (user) {
            setUser(null)
            window.localStorage.removeItem('userLoggedInBlogApp')
            blogService.setToken(null)
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

        const newBlog = await blogService.create(blog)

        if (newBlog) {
            setBlogs(blogs.concat(newBlog))
            console.log('new blog', newBlog)
        } else {
            console.log('error', newBlog)
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

    if (user === null) {
        return (
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
    }


    return (
        <div>
            <h2>blogs</h2>
            <p>Welcome back {user.name}
                <button onClick={handleLogout}>logout</button></p>
            <AddBlogForm /><br />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        </div>
    )
}

export default App