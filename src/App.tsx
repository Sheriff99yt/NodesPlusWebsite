import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import useAnalytics from './hooks/useAnalytics';
import Layout from './components/common/Layout';

const Home = lazy(() => import('./pages/Home'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Architecture = lazy(() => import('./pages/Architecture'));
const NotFoundPage = lazy(() => import('./components/common/NotFoundPage'));

const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const analytics = useAnalytics();

  useEffect(() => {
    window.scrollTo(0, 0);
    analytics.trackPageView(location.pathname, document.title);
  }, [location, analytics]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/documentation/:categoryId" element={<Documentation />} />
          <Route path="/documentation/:categoryId/:nodeId" element={<Documentation />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
