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
            cy.visit('http://localhost:3000')
            // user login - stores token in localstorage for each test
            cy.get('#username').type('test_user')
            cy.get('#password').type('testing123')
            cy.get('input[type="submit"]').click()
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
                cy.contains('new blog').click()
                // populate inputs
                cy.get('#title').type('My First Blog - Yay!')
                cy.get('#author').type('Mr Tester')
                cy.get('#url').type('/my-blog-post-yay/')
                // submit form
                cy.get('input[type="submit"][value="create"]').click()
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
        })
    })
})