const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
    const contents = request.body

    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response
            .status(401)
            .json({ error: 'You need to be logged in to complete this' })
    }
    const user = await User.findById(decodedToken.id)

    // check that required properties exist
    if (contents.title === undefined ||
        contents.url === undefined) {
        return response.status(400).end()
    }

    const blog = new Blog({
        ...contents,
        user: user.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response
            .status(401)
            .json({ error: 'You need to be logged in to complete this' })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(400).json({ error: 'Blog does not exist' })
    }

    // check blog user is the user attempting to delete
    if (user._id.toString() !== blog.user.toString()) {
        return response
            .status(401)
            .json({ error: 'You do not have permission to delete the blog' })
    }

    // user has permission, remove blog
    blog.remove()
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        { new: true })

    response.json(updatedBlog)
})

module.exports = blogsRouter