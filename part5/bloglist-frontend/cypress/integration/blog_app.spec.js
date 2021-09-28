const user = {
  name: 'Zach Gharst',
  username: 'ZDGharst',
  password: 'secret'
}

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Zach Gharst',
  url: 'http://github.com'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('Succeeds with correct credentials', function() {
    cy.get('#username').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#login-button').click()

    cy.contains('User Zach Gharst is logged in')
  })

  it('Fails with wrong credentials', function() {
    cy.get('#username').type(user.username)
    cy.get('#password').type('sekreet')
    cy.get('#login-button').click()

    cy.contains('Invalid username or password.')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', `User ${user.name} is logged in`)
  })

  describe('When logged in...', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', user)
        .then(response => {
          localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.contains('create').click()
      cy.contains(blog.title)
    })
  })
})