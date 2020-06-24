const { default: blogs } = require("../../src/services/blogs")

describe('Blog app', function () {
    beforeEach(function () {
        // clear database
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        // setup new user
        cy.request('POST', 'http://localhost:3001/api/users', {
            username: 'test_user',
            password: 'testing123',
            name: 'Mr Tester'
        })
        // open app homepage
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.get('#username')
        cy.get('#password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test_user')
            cy.get('#password').type('testing123')
            cy.get('input[type="submit"]').click()

            cy.get('.success').as('success').contains('You are now logged in')
            cy.get('@success').should('have.css', 'color', 'rgb(24, 104, 24)')

            cy.contains('Welcome back Mr Tester')
            cy.get('button').contains('logout')

        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('invalid_user')
            cy.get('#password').type('invalid_pass')
            cy.get('input[type="submit"]').click()

            cy.get('.error').as('error').contains('Error: invalid username or password')
            cy.get('@error').should('have.css', 'border-color', 'rgb(255, 0, 0)')
        })
    })

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.login('test_user', 'testing123')
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            // populate inputs
            cy.get('#title').type('My First Blog - Yay!')
            cy.get('#author').type('Mr Tester')
            cy.get('#url').type('/my-blog-post-yay/')
            // submit form
            cy.get('input[type="submit"][value="create"]').click()
            // click for success
            cy.get('.success').contains(`New blog`)
            cy.get('.blogHeader').contains(`My First Blog - Yay!`)
        })

        describe('Blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'My First Blog - Yay!',
                    author: 'Mr Tester',
                    url: '/my-blog-post-yay/'
                })
                cy.visit('http://localhost:3000')
            })

            it('user can click like for a blog', function () {
                // click button to expand blog contents
                cy.get('.blogHeader > button').click()
                // click like button
                cy.get('.blogContent').contains('likes 0')
                cy.get('.blogContent > :nth-child(5)').click()
                // check that message displayed and likes increased 
                cy.get('.success').contains('You liked the blog')
                cy.get('.blogContent').contains('likes 1')
            })

            it('user can delete own blog', function () {
                // click button to expand blog contents
                cy.get('.blogHeader > button').click()
                // check that remove button exists and click it
                cy.get('.blogContent').should('contain', 'remove')
                cy.get('.blogContent').contains('remove').click()
                // click for success
                cy.get('.success').contains('Removed the blog')
                cy.get('.blogContent').should('not.contain', 'My First Blog - Yay!')
            })

            it('user who did not create blog cannot delete it', function () {
                // logout of account
                cy.contains('logout').click()
                // setup second user and login
                cy.request('POST', 'http://localhost:3001/api/users', {
                    username: 'different_user',
                    password: 'testing123',
                    name: 'Different User'
                })
                cy.login('different_user', 'testing123')
                // expand blog and check that 'remove' button is not there
                cy.contains('view').click()
                cy.get('.blogContent').should('not.contain', 'remove')
            })
        })

        describe.only('Many blogs exist', function () {
            beforeEach(function () {
                // create additional blogs
                const blogs = [
                    {
                        title: 'Second blog',
                        author: 'Mr Tester',
                        url: '/my-blog-post-yay/',
                        likes: 1
                    },
                    {
                        title: 'Third blog',
                        author: 'Mr Tester',
                        url: '/my-blog-post-yay/',
                        likes: 9
                    },
                    {
                        title: 'Fourth blog',
                        author: 'Mr Tester',
                        url: '/my-blog-post-yay/',
                        likes: 17
                    },
                    {
                        title: 'Fifth blog',
                        author: 'Mr Tester',
                        url: '/my-blog-post-yay/',
                        likes: 16
                    }
                ]

                // create blogs via api
                blogs.map(blog => cy.createBlog(blog))

                cy.visit('http://localhost:3000')
            })
            it('Blog with the most likes appears at the top', function () {

                cy.get('.blogContent')
                    .then(blogs => {
                        // array contains the list of blog titles ordered by likes
                        const blogTitlesByMostLikes = [
                            'Fourth blog',
                            'Fifth blog',
                            'Third blog',
                            'Second blog'
                        ]

                        let arrayOfBlogs = blogs.get()
                        let blogsText = arrayOfBlogs.map(blog => blog.innerText.toLowerCase())

                        // arrays should have the same length
                        expect(blogTitlesByMostLikes).to.have.length(blogsText.length)

                        // verify ordering is by most likes, as in blogTitlesByMostLikes
                        for (let i = 0; i < blogsText.length; i++) {
                            // blog element text is checked to see if it includes 
                            // the title of the blog that should be in this position
                            expect(blogsText[i])
                                .to.include(blogTitlesByMostLikes[i].toLowerCase())
                        }
                    })
            })
        })
    })
})