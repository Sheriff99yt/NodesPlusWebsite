import { useState, useEffect } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Reset body scroll lock when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={`navbar ${theme}`} role="banner">
      <div className="navbar-content">
        <RouterLink 
          to="/" 
          className="navbar-logo"
          aria-label="Nodes Plus Home"
          onClick={closeMenu}
        >
          <img 
            src="/NodesPlusWebsite/images/branding/Logo.png" 
            alt="Nodes Plus Logo" 
            className="navbar-logo-image"
            width="180"
            height="40"
          />
        </RouterLink>
        
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <nav 
          role="navigation" 
          aria-label="Main Navigation"
          className={isMenuOpen ? 'open' : ''}
        >
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>
          
          <NavLink 
            to="/documentation" 
            className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}
            onClick={closeMenu}
          >
            Documentation
          </NavLink>
          
          <a 
            href="https://www.fab.com/sellers/Sherif%20Hany" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-button navbar-button-blue"
            aria-label="Get Nodes Plus on Fab.com (opens in a new tab)"
            onClick={closeMenu}
          >
            Get on Fab.com
          </a>
          
          <a 
            href="https://discord.gg/2Pu9ywaptN" 
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-button navbar-button-purple"
            aria-label="Join Discord Community (opens in a new tab)"
            onClick={closeMenu}
          >
            Join Discord
          </a>
          
          <ThemeToggle />
        </nav>
        
        {isMenuOpen && (
          <div 
            className="navbar-overlay visible" 
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        )}
      </div>
    </header>
  );
};

export default Navbar; 