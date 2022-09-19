import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  it('Renders App correctly', async () => {
    render(<App />);
    expect(screen.getAllByText('Loading...').length).toBe(2);
    expect(screen.getByText('Welcome! Rick & Morty data UI'));
  });
});
