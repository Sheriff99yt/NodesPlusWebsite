import type { ReactNode } from 'react';
import { FaArrowRight, FaBook, FaCalculator, FaCode, FaCube, FaFont, FaLayerGroup, FaLightbulb, FaTools } from 'react-icons/fa';
import { getNodesByCategory, type NodeCategory } from '../../data/nodes';
import { useTheme } from '../../context/ThemeContext';
import { nodeCountLabel } from '../../utils/docsText';

const ICONS: Record<string, ReactNode> = {
  math: <FaCalculator className="category-icon" />,
  string: <FaFont className="category-icon" />,
  utility: <FaTools className="category-icon" />,
  data: <FaLayerGroup className="category-icon" />,
  logic: <FaCode className="category-icon" />,
  geometry: <FaCube className="category-icon" />,
};

type Props = {
  categories: NodeCategory[];
  onSelectCategory: (categoryId: string) => void;
};

const DocsLanding = ({ categories, onSelectCategory }: Props) => {
  const { theme } = useTheme();

  return (
    <div className={`docs-default-panel ${theme}`}>
      <section className="docs-hero-section">
        <div className="docs-hero-content">
          <h1>Nodes Plus Library</h1>
          <p>Custom nodes for Unreal Engine Blueprints.</p>
          <button type="button" className="docs-hero-button primary" onClick={() => onSelectCategory(categories[0]?.id)}>
            Explore nodes
          </button>
        </div>
      </section>

      <section className="docs-features-section">
        <h2>Why Nodes Plus</h2>
        <div className="docs-features-grid">
          <article className="docs-feature-card">
            <FaLightbulb className="docs-feature-icon" />
            <h3>Less spaghetti</h3>
            <p>Combine common operations into one node.</p>
          </article>
          <article className="docs-feature-card">
            <FaCode className="docs-feature-icon" />
            <h3>Readable graphs</h3>
            <p>Keep Blueprints small and named clearly.</p>
          </article>
          <article className="docs-feature-card">
            <FaTools className="docs-feature-icon" />
            <h3>Missing utilities</h3>
            <p>Fill gaps that stock Blueprint nodes skip.</p>
          </article>
        </div>
      </section>

      <section className="docs-categories-section">
        <h2>Categories</h2>
        <div className="docs-categories-grid">
          {categories.map((category) => {
            const count = getNodesByCategory(category.id).length;
            return (
              <button
                type="button"
                key={category.id}
                className="docs-category-card"
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="docs-category-header">
                  <div className="docs-category-icon-wrapper">
                    {ICONS[category.id] || <FaBook className="category-icon" />}
                  </div>
                  <span className="docs-category-node-count">{nodeCountLabel(count)}</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description || `${category.name} Blueprint nodes.`}</p>
                <span className="docs-view-category">
                  View <FaArrowRight aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DocsLanding;
