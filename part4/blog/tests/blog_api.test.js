const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialNotes } = require('../../../.working/wpart4/notes/tests/test_helper')

const initialBlogs = [
    {
        title: 'First Blog Post',
        author: 'The Man',
        url: 'http://www.google.ie/',
        likes: 13
    },
    {
        title: 'Once upon a time...',
        author: 'The Man',
        url: 'http://www.google.ie/',
        likes: 2
    }
]

beforeEach(async () => {
    // setup dummy data before each test
    await Blog.deleteMany({})

    // convert initialBlogs into model instances
    const blogs = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())

    // do not proceed until all promises have been fulfilled
    await Promise.all(promiseArray)
})


test('check that api url is working', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

test('api returns the expected number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('response objects contain "id" property', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})


afterAll(() => {
    mongoose.connection.close()
})