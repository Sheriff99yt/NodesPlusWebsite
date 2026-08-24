import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Footer.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`footer ${theme} ${className || ''}`}>
      <div className="content-wrapper">
        <div className="footer-content">
          <p className="copyright">&copy; {year} NodesPlus. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/architecture" className="footer-link">Architecture</Link>
            <Link to="/documentation" className="footer-link">Docs</Link>
            <a href="https://discord.gg/2Pu9ywaptN" target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a>
            <a href="https://github.com/Sheriff99yt/NodesPlusWebsite" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
