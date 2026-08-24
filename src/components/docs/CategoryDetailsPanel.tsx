import React from 'react';
import { Node, NodeCategory } from '../../data/nodes';
import { FaArrowLeft, FaLayerGroup } from 'react-icons/fa';
import '../../styles/CategoryDetailsPanel.css';
import '../../styles/docs-ux.css';

interface CategoryDetailsPanelProps {
  category: NodeCategory;
  nodes: Node[];
  onSelectNode: (node: Node) => void;
  onBack?: () => void;
}

const CategoryDetailsPanel: React.FC<CategoryDetailsPanelProps> = ({
  category,
  nodes,
  onSelectNode,
  onBack,
}) => {
  return (
    <div className="category-details-panel">
      <div className="category-details-banner">
        <div className="category-title-container">
          <h2 className="category-title">{category.name}</h2>
          <div className="category-meta">
            <span className="category-count">{nodes.length === 1 ? '1 node' : `${nodes.length} nodes`}</span>
          </div>
        </div>

        {onBack ? (
          <button type="button" className="back-button" onClick={onBack} aria-label="Back to documentation">
            <FaArrowLeft /> <span>Back</span>
          </button>
        ) : null}
      </div>

      {category.description ? (
        <div className="category-description">
          <p>{category.description}</p>
        </div>
      ) : null}

      <div className="category-nodes-grid">
        {nodes.map((node) => (
          <button type="button" key={node.id} className="node-preview-card" onClick={() => onSelectNode(node)}>
            <div className="node-preview-header">
              <h3>{node.name}</h3>
            </div>

            <div className="node-preview-description">
              <p>{node.shortDescription}</p>
            </div>

            <div className="node-preview-footer">
              <span className="node-complexity" data-complexity={node.complexity}>
                {node.complexity}
              </span>
              {node.category ? <span className="node-category-badge">{node.category}</span> : null}
            </div>
          </button>
        ))}
      </div>

      {nodes.length === 0 ? (
        <div className="empty-category">
          <FaLayerGroup size={32} />
          <h3>No nodes available</h3>
          <p>This category doesn't have any nodes yet.</p>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryDetailsPanel;
