const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
    const contents = request.body

    // check that required properties exist
    if (contents.title === undefined ||
        contents.url === undefined) {
        return response.status(400).end()
    }

    const blog = new Blog(contents)

    const newBlog = await blog.save()
    response.status(201).json(newBlog)
})

module.exports = blogsRouter