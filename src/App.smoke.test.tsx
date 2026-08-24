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
    const skip = screen.getByRole('link', { name: /Skip to content/i });
    expect(skip).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toBeTruthy();
  });

  it('renders Documentation landing without a nested main', async () => {
    render(
      <MemoryRouter basename="/NodesPlusWebsite" initialEntries={['/NodesPlusWebsite/documentation']}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(await screen.findByRole('heading', { level: 1, name: 'Documentation' }, { timeout: 8000 })).toBeInTheDocument();
    expect(document.querySelectorAll('main').length).toBe(1);
    expect(document.getElementById('main-content')?.tagName).toBe('MAIN');
  });
});
