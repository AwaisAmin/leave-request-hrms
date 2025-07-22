import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // Add a simple test for the header
  expect(screen.getByText(/Leave Request \(HRMS Module\)/i)).toBeInTheDocument();
});
