const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})


describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])

        expect(result).toBe(0)
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 9,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)

        expect(result).toBe(9)
    })

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Another Wonderful Post',
            author: 'Stan',
            url: 'http://www.dummy.url/SomeWhere/1/',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a420aa71b64a676234d17f3',
            title: 'Did I really just do that?',
            author: 'That Met',
            url: 'http://www.dummy.url/SomeWhere/2/',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a412aa71b24a676234d17f5',
            title: 'Sometimes is all the times',
            author: 'The Man',
            url: 'http://www.dummy.url/SomeWhere/3/',
            likes: 11,
            __v: 0
        },
    ]

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithManyBlogs)

        expect(result).toBe(21)
    })
})

describe('favorite blog', () => {
    test('of empty list is zero', () => {
        const result = listHelper.favoriteBlog([])

        expect(result).toEqual([])
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 9,
            __v: 0
        }
    ]

    test('when list has only one blog that blog will have most likes', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)

        expect(result).toEqual(listWithOneBlog)
    })

    const listWithManyBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Another Wonderful Post',
            author: 'Stan',
            url: 'http://www.dummy.url/SomeWhere/1/',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a420aa71b64a676234d17f3',
            title: 'Did I really just do that?',
            author: 'That Met',
            url: 'http://www.dummy.url/SomeWhere/2/',
            likes: 3,
            __v: 0
        },
        {
            _id: '5a412aa71b24a676234d17f5',
            title: 'Sometimes is all the times',
            author: 'The Man',
            url: 'http://www.dummy.url/SomeWhere/3/',
            likes: 11,
            __v: 0
        },
    ]



    test('the blog with the most likes', () => {
        const expectedResult = [{
            _id: '5a412aa71b24a676234d17f5',
            title: 'Sometimes is all the times',
            author: 'The Man',
            url: 'http://www.dummy.url/SomeWhere/3/',
            likes: 11,
            __v: 0
        }]

        const result = listHelper.favoriteBlog(listWithManyBlogs)
        expect(result).toEqual(expectedResult)
    })

})

describe('author with most blogs', () => {
    test('no blogs', () => {
        const result = listHelper.mostBlogs([])

        expect(result).toEqual([])
    })


    test('multiple blog posts, all different authors', () => {
        // objects all have different authors
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Another Wonderful Post',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/1/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a420aa71b64a676234d17f3',
                title: 'Did I really just do that?',
                author: 'That Met',
                url: 'http://www.dummy.url/SomeWhere/2/',
                likes: 3,
                __v: 0
            },
            {
                _id: '5a412aa71b24a676234d17f5',
                title: 'Sometimes is all the times',
                author: 'The Man',
                url: 'http://www.dummy.url/SomeWhere/3/',
                likes: 11,
                __v: 0
            },
        ]
        const result = listHelper.mostBlogs(blogs)

        const expectedResult = [
            { author: 'Stan', blogs: 1 },
            { author: 'That Met', blogs: 1 },
            { author: 'The Man', blogs: 1 },
        ]

        expect(result).toEqual(expectedResult)
    })



    test('multiple blog posts, all different authors', () => {
        // two objects share the same author
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Another Wonderful Post',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/1/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a420aa71b64a676234d17f3',
                title: 'Did I really just do that?',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/2/',
                likes: 3,
                __v: 0
            },
            {
                _id: '5a412aa71b24a676234d17f5',
                title: 'Sometimes is all the times',
                author: 'The Man',
                url: 'http://www.dummy.url/SomeWhere/3/',
                likes: 11,
                __v: 0
            },
        ]

        const result = listHelper.mostBlogs(blogs)

        const expectedResult = [
            {
                author: 'Stan',
                blogs: 2
            }
        ]

        expect(result).toEqual(expectedResult)
    })
})


describe('author with most likes', () => {
    test('no blogs', () => {
        const result = listHelper.mostLikes([])

        expect(result).toEqual([])
    })


    test('multiple blog posts, all different authors', () => {
        // objects all have different authors
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Another Wonderful Post',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/1/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a420aa71b64a676234d17f3',
                title: 'Did I really just do that?',
                author: 'That Met',
                url: 'http://www.dummy.url/SomeWhere/2/',
                likes: 3,
                __v: 0
            },
            {
                _id: '5a412aa71b24a676234d17f5',
                title: 'Sometimes is all the times',
                author: 'The Man',
                url: 'http://www.dummy.url/SomeWhere/3/',
                likes: 11,
                __v: 0
            },
        ]
        const result = listHelper.mostLikes(blogs)
        const expectedResult = [{ author: 'The Man', likes: 11 }]

        expect(result).toEqual(expectedResult)
    })



    test('multiple blog posts, all different authors', () => {
        // two objects share the same author
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Another Wonderful Post',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/1/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a420aa71b64a676234d17f3',
                title: 'Did I really just do that?',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/2/',
                likes: 3,
                __v: 0
            },
            {
                _id: '5a412aa71b24a676234d17f5',
                title: 'Sometimes is all the times',
                author: 'The Man',
                url: 'http://www.dummy.url/SomeWhere/3/',
                likes: 11,
                __v: 0
            },
            {
                _id: '5a420av71b64a676234d17f3',
                title: 'Did I really just do that?',
                author: 'Stan',
                url: 'http://www.dummy.url/SomeWhere/2/',
                likes: 1,
                __v: 0
            },
            {
                _id: '5a412aa71b24a676234d17f5',
                title: 'Sometimes is all the times',
                author: 'The Man',
                url: 'http://www.dummy.url/SomeWhere/3/',
                likes: 7,
                __v: 0
            },
            {
                _id: '5a412aa71b24a676234d17f5',
                title: 'Sometimes is all the times',
                author: 'New Man',
                url: 'http://www.dummy.url/SomeWhere/3/',
                likes: 11,
                __v: 0
            },
        ]

        const result = listHelper.mostLikes(blogs)

        const expectedResult = [{ author: 'The Man', likes: 18 }]

        expect(result).toEqual(expectedResult)
    })
})