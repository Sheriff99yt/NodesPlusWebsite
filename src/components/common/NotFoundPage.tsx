import { Link } from 'react-router-dom';
import PageSeo from './PageSeo';
import StructuredData from './StructuredData';
import '../../styles/NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-container">
      <PageSeo
        title="Page not found"
        description="This page does not exist on the Nodes Plus site. Return to Home, Documentation, or Architecture."
        path="/404"
        noIndex
      />
      <StructuredData pageType="notfound" path="/" breadcrumbs={[{ name: 'Home', path: '/' }]} />
      <div className="not-found-content">
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-message">
          That URL is not part of the Nodes Plus docs site. Use the links below to get back on track.
        </p>
        <nav className="not-found-links" aria-label="Helpful pages">
          <Link to="/" className="not-found-button">
            Nodes Plus home
          </Link>
          <Link to="/documentation" className="not-found-button secondary">
            Browse documentation
          </Link>
          <Link to="/architecture" className="not-found-button secondary">
            How the plugin is structured
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default NotFoundPage;
