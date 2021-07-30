const bcrypt = require('bcrypt')
const User = require('../models/user')
const testHelper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ _id: "111111111111111111111111", username: 'root', name: 'Superuser', passwordHash })
    await user.save()
})

describe('user API post tests', () => {
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    }, 100000)

    test('users with usernames/passwords less than 3 char long are not created', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const invalidUser = {
            username: 'br',
            name: 'Bruh',
            password:'br'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).not.toContain(invalidUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
