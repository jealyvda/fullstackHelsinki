const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
   response.json(updatedBlog)
})

blogRouter.post('/', async (request, response) => {
  if (!(request.token && request.token.id)) {
    return response.status(401).json({ error: 'missing or invalid token'});
  }

  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  if (!(request.token && request.token.id)) {
    return response.status(401).json({ error: 'missing or invalid token'});
  }

  const blog = await Blog.findById(request.params.id)

  if (request.user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({
      error: 'blog can only be deleted by user who created it'
    })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
