import { memo, useState, useCallback, useMemo, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Node } from '../../data/nodes';
import '../../styles/BlueprintNode.css';
import { useTheme } from '../../context/ThemeContext';

type BlueprintNodeProps = NodeProps<{
  node: Node;
  detailed?: boolean;
  highlightTerm?: string;
  minimal?: boolean;
}>;

// Helper function to throttle events
const throttle = (func: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func(...args);
    }
  };
};

// Helper function to highlight text matches
const highlightText = (text: string, searchTerm: string) => {
  if (!text || !searchTerm || searchTerm.length < 2) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};

// Memoized pin type color function 
const getPinTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'boolean':
      return '#FF5252'; // Red
    case 'integer':
    case 'float':
    case 'number':
    case 'vector':
    case 'vector2d':
    case 'vector4':
    case 'transform':
      return '#4FC3F7'; // Blue
    case 'string':
    case 'name':
    case 'text':
      return '#81C784'; // Green
    case 'exec':
      return '#D83B3B'; // Red-ish
    case 'object':
    case 'actor':
    case 'component':
      return '#CE93D8'; // Purple
    case 'struct':
      return '#FFB74D'; // Orange
    case 'enum':
      return '#FFF176'; // Yellow
    case 'array':
    case 'set':
    case 'map':
      return '#7986CB'; // Indigo
    default:
      return '#B0BEC5'; // Gray
  }
};

// Memoized category color function
const getCategoryColor = (category: string, theme: string): string => {
  const isDarkTheme = theme === 'dark-theme';
  
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
};

