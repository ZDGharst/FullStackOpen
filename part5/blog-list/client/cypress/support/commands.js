Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})