import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addBlog}>
                title: <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                /><br />
            author: <input
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                /><br />
            url: <input
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                /><br />
                <input type="submit" value="create" />
            </form>
        </div>
    )
}

export default BlogForm