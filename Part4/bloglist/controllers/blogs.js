const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

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

// const getTokenFrom = (request) => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }

//     return null
// }

blogsRouter.post('/', async (request, response, next) => {
    try {
        const blog = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'Token missing or invalid '})
        }

        const user = request.user

        const newBlog = new Blog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes || 0,
            user: user._id
        })

        const savedBlog = await newBlog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (e) {
        next(e)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const blogToBeDeleted = await Blog.findById(request.params.id)

        // if (!request.token || !decodedToken.id) {
        //     return response.status(401).json({ error: 'Token missing or invalid '})
        // } else if (request.user._id.toString() !== blogToBeDeleted.user.toString()) {
        //     return response.status(401).json({ error: 'Invalid user' })
        // }

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
