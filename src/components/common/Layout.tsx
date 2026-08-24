import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../../styles/Layout.css';

const Layout = () => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-shell-body">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
