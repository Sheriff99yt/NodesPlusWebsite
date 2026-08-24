import '@testing-library/jest-dom/vitest';

const memory: Record<string, string> = {};

const storage = {
  getItem: (key: string) => (key in memory ? memory[key] : null),
  setItem: (key: string, value: string) => {
    memory[key] = String(value);
  },
  removeItem: (key: string) => {
    delete memory[key];
  },
  clear: () => {
    for (const key of Object.keys(memory)) delete memory[key];
  },
  key: (index: number) => Object.keys(memory)[index] ?? null,
  get length() {
    return Object.keys(memory).length;
  },
};

Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true });

if (!window.scrollTo) {
  window.scrollTo = () => {};
}
