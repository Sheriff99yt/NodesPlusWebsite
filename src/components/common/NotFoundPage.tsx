import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-message">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="not-found-button">
            Return to Home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage; 