import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let blogHeader
    let blogContent
    let updateLikes
    let removeBlog
    let user

    const blog = {
        title: 'This is the title',
        author: 'John',
        url: 'http://new.blog/first-post/',
        likes: 1,
        user: { username: 'john' }
    }

    beforeEach(() => {
        user = null
        removeBlog = jest.fn()
        updateLikes = jest.fn()

        component = render(
            <Blog
                blog={blog}
                user={user}
                removeBlog={removeBlog}
                updateLikes={updateLikes} />
        )

        blogHeader = component.container.querySelector('.blogHeader')
        blogContent = component.container.querySelector('.blogContent')
    })

    test('header content displays, togglable content does not', () => {
        expect(blogHeader).not.toHaveStyle('display: none')

        expect(blogHeader).toHaveTextContent(blog.title)
        expect(blogHeader).toHaveTextContent(blog.author)
        expect(blogHeader).not.toHaveTextContent(blog.url)
        expect(blogHeader).not.toHaveTextContent('likes')

        expect(blogContent).toHaveStyle('display: none')
    })

    test('blog togglable content displays when button is pressed', () => {
        const viewButton = component.container.querySelector('button')
        // simulate clicking the button to view more details on the blog
        fireEvent.click(viewButton)

        // blog header should now be hidden and blog content should be displayed
        expect(blogHeader).toHaveStyle('display: none')

        expect(blogContent).not.toHaveStyle('display: none')
        expect(blogContent).toHaveTextContent(blog.url)
        expect(blogContent).toHaveTextContent(`likes ${blog.likes}`)
    })

    test('blog togglable content displays when button is pressed', () => {
        const likeButton = component.getByText('like')
        // simulate clicking button twice
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        // check that the button function was invoked twice
        expect(updateLikes.mock.calls).toHaveLength(2)
    })


})