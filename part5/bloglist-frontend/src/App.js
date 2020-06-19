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
            setUser(userLoggedInBlogApp)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem('userLoggedInBlogApp', user)

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
        }
    }

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
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App