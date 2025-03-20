import React from 'react';
import { FaSearch, FaTimes, FaList, FaThLarge } from 'react-icons/fa';

interface SidebarControlsProps {
  searchTerm: string;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  handleSearch: (term: string) => void;
  clearSearch: () => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const SidebarControls: React.FC<SidebarControlsProps> = ({
  searchTerm,
  searchInputRef,
  handleSearch,
  clearSearch,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="sidebar-controls">
      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder=""
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
      
      <div className="view-mode-toggle">
        <button 
          className={`view-mode-button ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
          title="Grid View (Ctrl+G)"
        >
          <FaThLarge />
        </button>
        <button 
          className={`view-mode-button ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
          title="List View (Ctrl+L)"
        >
          <FaList />
        </button>
      </div>
    </div>
  );
};

export default SidebarControls; 