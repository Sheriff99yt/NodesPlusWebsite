import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { DISCORD_URL, FAB_URL, LOGO_SRC } from '../../utils/site';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isDocsRoute = pathname === '/documentation' || pathname.startsWith('/documentation/');
  const { theme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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

  useEffect(() => {
    if (isDocsRoute && isMenuOpen) {
      closeMenu();
    }
  }, [isDocsRoute, isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
        btnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  return (
    <header className={`navbar ${theme}${isDocsRoute ? ' on-docs' : ''}`} role="banner">
      <div className="navbar-content">
        <RouterLink to="/" className="navbar-logo-link" aria-label="Nodes Plus home" onClick={closeMenu}>
          <img
            className="navbar-logo navbar-logo-image"
            src={LOGO_SRC}
            alt="Nodes Plus home"
            width="180"
            height="40"
          />
        </RouterLink>

        <button
          ref={btnRef}
          className={`menu-toggle-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          type="button"
        >
          <span className="menu-icon" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav
          id="primary-navigation"
          ref={navRef}
          aria-label="Primary"
          className={isMenuOpen ? 'open' : ''}
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/architecture"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={closeMenu}
          >
            Architecture
          </NavLink>
          <NavLink
            to="/documentation"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            onClick={closeMenu}
          >
            Documentation
          </NavLink>
          <a
            href={FAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-button navbar-button-blue"
            onClick={closeMenu}
          >
            Get on Fab
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-button navbar-button-purple"
            onClick={closeMenu}
          >
            Discord
          </a>
          <ThemeToggle />
        </nav>

        {isMenuOpen && (
          <div className="navbar-overlay visible" onClick={closeMenu} aria-hidden="true" />
        )}
      </div>
    </header>
  );
};

export default Navbar;
