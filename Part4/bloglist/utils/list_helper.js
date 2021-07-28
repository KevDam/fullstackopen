const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((acc, val) => acc + val)
}

const favoriteBlog = (blogs) => {
//     return blogs[blogs.indexOf(Math.max(...blogs.map(blog => blog.likes)))]

    const listOfLikes = blogs.map(blog => blog.likes)
    const max = Math.max(...listOfLikes)

    return blogs[listOfLikes.indexOf(max)]
}

const mostBlogs = (blogs) => {
    let authorsNumBlogs = []

    let listAuthors = authorsNumBlogs.map(authorNumBlog => authorNumBlog.author)

    blogs.forEach((blog) => {
        if (listAuthors.includes(blog.author)) {
            authorsNumBlogs[listAuthors.indexOf(blog.author)].blogs++
        } else {
            authorsNumBlogs.push({
                'author': blog.author,
                'blogs': 1
            })
            listAuthors = authorsNumBlogs.map(authorNumBlog => authorNumBlog.author)
        }
    })

    listNumBlogs = authorsNumBlogs.map(authorNumBlogs => authorNumBlogs.blogs)
    return authorsNumBlogs[listNumBlogs.indexOf(Math.max(...listNumBlogs))]
}

const mostLikes = (blogs) => {
    let authorsNumLikes = []

    let listAuthors = authorsNumLikes.map(authorNumLike => authorNumLike.author)

    blogs.forEach((blog) => {
        if (listAuthors.includes(blog.author)) {
            authorsNumLikes[listAuthors.indexOf(blog.author)].likes += blog.likes
        } else {
            authorsNumLikes.push({
                'author': blog.author,
                'likes': blog.likes
            })
            listAuthors = authorsNumLikes.map(authorNumLike => authorNumLike.author)
        }
    })

    listNumLikes = authorsNumLikes.map(authorNumLikes => authorNumLikes.likes)
    return authorsNumLikes[listNumLikes.indexOf(Math.max(...listNumLikes))]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
