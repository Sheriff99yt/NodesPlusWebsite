import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  Node as FlowNode,
  Edge,
  NodeTypes,
  ConnectionLineType
} from 'reactflow';
import 'reactflow/dist/style.css';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import BlueprintNode from '../components/docs/BlueprintNode';
import NodeCategoryList, { FaExpandAlt as ExpandIcon, FaCompressAlt as CollapseIcon } from '../components/docs/NodeCategoryList';
import NodeDetailsPanel from '../components/docs/NodeDetailsPanel';
import CategoryDetailsPanel from '../components/docs/CategoryDetailsPanel';
import { nodeCategories, nodes, getNodesByCategory, getNodeById, Node, NodeCategory, searchNodes } from '../data/nodes';
import useAnalytics from '../hooks/useAnalytics';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaTimes, FaExpandAlt, FaCompressAlt, FaArrowLeft, FaMoon, FaSun, FaCode, FaBook, FaLightbulb, FaCalculator, FaFont, FaTools, FaLayerGroup, FaCube } from 'react-icons/fa';

import '../styles/Documentation.css';

// Default Documentation Panel when no node is selected
const DefaultDocumentationPanel = ({ categories, onSelectCategory }: { categories: NodeCategory[], onSelectCategory: (categoryId: string) => void }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`default-documentation ${theme}`}>
      <div className="default-header">
        <h1>NodesPlus Blueprint Library</h1>
        <p>Custom nodes for enhancing Unreal Engine Blueprints</p>
      </div>
      
      <div className="documentation-guide">
        <h2>Documentation Guide</h2>
        <div className="guide-content">
          <p>This documentation provides information about custom Blueprint nodes available in the NodesPlus plugin for Unreal Engine.</p>
          
          <div className="navigation-steps">
            <div className="navigation-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Select a Category</h3>
                <p>Choose a category from the grid below to browse related nodes</p>
              </div>
            </div>
            
            <div className="navigation-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Explore Nodes</h3>
                <p>View all nodes within the selected category and their brief descriptions</p>
              </div>
            </div>
            
            <div className="navigation-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>View Details</h3>
                <p>Click on any node to see full documentation including inputs, outputs, and usage examples</p>
              </div>
            </div>
          </div>
          
          <p className="search-tip">You can also use the search bar at the left to quickly find specific nodes</p>
        </div>
      </div>
      
      <h2 className="categories-heading">Node Categories</h2>
      <div className="categories-minimal-grid">
        {categories.map(category => (
          <div 
            key={category.id}
            className="category-minimal-card"
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="category-minimal-header">
              <h3>{category.name}</h3>
              <span className="node-count">{getNodesByCategory(category.id).length}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Documentation = () => {
  const { categoryId, nodeId } = useParams();
  const navigate = useNavigate();
  const analytics = useAnalytics();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme();
  
  // Prevent handling of URL param changes during direct node selection
  const isDirectNodeSelection = useRef(false);
  
  // Application states
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(categoryId);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(nodeId ? getNodeById(nodeId) : undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(true);
  
  // Filtered nodes for sidebar
  const [filteredNodes, setFilteredNodes] = useState<Node[]>([]);
  
  // Memoize node types to prevent re-creation on each render
  const memoizedNodeTypes = useMemo<NodeTypes>(() => ({
    blueprintNode: BlueprintNode,
  }), []);

  // Memoize fit view options
  const fitViewOptions = useMemo(() => ({ 
    padding: 0.2,
    maxZoom: 1.5,
    duration: 200
  }), []);

  // Memoize edge options
  const defaultEdgeOptions = useMemo(() => ({
    type: 'default',
    style: { stroke: '#3182CE', strokeWidth: 2 },
  }), []);
  
  // Add a custom snap grid and performance optimizations
  const snapGrid: [number, number] = useMemo(() => [16, 16], []);

  // Optimize node drag handling
  const onNodeDragStart = useCallback(() => {
    // Add a class to the document body to disable pointer events on non-essential elements
    document.body.classList.add('node-dragging');
  }, []);

  const onNodeDrag = useCallback(() => {
    // Optional: could add throttled position updates here
  }, []);

  const onNodeDragStop = useCallback(() => {
    // Remove the class when dragging stops
    document.body.classList.remove('node-dragging');
  }, []);

  // Create nodes more efficiently
  const createFlowNodes = useCallback((nodes: Node[]): FlowNode[] => {
    if (!nodes.length) return [];
    
    return nodes.map((node, index) => ({
      id: node.id,
      type: 'blueprintNode',
      position: { 
        x: isMobileView ? 20 : (index % 3) * 350 + 50, 
        y: isMobileView ? index * 150 + 50 : Math.floor(index / 3) * 200 + 50 
      },
      data: {
        node: node,
        detailed: false,
        highlightTerm: searchTerm
      },
      draggable: true,
    }));
  }, [isMobileView, searchTerm]);

  // Update filtered nodes when search term changes
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 2) {
      // Filter nodes based on search term
      const searchResults = searchNodes(searchTerm);
      setFilteredNodes(searchResults);
    } else if (selectedCategory) {
      // Show nodes for selected category
      const categoryNodes = getNodesByCategory(selectedCategory);
      setFilteredNodes(categoryNodes);
    } else {
      // Clear filtered nodes
      setFilteredNodes([]);
    }
  }, [searchTerm, selectedCategory]);
  
  // Handle initial URL params
  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
      
      // Load nodes for this category
      const categoryNodes = getNodesByCategory(categoryId);
      setFilteredNodes(categoryNodes);
      
      // If nodeId is provided, select that node
      if (nodeId) {
        const node = getNodeById(nodeId);
        if (node) {
          setSelectedNode(node);
        }
      }
    }
  }, [categoryId, nodeId]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if elements like inputs have focus
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      // Handle specific keyboard shortcuts
      switch (e.key) {
        case '/':
          // Focus search on '/' key
          e.preventDefault();
          searchInputRef.current?.focus();
          break;
        case 'Escape':
          // Clear search on escape
          if (searchTerm) {
            clearSearch();
          } else if (selectedNode) {
            // If a node is selected, clear it to return to category view
            setSelectedNode(undefined);
            if (selectedCategory) {
              navigate(`/documentation/${selectedCategory}`);
            }
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchTerm, selectedNode, selectedCategory, navigate]);
  
  // Handle node selection
  const handleNodeSelect = useCallback((node: Node) => {
    // Flag to prevent URL effect from triggering a category reload
    isDirectNodeSelection.current = true;
    
    // Set the category immediately if it's different
    if (node.category !== selectedCategory) {
      setSelectedCategory(node.category);
    }
    
    // Set the selected node
    setSelectedNode(node);
    
    // In mobile view, switch to graph view when a node is selected
    if (isMobileView && showMobileSidebar) {
      setShowMobileSidebar(false);
    }
    
    // Update URL directly to avoid re-renders
    const url = `/documentation/${node.category}/${node.id}`;
    navigate(url, { replace: true });
    
    // Track analytics
    analytics.trackNodeView(node.id, node.name, node.category);
    
    // Reset the flag in the next tick after all state updates
    setTimeout(() => {
      isDirectNodeSelection.current = false;
    }, 0);
    
  }, [isMobileView, showMobileSidebar, selectedCategory, navigate, analytics]);
  
  // Handle search
  const handleSearch = useCallback((term: string) => {
    // Update search term state
    setSearchTerm(term);
    
    // Track analytics if search term is meaningful
    if (term.length >= 2) {
      analytics.trackSearch(term, searchNodes(term).length);
    }
  }, [analytics]);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    
    // Go back to category view if a category is selected
    if (selectedCategory) {
      const categoryNodes = getNodesByCategory(selectedCategory);
      setFilteredNodes(categoryNodes);
    } else {
      setFilteredNodes([]);
    }
  }, [selectedCategory]);
  
  // Handle category selection
  const handleCategorySelect = useCallback((category: string) => {
    // Update category state
    setSelectedCategory(category);
    
    // Load nodes for this category
    const categoryNodes = getNodesByCategory(category);
    setFilteredNodes(categoryNodes);
    
    // Clear selected node when selecting a category
    setSelectedNode(undefined);
    
    // Update URL
    navigate(`/documentation/${category}`);
    
    // In mobile view, switch to list view when selecting a category
    if (isMobileView && !showMobileSidebar) {
      setShowMobileSidebar(true);
    }
    
    // Track analytics
    analytics.trackFeatureUsage('select_category', {
      category_id: category,
      category_name: nodeCategories.find(cat => cat.id === category)?.name || category 
    });
  }, [navigate, isMobileView, showMobileSidebar, analytics]);
  
  // Handle details close
  const handleCloseDetails = useCallback(() => {
    setSelectedNode(undefined);
    if (selectedCategory) {
      navigate(`/documentation/${selectedCategory}`);
    } else {
      navigate('/documentation');
    }
  }, [selectedCategory, navigate]);
  
  // Get the currently selected category object
  const selectedCategoryObject = useMemo(() => {
    if (!selectedCategory) return null;
    return nodeCategories.find(category => category.id === selectedCategory) || null;
  }, [selectedCategory]);
  
  return (
    <div className={`documentation-page ${theme}`}>
      <Navbar />
      
      <div className={`documentation-container ${isMobileView ? 'mobile-view' : ''} ${theme}`}>
        <div className={`sidebar ${isMobileView && !showMobileSidebar ? 'mobile-hidden' : ''} ${theme}`}>
          <div className="sidebar-controls">
            <div className="search-container">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search nodes... (Press / to focus)"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button className="clear-search" onClick={clearSearch}>
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
            
            <div className="controls-row">
              <button 
                className="control-button theme-toggle-button"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark-theme' ? 'light' : 'dark'} theme (Ctrl+T)`}
              >
                {theme === 'dark-theme' ? <FaSun /> : <FaMoon />}
              </button>
              
              <div className="category-controls">
                <button 
                  className="control-button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('expandAllCategories'));
                  }}
                  title="Expand All Categories"
                >
                  <FaExpandAlt />
                </button>
                <button 
                  className="control-button"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('collapseAllCategories'));
                  }}
                  title="Collapse All Categories"
                >
                  <FaCompressAlt />
                </button>
              </div>
            </div>
          </div>
          
          {/* Show NodeCategoryList if not searching */}
          {!searchTerm && (
            <NodeCategoryList 
              categories={nodeCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              onNodeSelect={handleNodeSelect}
            />
          )}
          
          {/* Show filtered nodes list when searching */}
          {searchTerm && filteredNodes.length > 0 && (
            <div className="search-results">
              <h3>Search Results ({filteredNodes.length})</h3>
              <div className="node-list">
                {filteredNodes.map((node) => (
                  <div 
                    key={node.id} 
                    className={`node-list-item ${selectedNode?.id === node.id ? 'selected' : ''}`}
                    onClick={() => handleNodeSelect(node)}
                  >
                    <div className="node-list-item-name">
                      <span className="category-indicator"></span>
                      <span dangerouslySetInnerHTML={{ __html: highlightText(node.name, searchTerm) }}></span>
                    </div>
                    <div className="node-list-item-category">{node.category}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Show message when no search results */}
          {searchTerm && filteredNodes.length === 0 && (
            <div className="no-results">
              <p>No nodes found matching "{searchTerm}"</p>
              <p>Try a different search term or browse by category</p>
            </div>
          )}
        </div>
        
        <div className="main-content">
          {/* Mobile toggle button */}
          {isMobileView && (
            <button 
              className={`mobile-toggle ${theme}`}
              onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            >
              {showMobileSidebar ? <FaArrowLeft /> : <FaExpandAlt />}
            </button>
          )}
          
          {/* Show appropriate content based on selection state */}
          {selectedNode ? (
            /* Node detail view */
            <NodeDetailsPanel 
              node={selectedNode}
              highlightTerm={searchTerm}
              onClose={handleCloseDetails}
            />
          ) : selectedCategory && selectedCategoryObject ? (
            /* Category detail view */
            <CategoryDetailsPanel 
              category={selectedCategoryObject}
              nodes={filteredNodes}
              onSelectNode={handleNodeSelect}
              onBack={() => {
                setSelectedCategory(undefined);
                navigate('/documentation');
              }}
            />
          ) : (
            /* Default documentation view */
            <DefaultDocumentationPanel 
              categories={nodeCategories}
              onSelectCategory={handleCategorySelect}
            />
          )}
        </div>
      </div>
      
      <Footer className={theme} />
    </div>
  );
};

export default Documentation;

// Helper function to highlight text matches
function highlightText(text: string, searchTerm: string): string {
  if (!text || !searchTerm || searchTerm.length < 2) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}