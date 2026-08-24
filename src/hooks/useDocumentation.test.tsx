import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { useDocumentation } from './useDocumentation';

function Probe() {
  const docs = useDocumentation();
  return (
    <div>
      <input
        ref={docs.searchInputRef}
        aria-label="Search nodes"
        value={docs.searchTerm}
        onChange={(event) => docs.handleSearch(event.target.value)}
      />
      <span data-testid="category">{docs.selectedCategory ?? ''}</span>
      <span data-testid="node">{docs.selectedNode?.id ?? ''}</span>
      <span data-testid="count">{String(docs.filteredNodes.length)}</span>
      <span data-testid="search">{docs.searchTerm}</span>
    </div>
  );
}

function renderDocs(entry: string) {
  return render(
    <MemoryRouter basename="/NodesPlusWebsite" initialEntries={[`/NodesPlusWebsite${entry}`]}>
      <Routes>
        <Route path="/documentation" element={<Probe />} />
        <Route path="/documentation/:categoryId" element={<Probe />} />
        <Route path="/documentation/:categoryId/:nodeId" element={<Probe />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('useDocumentation', () => {
  it('syncs category and node from the URL', () => {
    renderDocs('/documentation/math/is-nearly-equal');
    expect(screen.getByTestId('category')).toHaveTextContent('math');
    expect(screen.getByTestId('node')).toHaveTextContent('is-nearly-equal');
  });

  it('searches only after two characters', async () => {
    const user = userEvent.setup();
    renderDocs('/documentation');
    const input = screen.getByLabelText('Search nodes');
    await user.type(input, 'h');
    expect(screen.getByTestId('search')).toHaveTextContent('h');
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    await user.type(input, 'e');
    expect(Number(screen.getByTestId('count').textContent)).toBeGreaterThan(0);
  });

  it('clears search on Escape', async () => {
    const user = userEvent.setup();
    renderDocs('/documentation');
    const input = screen.getByLabelText('Search nodes');
    await user.type(input, 'he');
    expect(screen.getByTestId('search')).toHaveTextContent('he');
    input.blur();
    await user.keyboard('{Escape}');
    expect(screen.getByTestId('search')).toHaveTextContent('');
  });

  it('focuses search when / is pressed', async () => {
    const user = userEvent.setup();
    renderDocs('/documentation');
    const input = screen.getByLabelText('Search nodes');
    input.blur();
    await user.keyboard('/');
    expect(input).toHaveFocus();
  });
});
