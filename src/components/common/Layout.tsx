import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/Layout.css';

const Layout = () => {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <div className="app-shell-body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
