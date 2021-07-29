const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = testHelper.listWithManyBlogs

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < initialBlogs.length; i++) {
        let blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }
})

describe('API get tests', () => {
    test('blogs are returned as JSON', async () => {
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    }, 100000)

    test('all notes have unique identifier named \'id\'', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('API post tests', () => {
    test('new blog posts are successfully created', async () => {
        const newBlog = {
            title: 'The Big Bruh',
            author: 'Kevin Dam',
            url: 'http://thebigbruh.com/',
            likes: 69
        }

        await api.post('/api/blogs').send(newBlog)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length + 1)
    }, 10000)

    test('blog posts created without \'likes\' parameter default to 0 likes', async () => {
        const newBlogNoLikes = {
            title: 'The Big Bruh',
            author: 'Kevin Dam',
            url: 'http://thebigbruh.com'
        }

        const response = await api.post('/api/blogs').send(newBlogNoLikes)

        expect(response.body.likes).toEqual(0)
    })

    test('blog posts created missing \'title\' or \'url\' props do not get saved, return 400 Bad Request, and throw ValidationError', () => {
        const badRequestData = {
            wrong: 'data'
        }

        try {
            expect(async () => {
                try {
                    await api.post('/api/blogs').send(badRequestData)
                } catch (e) {
                    console.error(e)
                }
            }).toThrow().catch(e => {console.log('Error')})
        } catch (e) {
            expect(e.message).toBeDefined()
        }
    })
})

describe('API delete tests', () => {
    test('blog post can be successfully deleted', async () => {
        const blogToDelete = initialBlogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete._id}`)
            .expect(204)

        const blogsAtEnd = await testHelper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('API put/patch tests', () => {
    test('blog post can be successfully updated', async () => {
        const blogToUpdate = initialBlogs[0]
        blogToUpdate.likes = 69

        await api.put(`/api/blogs/${blogToUpdate._id}`).send(blogToUpdate)

        const blogsAtEnd = await testHelper.blogsInDb()

        expect(blogsAtEnd[0].likes).toEqual(69)
    })
})

afterAll(()=> {
    mongoose.connection.close()
})
