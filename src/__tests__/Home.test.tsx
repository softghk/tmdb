import React from 'react'
import {render, screen, fireEvent, act} from '@testing-library/react'
import Home from '../pages/index'
import {QueryClientWrapper} from '@layout'

describe('Home Page', () => {
  const HomeScreen = (
    <QueryClientWrapper>
      <Home />
    </QueryClientWrapper>
  )

  // Mock localStorage methods
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  }

  beforeAll(() => {
    Object.defineProperty(global, 'localStorage', {value: localStorageMock})
  })

  beforeEach(() => {
    // Clear mock function calls before each test
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
  })

  test('it should render the component', () => {
    const {container} = render(HomeScreen)
    expect(container).toMatchSnapshot()
  })
})
