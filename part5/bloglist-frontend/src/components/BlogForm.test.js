import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('Creating a new blog invokes the event handler as expected', () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm createBlog={createBlog} />
        )

        const form = component.container.querySelector('form')
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')

        // check that onChange event results in field being populated
        fireEvent.change(title, {
            target: { value: 'Wonderful blog title' }
        })

        fireEvent.change(author, {
            target: { value: 'John' }
        })

        fireEvent.change(url, {
            target: { value: 'http://new.blog/info/123' }
        })

        // simulate form submission
        fireEvent.submit(form)

        // expect to see populated field values passed through to mock function
        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Wonderful blog title')
        expect(createBlog.mock.calls[0][0].author).toBe('John')
        expect(createBlog.mock.calls[0][0].url).toBe('http://new.blog/info/123')
    })
})