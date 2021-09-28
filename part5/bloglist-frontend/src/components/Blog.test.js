import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const user = {
    username: 'ZDGharst'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Zach Gharst',
    url: 'http://github.com',
    likes: 5,
    user: user
  }

  const likeBlog = () => {}
  const deleteBlog = () => {}

  beforeEach(() => {
    component = render(
      <Blog user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
    )
  })

  test('Only title is rendered', () => {
    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(component.container).not.toHaveTextContent('Zach Gharst')
    expect(component.container).not.toHaveTextContent('http://github.com')
    expect(component.container).not.toHaveTextContent('5')
  })

  test('All content is rendered after show details', () => {
    const showDetailsButton = component.getByText('View')
    fireEvent.click(showDetailsButton)

    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(component.container).toHaveTextContent('Zach Gharst')
    expect(component.container).toHaveTextContent('http://github.com')
    expect(component.container).toHaveTextContent('5')
  })
})
