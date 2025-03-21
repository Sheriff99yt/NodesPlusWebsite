import React from 'react';
import { Node } from '../../data/nodes';
import '../../styles/RecentlyViewedNodes.css';

interface RecentlyViewedNodesProps {
  nodes: Node[];
  onSelectNode: (node: Node) => void;
}

const RecentlyViewedNodes: React.FC<RecentlyViewedNodesProps> = ({ nodes, onSelectNode }) => {
  if (nodes.length === 0) return null;

  return (
    <div className="recently-viewed-nodes">
      <h3 className="recently-viewed-title">Recently Viewed</h3>
      <ul className="recently-viewed-list">
        {nodes.map((node) => (
          <li 
            key={node.id}
            className="recently-viewed-item"
            onClick={() => onSelectNode(node)}
          >
            <div 
              className="node-category-indicator"
              style={{ backgroundColor: getCategoryColor(node.category) }}
            ></div>
            <div className="recently-viewed-info">
              <span className="recently-viewed-name">{node.name}</span>
              <span className="recently-viewed-category">{node.category}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to get color based on category
function getCategoryColor(category: string): string {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  switch (category.toLowerCase()) {
    case 'debug':
      return isDarkTheme ? '#F56565' : '#E53E3E'; // Red
    case 'math':
      return isDarkTheme ? '#4299E1' : '#3182CE'; // Blue
    case 'string':
      return isDarkTheme ? '#48BB78' : '#38A169'; // Green
    case 'utility':
      return isDarkTheme ? '#ECC94B' : '#D69E2E'; // Yellow
    case 'array':
      return isDarkTheme ? '#9F7AEA' : '#805AD5'; // Purple
    default:
      return isDarkTheme ? '#6E8EAF' : '#4A5568'; // Gray
  }
}

export default RecentlyViewedNodes; 