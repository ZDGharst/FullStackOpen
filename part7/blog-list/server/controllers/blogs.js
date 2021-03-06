const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(request.user == null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()
  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  if(request.user == null) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === request.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'wrong user token' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blogs = await Comment.find({ blog: request.params.id })
  response.json(blogs)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({
    content: request.body.content,
    blog: request.params.id
  })

  const result = await comment.save()

  blog.comments = blog.comments.concat(result._id)
  await blog.save()
  
  response.status(201).json(result)
})

module.exports = blogsRouter