// Main component wrapped in memo for performance
const BlueprintNode = memo(({ data, isConnectable }: BlueprintNodeProps) => {
  const { node, detailed = false, highlightTerm = '', minimal = false } = data;
  const [hoveredPin, setHoveredPin] = useState<{ id: string, description: string } | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  // Process name text for highlighting if needed
  const nameHtml = useMemo(() => {
    if (highlightTerm && node.name) {
      return { __html: highlightText(node.name, highlightTerm) };
    }
    return undefined;
  }, [node.name, highlightTerm]);
  
  // Header style object - memoized to avoid recreating on each render
  const headerStyle = useMemo(() => ({ 
    backgroundColor: getCategoryColor(node.category, theme) 
  }), [node.category, theme]);
  
  // Throttled event handlers to reduce frequency of state updates
  const throttledPinMouseEnter = useCallback(
    throttle((id: string, description: string) => {
      setHoveredPin({ id, description });
    }, 50),
    []
  );

  const throttledPinMouseLeave = useCallback(
    throttle(() => {
      setHoveredPin(null);
    }, 50),
    []
  );
  
  // Memoize the exec pin style for reuse
  const execPinStyle = useMemo(() => ({ 
    background: '#ffffff',
    top: '14px',
    width: '12px',
    height: '12px',
    borderRadius: '2px'
  }), []);

  // Customize classes based on minimal mode
  const nodeClassName = useMemo(() => {
    return `blueprint-node ${detailed ? 'detailed' : ''} ${minimal ? 'minimal' : ''}`;
  }, [detailed, minimal]);

  return (
    <div className={nodeClassName} ref={nodeRef}>
      <div className="blueprint-node-header node-header" style={headerStyle}>
        {nameHtml ? (
          <span 
            className="blueprint-node-title" 
            dangerouslySetInnerHTML={nameHtml}
          />
        ) : (
          <span className="blueprint-node-title">{node.name}</span>
        )}
        
        <span className="blueprint-node-category">{node.category}</span>
      </div>
      
      <div className="blueprint-node-content">
        {detailed && (
          <div className="blueprint-node-pins">
            {/* Pins container for both inputs and outputs */}
            <div className="inline-pins-container">
              {/* Map both inputs and outputs to create inline pin rows */}
              {(node.inputs || []).map((input, inputIndex) => {
                // Find if there's a corresponding output pin at the same index
                const output = node.outputs && node.outputs[inputIndex];
                
                // Memoize pin styles - this prevents recreating objects on each render
                const inputPinStyle = useMemo(() => ({ 
                  background: input.isExec ? '#ffffff' : getPinTypeColor(input.type),
                  width: input.isExec ? '12px' : '8px',
                  height: input.isExec ? '12px' : '8px',
                  borderRadius: input.isExec ? '2px' : '50%' 
                }), [input.isExec, input.type]);
                
                const outputPinStyle = output ? useMemo(() => ({ 
                  background: output.isExec ? '#ffffff' : getPinTypeColor(output.type),
                  width: output.isExec ? '12px' : '8px',
                  height: output.isExec ? '12px' : '8px',
                  borderRadius: output.isExec ? '2px' : '50%'
                }), [output.isExec, output.type]) : null;
                
                return (
                  <div key={`pin-row-${inputIndex}`} className="inline-pins-row">
                    {/* Input pin */}
                    <div 
                      className="blueprint-node-pin input-pin"
                      onMouseEnter={() => throttledPinMouseEnter(`input-${inputIndex}`, input.description)}
                      onMouseLeave={throttledPinMouseLeave}
                    >
                      <Handle
                        type="target"
                        position={Position.Left}
                        id={`input-${inputIndex}`}
                        style={inputPinStyle}
                        isConnectable={isConnectable}
                        className={input.isExec ? 'exec' : ''}
                      />
                      <div className="blueprint-node-pin-label">
                        <span className="pin-name" title={input.name}>{input.name}</span>
                        <span className="pin-type" title={input.type}>{input.type}</span>
                      </div>
                    </div>
                    
                    {/* Output pin (if it exists at this index) */}
                    {output && (
                      <div 
                        className="blueprint-node-pin output-pin"
                        onMouseEnter={() => throttledPinMouseEnter(`output-${inputIndex}`, output.description)}
                        onMouseLeave={throttledPinMouseLeave}
                      >
                        <div className="blueprint-node-pin-label">
                          <span className="pin-name" title={output.name}>{output.name}</span>
                          <span className="pin-type" title={output.type}>{output.type}</span>
                        </div>
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={`output-${inputIndex}`}
                          style={outputPinStyle!}
                          isConnectable={isConnectable}
                          className={output.isExec ? 'exec' : ''}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* If there are more outputs than inputs, render the remaining outputs */}
              {node.outputs && node.inputs && node.outputs.length > node.inputs.length && 
                node.outputs.slice(node.inputs.length).map((output, index) => {
                  const actualIndex = index + node.inputs!.length;
                  
                  // Memoize output pin style
                  const extraOutputPinStyle = useMemo(() => ({ 
                    background: output.isExec ? '#ffffff' : getPinTypeColor(output.type),
                    width: output.isExec ? '12px' : '8px',
                    height: output.isExec ? '12px' : '8px',
                    borderRadius: output.isExec ? '2px' : '50%' 
                  }), [output.isExec, output.type]);
                  
                  return (
                    <div key={`extra-output-${index}`} className="inline-pins-row">
                      <div className="blueprint-node-pin empty-input"></div>
                      <div 
                        className="blueprint-node-pin output-pin"
                        onMouseEnter={() => throttledPinMouseEnter(`output-${actualIndex}`, output.description)}
                        onMouseLeave={throttledPinMouseLeave}
                      >
                        <div className="blueprint-node-pin-label">
                          <span className="pin-name" title={output.name}>{output.name}</span>
                          <span className="pin-type" title={output.type}>{output.type}</span>
                        </div>
                        <Handle
                          type="source"
                          position={Position.Right}
                          id={`output-${actualIndex}`}
                          style={extraOutputPinStyle}
                          isConnectable={isConnectable}
                          className={output.isExec ? 'exec' : ''}
                        />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}
      </div>
      
      {/* Pin tooltip - simplified positioning for better performance */}
      {hoveredPin && (
        <div 
          className="pin-tooltip" 
          style={{ 
            position: 'absolute',
            top: hoveredPin.id.includes('input') ? -30 : -30,
            left: hoveredPin.id.includes('input') ? 30 : 'auto',
            right: hoveredPin.id.includes('output') ? 30 : 'auto',
            opacity: 1
          }}
        >
          {hoveredPin.description}
        </div>
      )}
    </div>
  );
});

export default BlueprintNode; 