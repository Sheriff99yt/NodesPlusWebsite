import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { nodeCategories } from '../data/nodes';
import PageSeo from '../components/common/PageSeo';
import StructuredData from '../components/common/StructuredData';
import '../styles/Architecture.css';

const layers = [
  {
    title: 'Unreal Editor',
    body: 'Blueprint graphs, pins, and compile. This is where designers actually use the library.',
  },
  {
    title: 'Nodes Plus plugin',
    body: 'A Blueprint function library: math, string, utility, and collection nodes that drop into any graph.',
  },
  {
    title: 'Docs site',
    body: 'This Vite + React app. Search, categories, and node pages so you can learn a node before you open the editor.',
  },
  {
    title: 'Distribution',
    body: 'Fab listing for the plugin, GitHub for this site, Discord for questions and examples.',
  },
];

const Architecture = () => {
  const { theme } = useTheme();
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Architecture', path: '/architecture' },
  ];

  return (
    <div className={`architecture-page ${theme}`}>
      <PageSeo
        title="Architecture"
        description="How the Nodes Plus Unreal Engine plugin, documentation site, and Fab listing fit together."
        path="/architecture"
      />
      <StructuredData
        pageType="architecture"
        path="/architecture"
        title="How Nodes Plus is put together"
        breadcrumbs={crumbs}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li aria-current="page">Architecture</li>
        </ol>
      </nav>

      <section className="arch-hero">
        <p className="arch-kicker">System architecture</p>
        <h1>How Nodes Plus is put together</h1>
        <p className="arch-lead prose">
          Plugin in the editor. Docs in the browser. Same library, two surfaces.
        </p>
      </section>

      <section className="arch-stack" aria-label="System layers">
        {layers.map((layer, i) => (
          <article key={layer.title} className="arch-card">
            <span className="arch-index">{String(i + 1).padStart(2, '0')}</span>
            <h2>{layer.title}</h2>
            <p>{layer.body}</p>
          </article>
        ))}
      </section>

      <section className="arch-flow">
        <h2>How a node reaches you</h2>
        <ol className="arch-steps">
          <li>C++ / Blueprint library compiles inside the Unreal plugin.</li>
          <li>Each node is catalogued with pins, category, and examples.</li>
          <li>This site reads that catalog and documents the same names.</li>
          <li>You get the plugin on Fab and use those node names in the editor.</li>
        </ol>
      </section>

      <section className="arch-cats">
        <h2>Library map</h2>
        <div className="arch-grid">
          {nodeCategories.map((cat) => (
            <Link key={cat.id} to={`/documentation/${cat.id}`} className="arch-cat">
              <strong>{cat.name}</strong>
              <span>{cat.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Architecture;
