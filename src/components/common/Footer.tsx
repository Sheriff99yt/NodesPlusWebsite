import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { AUTHOR_NAME, DISCORD_URL, FAB_URL, GITHUB_URL } from '../../utils/site';
import '../../styles/Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`footer ${theme}`} role="contentinfo">
      <div className="content-wrapper">
        <nav className="footer-nav" aria-label="Footer">
          <p className="copyright">
            &copy; {year} {AUTHOR_NAME} / 99 Studios. Nodes Plus.
          </p>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/architecture" className="footer-link">Architecture</Link></li>
            <li><Link to="/documentation" className="footer-link">Documentation</Link></li>
            <li><a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a></li>
            <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
            <li><a href={FAB_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Fab listing</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
