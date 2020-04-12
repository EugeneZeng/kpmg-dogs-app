import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders no image text.', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/No images here!/i);
  expect(linkElement).toBeInTheDocument();
});
test('render select and send request.', async () => {
  const { getByDisplayValue } = render(<App />);
  expect(getByDisplayValue('--Loading breeds--')).toBeInTheDocument();
});
