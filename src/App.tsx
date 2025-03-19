import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import useAnalytics from './hooks/useAnalytics';
import { ThemeProvider } from './context/ThemeContext';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const Documentation = lazy(() => import('./pages/Documentation'));
const NotFoundPage = lazy(() => import('./components/common/NotFoundPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// The base path is set in vite.config.ts for GitHub Pages deployment
const App: React.FC = () => {
  const location = useLocation();
  const analytics = useAnalytics();

  useEffect(() => {
    // Scroll to the top when changing routes
    window.scrollTo(0, 0);
    
    // Track page view
    analytics.trackPageView(location.pathname, document.title);
    
    // Debug message visible to user
    console.log('Current route:', location.pathname);
  }, [location, analytics]);

  return (
    <ThemeProvider>
      <div className="app">
        {import.meta.env.DEV && (
          <div 
            style={{ 
              background: '#ff9800', 
              color: 'black', 
              padding: '5px 10px', 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              zIndex: 9999, 
              fontSize: '12px',
              borderRadius: '0 0 4px 0'
            }}
          >
            Debug: {location.pathname}
          </div>
        )}
        
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/:categoryId" element={<Documentation />} />
            <Route path="/documentation/:categoryId/:nodeId" element={<Documentation />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
