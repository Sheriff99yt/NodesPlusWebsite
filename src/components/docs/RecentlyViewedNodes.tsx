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
  switch (category) {
    case 'debug':
      return '#E53E3E'; // Red
    case 'math':
      return '#3182CE'; // Blue
    case 'string':
      return '#38A169'; // Green
    case 'utility':
      return '#D69E2E'; // Yellow
    case 'array':
      return '#805AD5'; // Purple
    default:
      return '#4A5568'; // Gray
  }
}

export default RecentlyViewedNodes; 