const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    // use reducer function to return maximum likes value
    const getMaxLikes = (maxLikes, blog) => {
        if (blog.likes > maxLikes) {
            return blog.likes
        }
        return maxLikes
    }

    const maxLikes = blogs.reduce(getMaxLikes, 0)

    // filter the array for the blog with the max likes and return it
    return blogs.filter(blog => blog.likes === maxLikes)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}