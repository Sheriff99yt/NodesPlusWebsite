import { describe, expect, it } from 'vitest';
import { getNodeById, getNodesByCategory, nodes, searchNodes } from './nodes';

describe('node catalog helpers', () => {
  const first = nodes[0];

  it('getNodeById returns a known node and handles missing ids', () => {
    expect(first).toBeDefined();
    expect(getNodeById(first.id)).toEqual(first);
    expect(getNodeById(undefined)).toBeUndefined();
    expect(getNodeById('not-a-real-node')).toBeUndefined();
  });

  it('getNodesByCategory returns only that category', () => {
    const matches = getNodesByCategory(first.category);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((node) => node.category === first.category)).toBe(true);
    expect(getNodesByCategory('missing-category')).toEqual([]);
  });

  it('searchNodes matches name or keywords and ignores empty queries', () => {
    expect(searchNodes('')).toEqual([]);
    expect(searchNodes('   ')).toEqual([]);
    const byName = searchNodes(first.name);
    expect(byName.some((node) => node.id === first.id)).toBe(true);
    const byKeyword = searchNodes(first.searchKeywords[0]);
    expect(byKeyword.length).toBeGreaterThan(0);
  });
});
