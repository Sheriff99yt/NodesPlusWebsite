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
    document.documentElement.classList.remove('dark-theme', 'light-theme');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme === 'dark-theme' ? 'dark' : 'light');
  }, [theme]);

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