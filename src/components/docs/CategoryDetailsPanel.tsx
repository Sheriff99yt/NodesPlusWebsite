import React, { useMemo } from 'react';
import { Node, getNodesByCategory, NodeCategory } from '../../data/nodes';
import { useTheme } from '../../context/ThemeContext';
import { FaArrowLeft, FaLayerGroup } from 'react-icons/fa';
import '../../styles/CategoryDetailsPanel.css';

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
  onBack 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="category-details-panel">
      <div className="category-details-banner">
        <div className="category-details-banner-content">
          <div className="category-title-container">
            <h2 className="category-title">{category.name}</h2>
            <div className="category-meta">
              <span className="category-count">{nodes.length} nodes</span>
            </div>
          </div>
        </div>
        
        {onBack && (
          <button className="back-button" onClick={onBack} aria-label="Back to documentation">
            <FaArrowLeft /> <span>Back</span>
          </button>
        )}
      </div>
      
      {category.description && (
        <div className="category-description">
          <p>{category.description}</p>
        </div>
      )}
      
      <div className="category-nodes-grid">
        {nodes.map(node => (
          <div 
            key={node.id} 
            className="node-preview-card"
            onClick={() => onSelectNode(node)}
          >
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
              {node.category && (
                <span className="node-category-badge">
                  {node.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {nodes.length === 0 && (
        <div className="empty-category">
          <FaLayerGroup size={40} />
          <h3>No nodes available</h3>
          <p>This category doesn't have any nodes yet.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetailsPanel; 