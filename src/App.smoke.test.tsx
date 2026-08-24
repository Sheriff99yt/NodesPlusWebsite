import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

describe('router smoke', () => {
  it('renders the Home H1', async () => {
    render(
      <MemoryRouter basename="/NodesPlusWebsite" initialEntries={['/NodesPlusWebsite/']}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(
      await screen.findByRole('heading', { level: 1, name: /Nodes Plus/i }),
    ).toBeInTheDocument();
  });
});
