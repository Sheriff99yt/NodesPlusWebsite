import { useEffect, useState, useCallback, useRef, useMemo, type ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageSeo from '../components/common/PageSeo';
import StructuredData from '../components/common/StructuredData';

import NodeCategoryList from '../components/docs/NodeCategoryList';
import NodeDetailsPanel from '../components/docs/NodeDetailsPanel';
import CategoryDetailsPanel from '../components/docs/CategoryDetailsPanel';
import { nodeCategories, getNodesByCategory, getNodeById, Node, NodeCategory, searchNodes } from '../data/nodes';
import useAnalytics from '../hooks/useAnalytics';
import { useTheme } from '../context/ThemeContext';
import { FaSearch, FaTimes, FaExpandAlt, FaCompressAlt, FaCode, FaBook, FaLightbulb, FaCalculator, FaFont, FaTools, FaLayerGroup, FaCube, FaBars, FaArrowRight } from 'react-icons/fa';

import '../styles/Documentation.css';
import '../styles/docs-ux.css';

// Default Documentation Panel when no node is selected
const DefaultDocumentationPanel = ({ categories, onSelectCategory }: { categories: NodeCategory[], onSelectCategory: (categoryId: string) => void }) => {
  const { theme } = useTheme();
  
  // Map icons to categories
  const getCategoryIcon = (categoryId: string) => {
    const iconMap: {[key: string]: ReactNode} = {
      'math': <FaCalculator className="category-icon" />,
      'string': <FaFont className="category-icon" />,
      'utility': <FaTools className="category-icon" />,
      'data': <FaLayerGroup className="category-icon" />,
      'logic': <FaCode className="category-icon" />,
      'geometry': <FaCube className="category-icon" />,
    };
    
    return iconMap[categoryId] || <FaBook className="category-icon" />;
  };
  
  return (
    <div className={`docs-default-panel ${theme}`}>
      <div className="docs-hero-section">
        <div className="docs-hero-content">
          <h1>Nodes Plus Library</h1>
          <p>Custom nodes for enhancing your Unreal Engine Blueprints workflow</p>
          <div className="docs-hero-actions">
            <button className="docs-hero-button primary" onClick={() => onSelectCategory(categories[0]?.id)}>
              Explore Nodes
            </button>
          </div>
        </div>
      </div>
      
      <div className="docs-content-wrapper">
        <div className="docs-features-section">
          <h2>Why NodesPlus?</h2>
          <div className="docs-features-grid">
            <div className="docs-feature-card">
              <div className="docs-feature-icon">
                <FaLightbulb />
              </div>
              <h3>Enhanced Productivity</h3>
              <p>Reduce blueprint spaghetti with specialized nodes that combine common operations</p>
            </div>
            <div className="docs-feature-card">
              <div className="docs-feature-icon">
                <FaCode />
              </div>
              <h3>Clean Architecture</h3>
              <p>Create more readable, maintainable blueprints with optimized node functions</p>
            </div>
            <div className="docs-feature-card">
              <div className="docs-feature-icon">
                <FaTools />
              </div>
              <h3>Specialized Utilities</h3>
              <p>Access powerful functionality not available in standard Unreal Engine blueprints</p>
            </div>
          </div>
        </div>
        
        <div className="docs-categories-section">
          <h2>Browse Node Categories</h2>
          <div className="docs-categories-grid">
            {categories.map(category => (
              <button
                type="button"
                key={category.id}
                className="docs-category-card"
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="docs-category-header">
                  <div className="docs-category-icon-wrapper">
                    {getCategoryIcon(category.id)}
                  </div>
                  <span className="docs-category-node-count">{getNodesByCategory(category.id).length === 1 ? "1 node" : `${getNodesByCategory(category.id).length} nodes`}</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.description || `A collection of ${category.name.toLowerCase()} blueprint nodes`}</p>
                <div className="docs-category-card-footer">
                  <span className="docs-view-category">View Category <span className="arrow" aria-hidden="true"><FaArrowRight /></span></span>
                </div>
              </button>
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
  const { theme } = useTheme();

  const isDirectNodeSelection = useRef(false);
  
  // Application states
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(categoryId);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(nodeId ? getNodeById(nodeId) : undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState<boolean>(window.innerWidth < 768);
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  
  // Filtered nodes for sidebar
  const [filteredNodes, setFilteredNodes] = useState<Node[]>([]);
  
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
      }
    }
  }, [categoryId, nodeId, isMobileView]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
      
      // Auto-close sidebar on small screens when resizing from large to small
      if (width < 768 && showMobileSidebar) {
        setShowMobileSidebar(false);
        document.body.classList.remove('sidebar-open');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showMobileSidebar]);
  
  // Track scroll position for mobile UI adjustments
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          if (showMobileSidebar) {
            setShowMobileSidebar(false);
            document.body.classList.remove('sidebar-open');
            return;
          }
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
  }, [searchTerm, selectedNode, selectedCategory, navigate, clearSearch, showMobileSidebar]);
  
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
    
    // Track analytics
    analytics.trackFeatureUsage('select_category', {
      category_id: category,
      category_name: nodeCategories.find(cat => cat.id === category)?.name || category 
    });
  }, [navigate, analytics]);
  
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
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = useCallback(() => {
    setShowMobileSidebar(prev => !prev);
    // Add/remove body class to prevent scrolling when sidebar is open
    if (!showMobileSidebar) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [showMobileSidebar]);
  
  // Close mobile sidebar when clicking outside
  const handleOverlayClick = useCallback(() => {
    setShowMobileSidebar(false);
    document.body.classList.remove('sidebar-open');
  }, []);
  

  const pageTitle = selectedNode
    ? `${selectedNode.name} — Nodes Plus Docs`
    : selectedCategoryObject
      ? `${selectedCategoryObject.name} — Nodes Plus Docs`
      : 'Documentation — Nodes Plus Docs';
  const pageDescription = selectedNode
    ? (selectedNode.shortDescription || selectedNode.longDescription || `Documentation for the ${selectedNode.name} Blueprint node.`)
    : selectedCategoryObject
      ? (selectedCategoryObject.description || `Nodes Plus ${selectedCategoryObject.name} category.`)
      : 'Browse Nodes Plus Blueprint nodes by category. Documentation for the Unreal Engine plugin by Sherif Hany.';
  const pagePath = selectedNode
    ? `/documentation/${selectedNode.category}/${selectedNode.id}`
    : selectedCategory
      ? `/documentation/${selectedCategory}`
      : '/documentation';
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/documentation' },
  ];
  if (selectedCategoryObject) {
    crumbs.push({ name: selectedCategoryObject.name, path: `/documentation/${selectedCategoryObject.id}` });
  }
  if (selectedNode) {
    crumbs.push({ name: selectedNode.name, path: pagePath });
  }

  return (
    <div className={`documentation-page ${theme}`}>
      <PageSeo title={pageTitle} description={pageDescription} path={pagePath} type="article" />
      <StructuredData
        pageType="documentation"
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        breadcrumbs={crumbs}
      />


      
      <div className={`documentation-container ${isMobileView ? 'mobile-view' : ''} ${showMobileSidebar ? 'sidebar-visible' : ''} ${theme}`}>
        <aside id="docs-sidebar" className={`sidebar ${showMobileSidebar ? 'mobile-visible' : ''} ${theme}`} aria-label="Documentation categories">
          <div className="sidebar-inner">
            <div className="sidebar-controls">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search nodes"
                    aria-label="Search nodes"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button type="button" className="clear-search" onClick={clearSearch} aria-label="Clear search">
                      <FaTimes aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="docs-sidebar-bar">
                <p className="docs-sidebar-title">Library</p>
                <div className="category-controls">
                  <button 
                    type="button"
                    className="control-button control-button-label"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('expandAllCategories'));
                    }}
                    title="Expand all categories"
                    aria-label="Expand all categories"
                  >
                    <FaExpandAlt aria-hidden="true" />
                    <span>Expand</span>
                  </button>
                  <button 
                    type="button"
                    className="control-button control-button-label"
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('collapseAllCategories'));
                    }}
                    title="Collapse all categories"
                    aria-label="Collapse all categories"
                  >
                    <FaCompressAlt aria-hidden="true" />
                    <span>Collapse</span>
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
                    <button
                      type="button"
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
                    </button>
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
        </aside>
        
        {/* Mobile overlay */}
        {isMobileView && (
          <div 
            className={`mobile-overlay ${showMobileSidebar ? 'visible' : ''}`}
            onClick={handleOverlayClick}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Mobile menu toggle button */}
        {isMobileView && (
          <button 
            type="button"
            className={`mobile-menu-toggle ${scrollY > 100 ? 'scrolled' : ''}`}
            onClick={toggleMobileSidebar}
            aria-expanded={showMobileSidebar}
            aria-controls="docs-sidebar"
            aria-label={showMobileSidebar ? "Close documentation menu" : "Open documentation menu"}
          >
            {showMobileSidebar ? <FaTimes /> : <FaBars />}
          </button>
        )}
        
        <div className="docs-main-content" role="main">
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

