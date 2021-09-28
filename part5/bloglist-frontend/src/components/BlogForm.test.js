import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component

  const inputBlog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Zach Gharst',
    url: 'http://github.com'
  }

  const addBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm addBlog={addBlog} />
    )
  })

  test('Only title is rendered', () => {
    const title  = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url    = component.container.querySelector('#url')
    const form   = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: inputBlog.title }
    })
    fireEvent.change(author, {
      target: { value: inputBlog.author }
    })
    fireEvent.change(url, {
      target: { value: inputBlog.url }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(inputBlog.title)
    expect(addBlog.mock.calls[0][0].author).toBe(inputBlog.author)
    expect(addBlog.mock.calls[0][0].url).toBe(inputBlog.url)
  })
})
