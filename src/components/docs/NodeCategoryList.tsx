import React, { useState, useEffect } from 'react';
import { NodeCategory, Node, getNodesByCategory } from '../../data/nodes';
import { 
  FaChevronDown, 
  FaChevronRight, 
  FaExpandAlt,
  FaCompressAlt
} from 'react-icons/fa';
import '../../styles/NodeCategoryList.css';

interface NodeCategoryListProps {
  categories: NodeCategory[];
  selectedCategory?: string;
  onSelectCategory: (categoryId: string) => void;
  onNodeSelect?: (node: Node) => void;
}

const NodeCategoryList: React.FC<NodeCategoryListProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  onNodeSelect 
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);

  // Ensure selected category is expanded
  useEffect(() => {
    if (selectedCategory && !expandedCategories[selectedCategory]) {
      setExpandedCategories(prev => ({
        ...prev,
        [selectedCategory]: true
      }));
    }
  }, [selectedCategory]);

  // Handle resize events for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Expand all categories
  const expandAll = () => {
    const allCategories = categories.reduce((acc, category) => {
      acc[category.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setExpandedCategories(allCategories);
  };
  
  // Collapse all categories
  const collapseAll = () => {
    setExpandedCategories({});
  };

  // Add event listeners for the expandAllCategories and collapseAllCategories events
  useEffect(() => {
    const handleExpandAll = () => {
      expandAll();
    };
    
    const handleCollapseAll = () => {
      collapseAll();
    };
    
    window.addEventListener('expandAllCategories', handleExpandAll);
    window.addEventListener('collapseAllCategories', handleCollapseAll);
    
    return () => {
      window.removeEventListener('expandAllCategories', handleExpandAll);
      window.removeEventListener('collapseAllCategories', handleCollapseAll);
    };
  }, [categories]); // Re-add listeners if categories change

  return (
    <div className={`node-category-list ${isMobileView ? 'mobile-view' : ''}`}>
      <div className="category-list">
        {categories.map(category => {
          const isSelected = selectedCategory === category.id;
          const isExpanded = expandedCategories[category.id];
          const nodeCount = getNodesByCategory(category.id).length;
          
          return (
            <div 
              key={category.id} 
              className={`category-item ${isSelected ? 'selected' : ''}`}
            >
              <div 
                className="category-header"
                onClick={() => {
                  // Navigate to category page
                  onSelectCategory(category.id);
                  
                  // Also toggle expansion if not already expanded
                  if (!isExpanded) {
                    toggleCategory(category.id);
                  }
                }}
              >
                <div className="category-info">
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{nodeCount}</span>
                </div>
                
                <button 
                  className="expand-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category.id);
                  }}
                  aria-label={isExpanded ? 'Collapse category' : 'Expand category'}
                >
                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                </button>
              </div>
              
              {isExpanded && (
                <div className="category-nodes">
                  {getNodesByCategory(category.id).map(node => {
                    const isNodeSelected = selectedCategory === category.id && 
                      window.location.pathname.includes(node.id);
                    
                    return (
                      <div 
                        key={node.id}
                        className={`node-item ${isNodeSelected ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onNodeSelect) {
                            onNodeSelect(node);
                          }
                        }}
                      >
                        <div className="node-item-info">
                          <span className="node-name">{node.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Export expand/collapse functionality with the component
export { FaExpandAlt, FaCompressAlt };

export default NodeCategoryList; 