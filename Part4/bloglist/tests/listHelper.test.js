const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(testHelper.listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has many blogs, equals the likes of all them combined', () => {
        const result = listHelper.totalLikes(testHelper.listWithManyBlogs)
        expect(result).toBe(36)
    })
  })

describe('favorite blog', () => {
    test('in list with many blogs, return blog with most likes', () => {
        const expectedResult = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          }

        const actualResult = listHelper.favoriteBlog(testHelper.listWithManyBlogs)

        expect(actualResult).toStrictEqual(expectedResult)
    })
})

describe('most blogs', () => {
    test('in list with many blogs, return author with most blogs', () => {
        const expectedResult = {
            'author': 'Robert C. Martin',
            'blogs': 3
        }

        const actualResult = listHelper.mostBlogs(testHelper.listWithManyBlogs)

        expect(actualResult).toEqual(expectedResult)
    })
})

describe('most likes', () => {
    test('in list with many blogs, return author with most likes', () => {
        expectedResult = {
            'author': "Edsger W. Dijkstra",
            'likes': 17
          }

        const actualResult = listHelper.mostLikes(testHelper.listWithManyBlogs)

        expect(actualResult).toEqual(expectedResult)
    })
})
