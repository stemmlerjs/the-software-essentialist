import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from '../Popup';

test('renders login button when not authenticated', () => {
  render(<Popup />);
  const loginButton = screen.getByText(/Login with Google/i);
  expect(loginButton).toBeInTheDocument();
});
