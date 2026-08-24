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
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.querySelectorAll(
        '#root, .app-shell, .app-shell-body, .documentation-page, .documentation-container, .docs-main-content, .sidebar-inner, .architecture-page'
      ).forEach((el) => {
        (el as HTMLElement).scrollTop = 0;
      });
      const main = document.getElementById('main-content');
      if (main) {
        main.scrollTop = 0;
      }
    };

    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    analytics.trackPageView(location.pathname, document.title);
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.key, analytics]);

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
