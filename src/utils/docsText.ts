export function highlightText(text: string, searchTerm: string): string {
  if (!text || !searchTerm || searchTerm.length < 2) return text;
  const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<span class="highlight">$1</span>');
}

export function nodeCountLabel(count: number): string {
  return count === 1 ? '1 node' : `${count} nodes`;
}
