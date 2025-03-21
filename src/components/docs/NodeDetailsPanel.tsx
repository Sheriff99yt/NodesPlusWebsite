import React, { useEffect, useMemo } from 'react';
import { Node, Pin } from '../../data/nodes';
import '../../styles/NodeDetailsPanel.css';
import { FaTimes, FaInfoCircle, FaTag, FaCubes, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import ReactFlow, { 
  Background, 
  BackgroundVariant, 
  Node as FlowNode, 
  Edge, 
  NodeTypes, 
  ConnectionLineType, 
  Controls 
} from 'reactflow';
import 'reactflow/dist/style.css';
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
        {/* Top section with visualization and overview side by side */}
        <div className="node-top-section">
          {/* Graph section to visualize the node */}
          <div className="node-graph-section">
            <h3>Node Visualization</h3>
            <div className="node-graph-container">
              <ReactFlow
                nodes={reactFlowNodes}
                edges={reactFlowEdges}
                nodeTypes={nodeTypes}
                fitView={true}
                fitViewOptions={fitViewOptions}
                minZoom={0.5}
                maxZoom={1.5}
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                connectionLineType={ConnectionLineType.SmoothStep}
                panOnScroll={true}
                zoomOnScroll={true}
                panOnDrag={true}
                preventScrolling={false}
                attributionPosition="bottom-right"
                className="node-flow"
              >
                <Background 
                  variant={BackgroundVariant.Lines} 
                  gap={20} 
                  size={1}
                  color={theme === 'dark-theme' ? '#2D3748' : '#E2E8F0'} 
                />
                <Controls showInteractive={false} position="bottom-right" />
              </ReactFlow>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="node-overview">
            <div className="node-description">
              <h3><FaInfoCircle /> Overview</h3>
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
                <h3><FaCubes /> Performance</h3>
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
        </div>
        
        {/* Pins section */}
        {(node.inputs?.length || node.outputs?.length) && (
          <div className="node-pins-wrapper">
            <h3>Connection Points</h3>
            <div className="node-pins-container">
              {node.inputs && node.inputs.length > 0 && (
                <div className="node-pins-section">
                  <h4>Inputs</h4>
                  <div className="pins-list">
                    {node.inputs.map((input, index) => (
                      <div key={index} className="pin-item">
                        <div className="pin-header">
                          <span className="pin-name">{input.name}</span>
                          <span className="pin-type" style={{ backgroundColor: getPinTypeColor(input.type), color: 'white' }}>{input.type}</span>
                          {input.defaultValue !== undefined && (
                            <span className="pin-default">Default: {input.defaultValue}</span>
                          )}
                        </div>
                        <p className="pin-description">{input.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {node.outputs && node.outputs.length > 0 && (
                <div className="node-pins-section">
                  <h4>Outputs</h4>
                  <div className="pins-list">
                    {node.outputs.map((output, index) => (
                      <div key={index} className="pin-item">
                        <div className="pin-header">
                          <span className="pin-name">{output.name}</span>
                          <span className="pin-type" style={{ backgroundColor: getPinTypeColor(output.type), color: 'white' }}>{output.type}</span>
                        </div>
                        <p className="pin-description">{output.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Examples section */}
        {node.examples && node.examples.length > 0 && (
          <div className="node-examples-section">
            <h3>Usage Examples</h3>
            <div className="examples-list">
              {node.examples.map((example, index) => (
                <div key={index} className="example-item">
                  <div className="example-header">
                    <h4>{example.title}</h4>
                  </div>
                  <p className="example-description">{example.description}</p>
                  {example.code && (
                    <pre className="code-example">
                      <code>{example.code}</code>
                    </pre>
                  )}
                  {example.image && (
                    <div className="example-image">
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
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  switch (category.toLowerCase()) {
    case 'debug':
      return isDarkTheme ? '#F56565' : '#E53E3E'; // Red
    case 'math':
      return isDarkTheme ? '#4299E1' : '#3182CE'; // Blue
    case 'string':
      return isDarkTheme ? '#48BB78' : '#38A169'; // Green
    case 'utility':
      return isDarkTheme ? '#ECC94B' : '#D69E2E'; // Yellow
    case 'array':
      return isDarkTheme ? '#9F7AEA' : '#805AD5'; // Purple
    default:
      return isDarkTheme ? '#6E8EAF' : '#4A5568'; // Gray
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