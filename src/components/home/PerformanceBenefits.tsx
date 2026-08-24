import { FaCode, FaLayerGroup, FaBookOpen } from 'react-icons/fa';
import '../../styles/PerformanceBenefits.css';

const points = [
  {
    icon: <FaCode aria-hidden="true" />,
    title: 'Fewer graph hops',
    body: 'Common math, string, and array work lives in one node instead of a chain of stock Blueprint nodes.',
  },
  {
    icon: <FaLayerGroup aria-hidden="true" />,
    title: 'Same names in editor and docs',
    body: 'Categories on this site match the plugin catalog, so you can look up a node before you open Unreal.',
  },
  {
    icon: <FaBookOpen aria-hidden="true" />,
    title: 'Learn outside the editor',
    body: 'Pins, descriptions, and examples are on the documentation pages. No claimed speed or memory numbers here.',
  },
];

const PerformanceBenefits = () => {
  return (
    <div className="metrics-overview">
      <p className="performance-subtitle prose">
        Nodes Plus is a dedicated Blueprint library. The goal is clearer graphs and documented nodes —
        not a benchmark contest.
      </p>
      <ul className="metrics-grid qualitative-grid">
        {points.map((point) => (
          <li className="metric-card" key={point.title}>
            <div className="metric-header">
              <div className="metric-icon">{point.icon}</div>
              <h3 className="metric-title">{point.title}</h3>
            </div>
            <p className="metric-description">{point.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceBenefits;
