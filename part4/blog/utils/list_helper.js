const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    // returns the total blog likes
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    // returns the blog with the most likes

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

const mostBlogs = (blogs) => {
    // returns the author with the most blogs

    // loop through blogs and return new array with only the authors
    const authors = blogs.map(blog => blog.author)
    // name of object property that stores the max number of blogs
    // this is used to determine the author with the most blogs
    const maxValueName = 'mostBlogs'

    // loop through authors and count how many blogs they have, then push to authorsBlog
    const blogCount = (authors, author) => {
        authors[author] = (authors[author] || 0) + 1
        // get max blog posts and store it as property of object
        authors[maxValueName] = Math.max(
            (authors[maxValueName] || 0), // return previous value or zero if it doesn't exist
            authors[author] // current value
        )

        return authors
    }

    // create object containing authors and number of blogs
    // output: { author: blogs, author: blogs, ..., maxValueName: Max(blogs)}
    const authorBlogsObj = authors.reduce(blogCount, {})

    // return array which contains an object for the author with most blogs 
    const authorBlogs = Object.keys(authorBlogsObj)
        // only return object that contains author with most blogs
        .filter(key => {
            return (
                // only return key-pair for author with most blogs
                authorBlogsObj[key] === authorBlogsObj[maxValueName]
                &&
                // do not return the key-pair which stores the max blogs value
                key !== maxValueName
            )
        })
        .map(key => {
            return {
                author: key,
                blogs: authorBlogsObj[key]
            }
        })

    return authorBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}