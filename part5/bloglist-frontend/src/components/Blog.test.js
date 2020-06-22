import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    // let component

    // beforeEach(() => {
    //     const handleSetMessage = jest.fn()
    //     const handleSetError = jest.fn()
    //     const user = null

    //     component = render(
    //         <Blog
    //             user={user}
    //             handleSetError={handleSetError}
    //             handleSetMessage={handleSetMessage} />
    //     )
    // })

    test('header content displays, togglable content does not', () => {
        const blog = {
            title: 'This is the title',
            author: 'John',
            url: 'http://new.blog/first-post/',
            likes: 1,
            user: { username: 'john' }
        }
        const user = null
        const removeBlog = jest.fn()
        const updateLikes = jest.fn()


        const component = render(
            <Blog
                blog={blog}
                user={user}
                removeBlog={removeBlog}
                updateLikes={updateLikes} />
        )

        const header = component.container.querySelector('.blogHeader')
        const content = component.container.querySelector('.blogContent')

        expect(header).not.toHaveStyle('display: none')

        expect(header).toHaveTextContent(blog.title)
        expect(header).toHaveTextContent(blog.author)
        expect(header).not.toHaveTextContent(blog.url)
        expect(header).not.toHaveTextContent('likes')

        expect(content).toHaveStyle('display: none')
    })


})