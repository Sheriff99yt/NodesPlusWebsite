import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="container">
      <Navbar />
      
      <main className="main-content">
        <section className="hero-section">
          <div className="content-wrapper">
            <h2 className="hero-title">Extended Blueprint Nodes for Unreal Engine</h2>
            <p className="hero-description">
              A collection of custom Blueprint nodes that extend Unreal Engine's functionality, 
              providing simplified solutions for complex operations in Blueprint scripting.
            </p>
            <div className="hero-buttons">
              <a 
                href="https://www.fab.com/sellers/Sherif%20Hany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-button primary-button"
              >
                Get NodesPlus
              </a>
              <a 
                href="https://discord.gg/2Pu9ywaptN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-button secondary-button"
              >
                Join Discord
              </a>
            </div>
          </div>
        </section>
        
        <section className="features-section">
          <div className="content-wrapper">
            <h2 className="section-title">Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Enhanced Error Handling</h3>
                <p>Comprehensive validation with detailed feedback to help you catch and fix issues quickly.</p>
              </div>
              <div className="feature-card">
                <h3>Better Documentation</h3>
                <p>Detailed tooltips, usage examples, and performance considerations for every node.</p>
              </div>
              <div className="feature-card">
                <h3>Improved Discoverability</h3>
                <p>Category-based organization and metadata-driven search for easily finding the right node.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home; 