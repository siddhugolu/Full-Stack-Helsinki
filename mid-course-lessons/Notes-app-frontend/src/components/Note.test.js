import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Note from './Note'
import Togglable from './Togglable'

/*

test('renders content', () => {
  const note = {
    content: 'Component testing is done by react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done'
  )
})

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done by react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('ake not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

*/

describe('<Togglabe />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})