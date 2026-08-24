import { FaBars, FaCompressAlt, FaExpandAlt, FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { nodeCategories, type Node } from '../../data/nodes';
import { highlightText } from '../../utils/docsText';
import { DISCORD_URL, FAB_URL } from '../../utils/site';
import NodeCategoryList from './NodeCategoryList';

type Props = {
  theme: string;
  isMobile: boolean;
  sidebarOpen: boolean;
  searchTerm: string;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  selectedCategory?: string;
  selectedNode?: Node;
  filteredNodes: Node[];
  onSearch: (term: string) => void;
  onClearSearch: () => void;
  onSelectCategory: (id: string) => void;
  onSelectNode: (node: Node) => void;
  onToggleSidebar: () => void;
  onCloseSidebar: () => void;
};

const DocsSidebar = ({
  theme,
  isMobile,
  sidebarOpen,
  searchTerm,
  searchInputRef,
  selectedCategory,
  selectedNode,
  filteredNodes,
  onSearch,
  onClearSearch,
  onSelectCategory,
  onSelectNode,
  onToggleSidebar,
  onCloseSidebar,
}: Props) => {
  const searching = searchTerm.length >= 2;

  return (
    <>
      <aside
        id="docs-sidebar"
        className={`sidebar ${sidebarOpen ? 'mobile-visible' : ''} ${theme}`}
        aria-label="Documentation categories"
      >
        <div className="sidebar-inner">
          {isMobile ? (
            <nav className="docs-site-links" aria-label="Site">
              <Link to="/" onClick={onCloseSidebar}>
                Home
              </Link>
              <Link to="/architecture" onClick={onCloseSidebar}>
                Architecture
              </Link>
              <a href={FAB_URL} target="_blank" rel="noopener noreferrer" onClick={onCloseSidebar}>
                Fab
              </a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" onClick={onCloseSidebar}>
                Discord
              </a>
            </nav>
          ) : null}
          <div className="sidebar-controls">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search nodes"
                aria-label="Search nodes"
                value={searchTerm}
                onChange={(event) => onSearch(event.target.value)}
                className="search-input"
              />
              {searchTerm ? (
                <button type="button" className="clear-search" onClick={onClearSearch} aria-label="Clear search">
                  <FaTimes aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="docs-sidebar-bar">
              <div className="category-controls">
                <button
                  type="button"
                  className="control-button control-button-label"
                  onClick={() => window.dispatchEvent(new CustomEvent('expandAllCategories'))}
                  aria-label="Expand all categories"
                >
                  <FaExpandAlt aria-hidden="true" />
                  <span>Expand</span>
                </button>
                <button
                  type="button"
                  className="control-button control-button-label"
                  onClick={() => window.dispatchEvent(new CustomEvent('collapseAllCategories'))}
                  aria-label="Collapse all categories"
                >
                  <FaCompressAlt aria-hidden="true" />
                  <span>Collapse</span>
                </button>
              </div>
            </div>
          </div>

          {!searching ? (
            <NodeCategoryList
              categories={nodeCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              onNodeSelect={onSelectNode}
            />
          ) : filteredNodes.length > 0 ? (
            <div className="search-results">
              <h3>Results ({filteredNodes.length})</h3>
              <div className="search-results-list">
                {filteredNodes.map((node) => (
                  <button
                    type="button"
                    key={node.id}
                    className={`search-result-item ${selectedNode?.id === node.id ? 'selected' : ''}`}
                    onClick={() => onSelectNode(node)}
                  >
                    <div className="search-result-header">
                      <span
                        className="search-result-name"
                        dangerouslySetInnerHTML={{ __html: highlightText(node.name, searchTerm) }}
                      />
                      <span className="search-result-category">{node.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-results">
              <p>No nodes match "{searchTerm}".</p>
            </div>
          )}
        </div>
      </aside>

      {isMobile ? (
        <>
          <div
            className={`mobile-overlay ${sidebarOpen ? 'visible' : ''}`}
            onClick={onCloseSidebar}
            aria-hidden="true"
          />
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={onToggleSidebar}
            aria-expanded={sidebarOpen}
            aria-controls="docs-sidebar"
            aria-label={sidebarOpen ? 'Close documentation menu' : 'Open documentation menu'}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </>
      ) : null}
    </>
  );
};

export default DocsSidebar;
