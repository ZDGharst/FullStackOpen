describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Zach Gharst',
      username: 'ZDGharst',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('Succeeds with correct credentials', function() {
    cy.get('#username').type('ZDGharst')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('User Zach Gharst is logged in')
  })

  it('Fails with wrong credentials', function() {
    cy.get('#username').type('ZDGharst')
    cy.get('#password').type('sekreet')
    cy.get('#login-button').click()

    cy.contains('Invalid username or password.')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'User Zach Gharst is logged in')
  })
})