import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'light-theme' | 'dark-theme';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage or default to dark theme
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'dark-theme';
  });

  // Update localStorage when theme changes and apply to both body and html
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme to body for global styles
    document.body.className = theme;
    
    // Also set data-theme attribute on HTML element for CSS selectors
    document.documentElement.setAttribute('data-theme', theme === 'dark-theme' ? 'dark' : 'light');
    
    // Remove the opposite theme class if it exists
    const oppositeTheme = theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
    document.body.classList.remove(oppositeTheme);
  }, [theme]);

  // Set up keyboard shortcut for theme toggle (Ctrl+T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark-theme' ? 'light-theme' : 'dark-theme');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 