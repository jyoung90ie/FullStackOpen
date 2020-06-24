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
})