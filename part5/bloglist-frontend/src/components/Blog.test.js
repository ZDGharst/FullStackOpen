import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Blog from './Blog'

test('Content is rendered', () => {
  const user = {}

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Zach Gharst',
    url: 'http://github.com',
    likes: 5
  }

  const likeBlog = () => {}
  const deleteBlog = () => {}

  const component = render(
    <Blog user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
  )

  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
  expect(component.container).not.toHaveTextContent('Zach Gharst')
  expect(component.container).not.toHaveTextContent('http://github.com')
  expect(component.container).not.toHaveTextContent('5')
})
