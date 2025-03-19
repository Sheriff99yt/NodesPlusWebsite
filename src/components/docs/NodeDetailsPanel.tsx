import React, { useEffect, useMemo } from 'react';
import { Node, Pin } from '../../data/nodes';
import '../../styles/NodeDetailsPanel.css';
import { FaTimes, FaInfoCircle, FaTag, FaCubes, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import ReactFlow, { Background, Node as FlowNode, Edge, NodeTypes, ConnectionLineType, Controls } from 'reactflow';
import BlueprintNode from './BlueprintNode';
import { useTheme } from '../../context/ThemeContext';

interface NodeDetailsPanelProps {
  node: Node;
  highlightTerm?: string;
  onClose?: () => void;
}

// Helper function to highlight text matches
const highlightText = (text: string, searchTerm: string) => {
  if (!text || !searchTerm || searchTerm.length < 2) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};

const NodeDetailsPanel: React.FC<NodeDetailsPanelProps> = ({ node, highlightTerm = '', onClose }) => {
  // Prepare highlighted content if needed
  const nameHtml = highlightTerm && node.name ? { __html: highlightText(node.name, highlightTerm) } : undefined;
  const shortDescHtml = highlightTerm && node.shortDescription ? { __html: highlightText(node.shortDescription, highlightTerm) } : undefined;
  const longDescHtml = highlightTerm && node.longDescription ? { __html: highlightText(node.longDescription, highlightTerm) } : undefined;
  
  const { theme } = useTheme();
  
  // Create ReactFlow nodes for this node
  const reactFlowNodes = useMemo<FlowNode[]>(() => {
    return [
      {
        id: node.id,
        type: 'blueprintNode',
        position: { x: 100, y: 100 },
        data: {
          node,
          detailed: true,
        },
        draggable: true,
      }
    ];
  }, [node]);
  
  // Empty edges array
  const reactFlowEdges: Edge[] = [];
  
  // Define node types
  const nodeTypes = useMemo<NodeTypes>(() => ({
    blueprintNode: BlueprintNode,
  }), []);
  
  // Define fitView options
  const fitViewOptions = useMemo(() => ({ 
    padding: 0.2,
    maxZoom: 1.5,
    duration: 200
  }), []);
  
  return (
    <div className="node-details-panel">      
      <div className="node-details-header">
        <div className="node-title-container">
          <h2 className="node-title">
            {nameHtml ? <span dangerouslySetInnerHTML={nameHtml} /> : node.name}
          </h2>
          <div className="node-badges">
            <span className="node-category-badge" style={{ backgroundColor: getCategoryColor(node.category) }}>
              {node.category}
            </span>
            <span className={`node-complexity-badge ${node.complexity}`}>
              Complexity: {node.complexity}
            </span>
          </div>
        </div>
        {onClose && (
          <button className="back-button" onClick={onClose} aria-label="Back to list">
            <FaArrowLeft /> <span>Back</span>
          </button>
        )}
      </div>
      
      <div className="node-details-content">
        {/* Graph section to visualize the node */}
        <div className="node-graph-section">
          <h3>Node Visualization</h3>
          <div className="node-graph-container" style={{ height: '300px', background: theme === 'dark-theme' ? '#1A202C' : '#F7FAFC' }}>
            <ReactFlow
              nodes={reactFlowNodes}
              edges={reactFlowEdges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={fitViewOptions}
              attributionPosition="bottom-right"
              minZoom={0.5}
              maxZoom={2}
              zoomOnScroll={true}
              panOnScroll={false}
              panOnDrag={true}
              nodesDraggable={true}
              elementsSelectable={false}
            >
              <Background
                color={theme === 'dark-theme' ? '#2D3748' : '#E2E8F0'} 
                size={1.5}
                gap={16}
              />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </div>
        
        <div className="node-overview">
          <div className="node-description">
            <h3><FaInfoCircle /> Description</h3>
            <p className="short-description">
              {shortDescHtml ? <span dangerouslySetInnerHTML={shortDescHtml} /> : node.shortDescription}
            </p>
            {node.longDescription && (
              <p className="long-description">
                {longDescHtml ? <span dangerouslySetInnerHTML={longDescHtml} /> : node.longDescription}
              </p>
            )}
          </div>
          
          {node.searchKeywords && node.searchKeywords.length > 0 && (
            <div className="node-keywords">
              <h3><FaTag /> Keywords</h3>
              <div className="keyword-tags">
                {node.searchKeywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {node.performanceNotes && (
            <div className="node-performance">
              <h3><FaCubes /> Performance Considerations</h3>
              <p>{node.performanceNotes}</p>
            </div>
          )}
          
          {node.errorHandling && (
            <div className="node-error-handling">
              <h3><FaExclamationTriangle /> Error Handling</h3>
              <p>{node.errorHandling}</p>
            </div>
          )}
        </div>
        
        {(node.inputs?.length || node.outputs?.length) && (
          <div className="node-pins-wrapper">
            <h3>Pins</h3>
            <div className="node-pins-container">
              {node.inputs && node.inputs.length > 0 && (
                <div className="node-pins-section">
                  <h4>Inputs</h4>
                  <div className="pins-table-wrapper">
                    <table className="pins-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Description</th>
                          {node.inputs.some(input => input.defaultValue !== undefined) && (
                            <th>Default</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {node.inputs.map((input, index) => (
                          <tr key={index}>
                            <td className="pin-name">
                              {input.name}
                            </td>
                            <td className="pin-type">{input.type}</td>
                            <td className="pin-description">{input.description}</td>
                            {node.inputs?.some(input => input.defaultValue !== undefined) && (
                              <td className="pin-default">
                                {input.defaultValue !== undefined ? input.defaultValue : '-'}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {node.outputs && node.outputs.length > 0 && (
                <div className="node-pins-section">
                  <h4>Outputs</h4>
                  <div className="pins-table-wrapper">
                    <table className="pins-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {node.outputs.map((output, index) => (
                          <tr key={index}>
                            <td className="pin-name">
                              {output.name}
                            </td>
                            <td className="pin-type">{output.type}</td>
                            <td className="pin-description">{output.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {node.examples && node.examples.length > 0 && (
          <div className="node-examples-section">
            <h3>Examples</h3>
            <div className="node-examples">
              {node.examples.map((example, index) => (
                <div key={index} className="node-example">
                  <h4>{example.title}</h4>
                  <p>{example.description}</p>
                  {example.code && (
                    <pre className="code-example">
                      <code>{example.code}</code>
                    </pre>
                  )}
                  {example.image && (
                    <div className="example-image-container">
                      <img src={example.image} alt={`Example: ${example.title}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get color based on category
function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
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

// Helper function to get color based on pin type
function getPinTypeColor(type: string): string {
  if (type.includes('Exec')) {
    return '#E53E3E'; // Red for execution pins
  }
  
  switch (type.toLowerCase()) {
    case 'float':
    case 'double':
    case 'int':
    case 'integer':
    case 'number':
      return '#3182CE'; // Blue for numbers
    case 'string':
    case 'text':
      return '#38A169'; // Green for strings
    case 'bool':
    case 'boolean':
      return '#D69E2E'; // Yellow for booleans
    case 'array':
    case 'map':
    case 'set':
    case 'object':
      return '#805AD5'; // Purple for collections
    case 'vector':
    case 'vector2d':
    case 'vector3d':
    case 'vector4d':
      return '#ED64A6'; // Pink for vectors
    default:
      return '#4A5568'; // Gray for other types
  }
}

export default NodeDetailsPanel; 