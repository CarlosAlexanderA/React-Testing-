import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from './Router'
import { getCurrentPath } from './utils'

vi.mock('./utils.js', () => ({
  getCurrentPath: vi.fn(),
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
  })
  it('should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })
  it('should render 404 if not routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    // console.log(screen.debug())
    expect(screen.getByText('404')).toBeTruthy()
  })
  it('should render the component of the first route matches', () => {
    getCurrentPath.mockReturnValue('/about')
    const routes = [
      { path: '/', Component: () => <h1>Home</h1> },
      { path: '/about', Component: () => <h1>About</h1> },
    ]
    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })
})
