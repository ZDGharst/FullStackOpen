const users = [
  {
    name: 'Zach Gharst',
    username: 'ZDGharst',
    password: 'secret'
  },
  {
    name: 'Lindsay Gharst',
    username: 'LGGharst',
    password: 'confidential'
  }
]

const blogs = [
  {
    title: 'Component testing is done with react-testing-library',
    author: 'Zach Gharst',
    url: 'http://github.com'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }
]

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', users[0])
    cy.request('POST', 'http://localhost:3003/api/users', users[1])

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('Succeeds with correct credentials', function() {
    cy.get('#username').type(users[0].username)
    cy.get('#password').type(users[0].password)
    cy.get('#login-button').click()

    cy.contains('User Zach Gharst is logged in')
  })

  it('Fails with wrong credentials', function() {
    cy.get('#username').type(users[0].username)
    cy.get('#password').type('sekreet')
    cy.get('#login-button').click()

    cy.contains('Invalid username or password.')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', `User ${users[0].name} is logged in`)
  })

  describe('When logged in...', function() {
    beforeEach(function() {
      cy.login(users[0])
    })

    it('A new blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type(blogs[0].title)
      cy.get('#author').type(blogs[0].author)
      cy.get('#url').type(blogs[0].url)
      cy.contains('create').click()
      cy.contains(blogs[0].title)
    })

    describe('...and a blog exists...', function() {
      beforeEach(function() {
        cy.createBlog(blogs[0])
        cy.createBlog(blogs[1])
        cy.createBlog(blogs[2])
      })

      it('The like button can be pressed', function() {
        cy.contains('View').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('The delete button can be pressed', function() {
        cy.contains('View').click()
        cy.contains('delete blog').click()
        cy.get('.infoNotification').should('contain', blogs[0].title)
        cy.get('.blog').should('not.contain', blogs[0].title)
      })

      it('The delete button can\'t be pressed by different user', function() {
        cy.login(users[1])
        cy.contains('View').click()
        cy.get('.blog').should('not.contain', 'delete blog')
      })

      it.only('Sort by likes', function() {
        cy.contains(blogs[2].title)
          .contains('View').click()
        cy.contains(blogs[2].title)
          .parent()
          .find('button')
          .contains('Like')
          .as('likeButton')
        cy.get('@likeButton').click()
        cy.wait(100)
        cy.get('@likeButton').click()
        cy.contains('Likes: 2')
        cy.visit('http://localhost:3000')
        cy.contains('View').click()
        cy.contains('Likes: 2')
      })
    })
  })
})