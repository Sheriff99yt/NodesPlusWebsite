import type { ReactNode } from 'react';
import { FaArrowRight, FaBook, FaCalculator, FaCode, FaFont, FaLightbulb, FaList, FaTools } from 'react-icons/fa';
import { getNodesByCategory, type NodeCategory } from '../../data/nodes';
import { useTheme } from '../../context/ThemeContext';
import { nodeCountLabel } from '../../utils/docsText';

const ICONS: Record<string, ReactNode> = {
  debug: <FaTools className="category-icon" />,
  math: <FaCalculator className="category-icon" />,
  string: <FaFont className="category-icon" />,
  utility: <FaLightbulb className="category-icon" />,
  array: <FaList className="category-icon" />,
};

type Props = {
  categories: NodeCategory[];
  onSelectCategory: (categoryId: string) => void;
};

const DocsLanding = ({ categories, onSelectCategory }: Props) => {
  const { theme } = useTheme();

  return (
    <div className={`docs-default-panel ${theme}`}>
      <header className="docs-landing-head">
        <h1>Documentation</h1>
        <p>Custom Blueprint nodes for Unreal Engine.</p>
      </header>

      <section className="docs-features-section" aria-label="Highlights">
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
                  <h3 title={category.name}>{category.name}</h3>
                  <span className="docs-category-node-count">{nodeCountLabel(count)}</span>
                </div>
                {category.description ? <p>{category.description}</p> : null}
                <span className="docs-view-category">
                  Open <FaArrowRight aria-hidden="true" />
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
