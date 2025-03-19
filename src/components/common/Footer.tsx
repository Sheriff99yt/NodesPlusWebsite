import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import '../../styles/Footer.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <footer className={`footer ${theme} ${className || ''}`}>
      <div className="content-wrapper">
        <div className="footer-content">
          <p className="copyright">© {new Date().getFullYear()} NodesPlus. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://discord.gg/2Pu9ywaptN" target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 