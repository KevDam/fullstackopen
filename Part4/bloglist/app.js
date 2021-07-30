const http = require('http')
const express = require('express')
// require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')
const User = require('./models/user')

const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: false, useFindAndModify: true, useCreateIndex: true })
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('Error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app
