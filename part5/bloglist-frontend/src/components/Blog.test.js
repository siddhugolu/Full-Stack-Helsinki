import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('renders the contents of blog', () => {
  let component

  beforeEach(() => {

    const user = {
      token: "somethingRandom",
      username: "siddhugolu",
      name: "Siddhartha"
    }

    const blog = {
      title: 'Checking with react-testing library',
      author: 'Siddhartha',
      url: 'https://www.thelazyoxymoron.me',
      user: user,
      likes: 100
    }

    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('by default shows correct style', () => {
    const div = component.container.querySelector('.defaultShortView')
    expect(div).not.toHaveStyle('display: none')
  })

  test('by default does not show likes and url', () => {
    const div = component.container.querySelector('.defaultShortView')
    expect(div).not.toHaveTextContent('https://www.thelazyoxymoron.me')
  })

  test('clicking the button shows the details of the blog', () => {
    const button = component.getByText('Show Details')
    fireEvent.click(button)

    const div = component.container.querySelector('.longView')
    expect(div).toHaveTextContent('https://www.thelazyoxymoron.me')
    expect(div).toHaveTextContent('likes')

  })

})

test('clicking the button twice calls the event handler twice as well', () => {

  let component

  const user = {
    token: "somethingRandom",
    username: "siddhugolu",
    name: "Siddhartha"
  }

  const blog = {
    title: 'Checking with react-testing library',
    author: 'Siddhartha',
    url: 'https://www.thelazyoxymoron.me',
    user: user,
    likes: 100
  }

  const mockHandler = jest.fn()

  component = render(
    <Blog blog={blog} user={user} increaseLike={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})