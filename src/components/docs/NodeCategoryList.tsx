import React, { useEffect, useState } from 'react';
import { NodeCategory, Node, getNodesByCategory } from '../../data/nodes';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import '../../styles/NodeCategoryList.css';

interface NodeCategoryListProps {
  categories: NodeCategory[];
  selectedCategory?: string;
  selectedNodeId?: string;
  expandedCategories: Record<string, boolean>;
  onSelectCategory: (categoryId: string) => void;
  onNodeSelect?: (node: Node) => void;
  onToggleCategory: (categoryId: string) => void;
}

const NodeCategoryList: React.FC<NodeCategoryListProps> = ({
  categories,
  selectedCategory,
  selectedNodeId,
  expandedCategories,
  onSelectCategory,
  onNodeSelect,
  onToggleCategory,
}) => {
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`node-category-list ${isMobileView ? 'mobile-view' : ''}`}>
      <div className="category-list">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const isExpanded = Boolean(expandedCategories[category.id]);
          const nodeCount = getNodesByCategory(category.id).length;

          return (
            <div key={category.id} className={`category-item ${isSelected ? 'selected' : ''}`}>
              <div
                className="category-header"
                onClick={() => {
                  onToggleCategory(category.id);
                }}
              >
                <div
                  className="category-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(category.id);
                  }}
                >
                  <span className="category-name" title={category.name}>
                    {category.name}
                  </span>
                  <span className="category-count">{nodeCount}</span>
                </div>

                <button
                  className="expand-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleCategory(category.id);
                  }}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? `Collapse ${category.name}` : `Expand ${category.name}`}
                >
                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                </button>
              </div>

              {isExpanded ? (
                <div className="category-nodes">
                  {getNodesByCategory(category.id).map((node) => {
                    const isNodeSelected = selectedNodeId === node.id;

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
                          <span className="node-name" title={node.name}>
                            {node.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NodeCategoryList;
