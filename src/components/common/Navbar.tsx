import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click is outside nav and not on the toggle button
      if (
        navRef.current && 
        !navRef.current.contains(event.target as Node) && 
        btnRef.current && 
        !btnRef.current.contains(event.target as Node) && 
        isMenuOpen
      ) {
        closeMenu();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Log state changes to debug
  useEffect(() => {
    console.log('Menu open state changed:', isMenuOpen);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
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
        
        <div className={`menu-icon-container ${isMenuOpen ? 'active' : ''}`}>
          <button 
            ref={btnRef}
            className="menu-toggle-btn"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        
        <nav 
          ref={navRef}
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