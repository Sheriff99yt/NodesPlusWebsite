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
import { FaSearch, FaTimes, FaExpandAlt, FaCompressAlt, FaArrowLeft, FaMoon, FaSun, FaCode, FaBook, FaLightbulb, FaCalculator, FaFont, FaTools, FaLayerGroup, FaCube, FaBars, FaAdjust } from 'react-icons/fa';

import '../styles/Documentation.css';

// Default Documentation Panel when no node is selected
const DefaultDocumentationPanel = ({ categories, onSelectCategory }: { categories: NodeCategory[], onSelectCategory: (categoryId: string) => void }) => {
  const { theme } = useTheme();
  
  // Get count of all nodes
  const totalNodesCount = useMemo(() => {
    return nodes.length;
  }, []);
  
  // Function to get nodes by category
  const getNodesByCategory = useCallback((categoryId: string) => {
    return nodes.filter(node => node.category === categoryId);
  }, []);
  
  // Organize categories by type for better presentation
  const categoriesByType = useMemo(() => {
    const types = {
      core: [] as NodeCategory[],
      utility: [] as NodeCategory[],
      advanced: [] as NodeCategory[]
    };
    
    categories.forEach(category => {
      if (['Math', 'String', 'Array', 'Data'].includes(category.name)) {
        types.core.push(category);
      } else if (['Utility', 'Debug', 'Conversion', 'Flow Control'].includes(category.name)) {
        types.utility.push(category);
      } else {
        types.advanced.push(category);
      }
    });
    
    return types;
  }, [categories]);
  
  return (
    <div className={`default-documentation ${theme}`}>
      <div className="default-header">
        <h1>NodesPlus Blueprint Library</h1>
        <p>Streamlining your Unreal Engine workflow with {totalNodesCount} powerful custom nodes</p>
        
        <div className="header-actions">
          <button className="header-action-button" onClick={() => {
            const searchInput = document.querySelector('.sidebar-inner .search-input') as HTMLInputElement;
            if (searchInput) searchInput.focus();
          }}>
            <FaSearch /> Search Nodes
          </button>
          <button className="header-action-button" onClick={() => onSelectCategory(categories[0]?.id)}>
            <FaBook /> Browse Categories
          </button>
        </div>
      </div>
      
      <div className="documentation-sections">
        <div className="documentation-section">
          <div className="section-header">
            <FaLightbulb className="section-icon" />
            <h2>Getting Started</h2>
          </div>
          <div className="section-content">
            <p>The NodesPlus library extends Unreal Engine's Blueprint system with specialized nodes that help you build better games faster.</p>
            
            <div className="feature-cards">
              <div className="feature-card">
                <div className="feature-icon"><FaCode /></div>
                <h3>Simple Integration</h3>
                <p>Drag and drop nodes directly into your Blueprint graphs, no complex setup required.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaTools /></div>
                <h3>Optimized Performance</h3>
                <p>Built with efficiency in mind to ensure your games run smoothly.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon"><FaExpandAlt /></div>
                <h3>Full Documentation</h3>
                <p>Complete examples and details for every node in the library.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="documentation-section">
          <div className="section-header">
            <FaCube className="section-icon" />
            <h2>Core Categories</h2>
          </div>
          <div className="categories-grid">
            {categoriesByType.core.map(category => (
              <div 
                key={category.id}
                className="category-card"
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="category-card-header">
                  <h3>{category.name}</h3>
                </div>
                <p className="category-description">{category.description || `A collection of ${category.name.toLowerCase()} related Blueprint nodes.`}</p>
                <div className="category-footer">
                  <span className="node-count">{getNodesByCategory(category.id).length} nodes</span>
                  <span className="view-link">View Category →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="documentation-section">
          <div className="section-header">
            <FaLayerGroup className="section-icon" />
            <h2>All Categories</h2>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category.id}
                className="category-card"
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="category-card-header">
                  <h3>{category.name}</h3>
                </div>
                <p className="category-description">{category.description || `A collection of ${category.name.toLowerCase()} related Blueprint nodes.`}</p>
                <div className="category-footer">
                  <span className="node-count">{getNodesByCategory(category.id).length} nodes</span>
                  <span className="view-link">View Category →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  
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
          // When showing a specific node on mobile, keep sidebar closed
          if (isMobileView) {
            setShowMobileSidebar(false);
          }
        }
      } else if (isMobileView) {
        // When showing a category page on mobile, show the sidebar
        setShowMobileSidebar(true);
      }
    }
  }, [categoryId, nodeId, isMobileView]);

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
    
    // In mobile view, always show sidebar when selecting a category
    if (isMobileView) {
      setShowMobileSidebar(true);
    }
    
    // Track analytics
    analytics.trackFeatureUsage('select_category', {
      category_id: category,
      category_name: nodeCategories.find(cat => cat.id === category)?.name || category 
    });
  }, [navigate, isMobileView, analytics]);
  
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
    
    // In mobile view, always close sidebar when a node is selected
    if (isMobileView) {
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
    
  }, [isMobileView, selectedCategory, navigate, analytics]);
  
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
        <div className={`sidebar ${showMobileSidebar ? 'mobile-visible' : ''} ${theme}`}>
          <div className="sidebar-inner">
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
                <div className="search-results-list">
                  {filteredNodes.map((node) => (
                    <div 
                      key={node.id} 
                      className={`search-result-item ${selectedNode?.id === node.id ? 'selected' : ''}`}
                      onClick={() => handleNodeSelect(node)}
                    >
                      <div className="search-result-header">
                        <span 
                          className="search-result-name"
                          dangerouslySetInnerHTML={{ __html: highlightText(node.name, searchTerm) }}
                        ></span>
                        <span className="search-result-category">{node.category}</span>
                      </div>
                      {node.shortDescription && (
                        <p className="search-result-description">
                          {node.shortDescription.length > 100 
                            ? node.shortDescription.substring(0, 100) + '...' 
                            : node.shortDescription}
                        </p>
                      )}
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
        </div>
        
        {/* Add mobile sidebar overlay */}
        {isMobileView && showMobileSidebar && (
          <div 
            className="mobile-overlay visible"
            onClick={() => setShowMobileSidebar(false)}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Mobile sidebar toggle button */}
        {isMobileView && (
          <button 
            className="mobile-sidebar-toggle"
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            aria-label={showMobileSidebar ? "Close sidebar" : "Open sidebar"}
          >
            {showMobileSidebar ? <FaTimes /> : <FaBars />}
          </button>
        )}
        
        <div className="main-content">
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