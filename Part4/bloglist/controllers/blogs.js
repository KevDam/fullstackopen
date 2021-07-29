const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = request.body

        const newBlog = new Blog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes || 0
        })

        const savedBlog = await newBlog.save()
        response.status(201).json(savedBlog)
    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (e) {
        next(e)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        const oldBlog = await Blog.findById(request.params.id)

        const blogToUpdate = {
            title: body.title || oldBlog.title,
            author: body.author || oldBlog.author,
            url: body.url || oldBlog.url,
            likes: body.likes || oldBlog.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate)
        response.json(updatedBlog)
    } catch (e) {
        next(e)
    }
})

module.exports = blogsRouter
