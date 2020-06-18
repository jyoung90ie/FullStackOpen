const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


describe('blogs', () => {
    const initialUser = {
        username: 'john',
        name: 'John Smith',
        password: 'thimsnhoj'
    }
    // one-time setup
    beforeAll(async () => {
        await User.deleteMany({})

        // create user
        const user = await api
            .post('/api/users')
            .send(initialUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // login and get token
        const login = await api
            .post('/api/login')
            .send({
                username: initialUser.username,
                password: initialUser.password
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // set a global variable to allow token to be accessed by all tests
        // app expects token to be 'bearer TOKENHERE'
        global.token = 'bearer ' + login.body.token
        global.userId = user.body.id
    })

    // user is added when blogs are saved to DB, to prevent issues with promises resolving after initialBlogs is created
    const initialBlogs = [
        {
            title: 'First Blog Post',
            author: 'The Man',
            url: 'http://www.google.ie/',
            likes: 13,
        },
        {
            title: 'Once upon a time...',
            author: 'The Man',
            url: 'http://www.google.ie/',
            likes: 2,
        }
    ]

    // setup before each test
    beforeEach(async () => {
        // setup dummy data before each test
        await Blog.deleteMany({})

        // convert initialBlogs into model instances
        const blogs = initialBlogs.map(blog => {
            // add in user for blog
            blog.user = global.userId
            return new Blog(blog)
        })

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
            .set('Authorization', global.token)
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
            .set('Authorization', global.token)
            .send(blog)
            .expect(400)
    })

    test('delete a single blog', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToDelete = blogsAtStart[0].toJSON()

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', global.token)
            .expect(204)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length - 1)
        expect(response.body).not.toMatchObject(blogToDelete)
    })

    test('updated a single blog', async () => {
        const blogsAtStart = await Blog.find({})
        const blogToUpdate = blogsAtStart[0].toJSON()

        const updatedContents = {
            title: 'Updated title',
            author: 'Not the same',
            url: 'http://thischange.to'
        }

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedContents)
            .expect(200)

        const response = await api.get('/api/blogs')
        expect(response.body).toContainEqual(updatedBlog.body)
    })
})

describe('create user', () => {

    beforeEach(async () => {
        // empty table and create dummy
        await User.deleteMany({})

        const user = User({
            username: 'test_user',
            name: 'Successful User',
            passwordHash: 'password_hash213'
        })

        await user.save()
    })

    test('valid inputs, should be successful', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'test_account',
            password: 'verySecurePass123!',
            name: 'Successful User'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(200)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })

    test('no username, should be unsuccessful', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            password: 'verySecurePass123!',
            name: 'Successful User'
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('username and password fields are required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('no password, should be unsuccessful', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'asdasdasd',
            name: 'Successful User'
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error).toContain('username and password fields are required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username is too short, should be unsuccessful', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: '12',
            name: 'Successful User',
            password: 'this_is_valid'
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error)
            .toContain('username and password must contain at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password is too short, should be unsuccessful', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'test_user',
            name: 'Successful User',
            password: '21'
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body.error)
            .toContain('username and password must contain at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username is not unique, should be unsuccessful', async () => {
        const usersAtStart = await helper.usersInDb()

        const user = {
            username: 'test_user',
            name: 'Successful User',
            password: 'asdasdasdas'
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        expect(response.body.error)
            .toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
    delete global.token
    delete global.userId
})