import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const user = {
    username: 'jane',
    name: 'Jane Doe',
    token: '123',
  }

  const blog = {
    author: 'Jvda',
    title: 'Test!',
    url: 'notimportant',
    likes: 0,
    user: user
  }

  const mockHandlerUpdate = jest.fn()
  const mockHandlerRemove = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={user}
        removeBlog={mockHandlerRemove}
        updateLikes={mockHandlerUpdate}
      >
      </Blog>
    ).container
  })

  test('Always displays author and title', () => {
    const input = screen.getAllByText('Jvda', { exact: false })
    const element = screen.getAllByText('Test!', { exact: false })

    expect(input).toBeDefined()
    expect(element).toBeDefined()
  })

  test('at start, children are not displayed', () => {
    const div = container.querySelector('.blogContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogContent')
    expect(div).not.toHaveStyle('display:none')
  })

  test('after clicking like button twice, event handler is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})