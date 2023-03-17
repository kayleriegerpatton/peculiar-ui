import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../App'

test('Landing page renders a header', () => {
  // render the landing page
  render(<App />)
  // check that the aria-role 'banner' (equivalent to HTML <header>) is rendered
  screen.getByRole('banner')
})