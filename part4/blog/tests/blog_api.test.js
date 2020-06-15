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

test('api POST request adds new blogs to the database', async () => {
    const blog = {
        title: 'New Blog - Unique Post',
        author: 'The Other Man',
        url: 'http://www.google.ie/',
        likes: 7
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(201)

    // test that objects returned include the new blog entry
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(blog.title)

})

test('creating blog without likes property should return likes with a value of 0', async () => {
    const blog = {
        title: 'I love posting blogs',
        author: 'Some Man',
        url: 'http://www.google.ie/',
    }

    const newBlog = new Blog(blog)
    await newBlog.save()

    expect(newBlog).toMatchObject({ likes: 0 })
})

test('attempting to create a blog without title or url will result in a 400 request', async () => {
    const blog = {
        author: 'Some Man',
        likes: 1
    }

    await api.post('/api/blogs')
        .send(blog)
        .expect(400)
})


afterAll(() => {
    mongoose.connection.close()
})