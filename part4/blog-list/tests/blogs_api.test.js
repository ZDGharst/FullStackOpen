const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET methods from API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(contents).toContain('React patterns')
  })

  test('check if _id is renamed to id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST methods from API', () => {
  test('add new blog via POST', async () => {
    const newBlog = {
      title: "Tidying up the Go web experience",
      author: "Russ Cox",
      url: "https://go.dev/blog/tidy-web",
      likes: 31
    }

    await api.post('/api/blogs').set('Content-type', 'application/json').send(newBlog).expect(201)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAfter.map(r => r.title)
    expect(contents).toContain(newBlog.title)
  })

  test('new blog without title should fail', async () => {
    const newBlog = {
      author: "Russ Cox",
      url: "https://go.dev/blog/tidy-web",
      likes: 31
    }

    await api.post('/api/blogs').set('Content-type', 'application/json').send(newBlog).expect(400)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })

  test('new blog without url should fail', async () => {
    const newBlog = {
      title: "Tidying up the Go web experience",
      author: "Russ Cox",
      likes: 31
    }

    await api.post('/api/blogs').set('Content-type', 'application/json').send(newBlog).expect(400)
  
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })
})

describe('DELETE methods from API', () => {
  test('delete blog from blog list', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const { id, title } = blogsAtStart[0]

    await api.delete(`/api/blogs/${id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(title)
  })
})

describe('PUT methods from API', () => {
  test('update blog in the blog list', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogUpdate = {
      ...blogToUpdate,
      title: 'New blog title'
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .set('Content-type', 'application/json')
      .send(blogUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()    
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain('New blog title')
  })
})

describe('miscellaneous', () => {
  test('missing likes property results in zero', () => {
    const testBlog = {
      title: "Tidying up the Go web experience",
      author: "Russ Cox",
      url: "https://go.dev/blog/tidy-web"
    }

    const blogObject = new Blog(testBlog)
    expect(blogObject.likes).toBe(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})