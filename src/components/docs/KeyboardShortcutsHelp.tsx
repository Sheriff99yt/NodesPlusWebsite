import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../../styles/KeyboardShortcutsHelp.css';

interface KeyboardShortcutsHelpProps {
  onClose: () => void;
}

const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({ onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  
  return (
    <div className="keyboard-help-overlay">
      <div className="keyboard-help-modal">
        <div className="keyboard-help-header">
          <h2>Keyboard Shortcuts</h2>
          <button className="keyboard-help-close" onClick={onClose} aria-label="Close dialog">
            <FaTimes />
          </button>
        </div>
        
        <div className="keyboard-help-content">
          <div className="shortcut-group">
            <h3>Navigation</h3>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>Ctrl</kbd> + <kbd>H</kbd>
              </div>
              <div className="shortcut-description">Go to documentation home</div>
            </div>
          </div>
          
          <div className="shortcut-group">
            <h3>Search</h3>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>/</kbd>
              </div>
              <div className="shortcut-description">Focus search input</div>
            </div>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>Esc</kbd>
              </div>
              <div className="shortcut-description">Clear search</div>
            </div>
          </div>
          
          <div className="shortcut-group">
            <h3>Interface</h3>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>?</kbd>
              </div>
              <div className="shortcut-description">Toggle this help dialog</div>
            </div>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>Esc</kbd>
              </div>
              <div className="shortcut-description">Close dialogs</div>
            </div>
          </div>
          
          <div className="shortcut-group">
            <h3>Node Graph</h3>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>Scroll</kbd>
              </div>
              <div className="shortcut-description">Zoom in/out</div>
            </div>
            <div className="shortcut-item">
              <div className="shortcut-keys">
                <kbd>Click + Drag</kbd>
              </div>
              <div className="shortcut-description">Pan around the graph</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp; 