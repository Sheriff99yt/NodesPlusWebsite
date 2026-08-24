import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Architecture.css';

const layers = [
  {
    title: 'Unreal Editor',
    body: 'Blueprint graphs, pins, and compile. This is where designers actually use the library.',
  },
  {
    title: 'Nodes Plus plugin',
    body: 'A Blueprint function library: math, string, utility, data, logic, and geometry nodes that drop into any graph.',
  },
  {
    title: 'Docs site',
    body: 'This Vite + React app. Search, categories, and a live graph preview so you can learn a node before you open the editor.',
  },
  {
    title: 'Distribution',
    body: 'Fab listing for the plugin, GitHub for this site, Discord for questions and examples.',
  },
];

const categories = [
  { id: 'math', name: 'Math', note: 'Scalar, vector, and range helpers' },
  { id: 'string', name: 'String', note: 'Format, split, and compare' },
  { id: 'utility', name: 'Utility', note: 'Everyday Blueprint shortcuts' },
  { id: 'data', name: 'Data', note: 'Containers and lookups' },
  { id: 'logic', name: 'Logic', note: 'Branching and flow helpers' },
  { id: 'geometry', name: 'Geometry', note: 'Transforms and spatial ops' },
];

const Architecture = () => {
  const { theme } = useTheme();

  return (
    <main className={`architecture-page ${theme}`}>
      <section className="arch-hero">
        <p className="arch-kicker">System architecture</p>
        <h1>How Nodes Plus is put together</h1>
        <p className="arch-lead">
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
          <li>This site reads that catalog and draws an interactive graph.</li>
          <li>You grab the plugin on Fab and use the same node names in editor.</li>
        </ol>
      </section>

      <section className="arch-cats">
        <h2>Library map</h2>
        <div className="arch-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/documentation/${cat.id}`}
              className="arch-cat"
            >
              <strong>{cat.name}</strong>
              <span>{cat.note}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Architecture;
