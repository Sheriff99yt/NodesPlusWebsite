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

type PinLike = {
  name: string;
  type: string;
  description: string;
  isExec?: boolean;
};

const throttle = <T extends (...args: never[]) => void>(func: T, delay: number) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

const highlightText = (text: string, searchTerm: string) => {
  if (!text || !searchTerm || searchTerm.length < 2) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
};

const getPinTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'boolean':
      return '#FF5252';
    case 'integer':
    case 'float':
    case 'number':
    case 'vector':
    case 'vector2d':
    case 'vector4':
    case 'transform':
      return '#4FC3F7';
    case 'string':
    case 'name':
    case 'text':
      return '#81C784';
    case 'exec':
      return '#D83B3B';
    case 'object':
    case 'actor':
    case 'component':
      return '#CE93D8';
    case 'struct':
      return '#FFB74D';
    case 'enum':
      return '#FFF176';
    case 'array':
    case 'set':
    case 'map':
      return '#7986CB';
    default:
      return '#B0BEC5';
  }
};

const getCategoryColor = (category: string, theme: string): string => {
  const isDarkTheme = theme === 'dark-theme';
  
  switch (category.toLowerCase()) {
    case 'debug':
      return isDarkTheme ? '#F56565' : '#E53E3E';
    case 'math':
      return isDarkTheme ? '#4299E1' : '#3182CE';
    case 'string':
      return isDarkTheme ? '#48BB78' : '#38A169';
    case 'utility':
      return isDarkTheme ? '#ECC94B' : '#D69E2E';
    case 'array':
      return isDarkTheme ? '#9F7AEA' : '#805AD5';
    default:
      return isDarkTheme ? '#6E8EAF' : '#4A5568';
  }
};

const getPinStyle = (pin: PinLike) => ({
  background: pin.isExec ? '#ffffff' : getPinTypeColor(pin.type),
  width: pin.isExec ? '12px' : '8px',
  height: pin.isExec ? '12px' : '8px',
  borderRadius: pin.isExec ? '2px' : '50%'
});

const BlueprintNode = memo(({ data, isConnectable }: BlueprintNodeProps) => {
  const { node, detailed = false, highlightTerm = '', minimal = false } = data;
  const [hoveredPin, setHoveredPin] = useState<{ id: string, description: string } | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const nameHtml = useMemo(() => {
    if (highlightTerm && node.name) {
      return { __html: highlightText(node.name, highlightTerm) };
    }
    return undefined;
  }, [node.name, highlightTerm]);
  
  const headerStyle = useMemo(() => ({ 
    backgroundColor: getCategoryColor(node.category, theme) 
  }), [node.category, theme]);
  
  const throttledPinMouseEnter = useMemo(
    () =>
      throttle((id: string, description: string) => {
        setHoveredPin({ id, description });
      }, 50),
    []
  );

  const throttledPinMouseLeave = useMemo(
    () =>
      throttle(() => {
        setHoveredPin(null);
      }, 50),
    []
  );

  const handlePinEnter = useCallback(
    (id: string, description: string) => {
      throttledPinMouseEnter(id, description);
    },
    [throttledPinMouseEnter]
  );

  const handlePinLeave = useCallback(() => {
    throttledPinMouseLeave();
  }, [throttledPinMouseLeave]);

  const nodeClassName = useMemo(() => {
    return `blueprint-node ${detailed ? 'detailed' : ''} ${minimal ? 'minimal' : ''}`;
  }, [detailed, minimal]);

  return (
    <div className={nodeClassName} ref={nodeRef}>
      <div 
        className="blueprint-node-header node-header" 
        style={headerStyle}
        data-category={node.category.toLowerCase()}
      >
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
            <div className="inline-pins-container">
              {(node.inputs || []).map((input, inputIndex) => {
                const output = node.outputs && node.outputs[inputIndex];
                const inputPinStyle = getPinStyle(input);
                const outputPinStyle = output ? getPinStyle(output) : null;
                
                return (
                  <div key={`pin-row-${inputIndex}`} className="inline-pins-row">
                    <div 
                      className="blueprint-node-pin input-pin"
                      onMouseEnter={() => handlePinEnter(`input-${inputIndex}`, input.description)}
                      onMouseLeave={handlePinLeave}
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
                    
                    {output && (
                      <div 
                        className="blueprint-node-pin output-pin"
                        onMouseEnter={() => handlePinEnter(`output-${inputIndex}`, output.description)}
                        onMouseLeave={handlePinLeave}
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
              
              {node.outputs && node.inputs && node.outputs.length > node.inputs.length && 
                node.outputs.slice(node.inputs.length).map((output, index) => {
                  const actualIndex = index + node.inputs!.length;
                  const extraOutputPinStyle = getPinStyle(output);
                  
                  return (
                    <div key={`extra-output-${index}`} className="inline-pins-row">
                      <div className="blueprint-node-pin empty-input"></div>
                      <div 
                        className="blueprint-node-pin output-pin"
                        onMouseEnter={() => handlePinEnter(`output-${actualIndex}`, output.description)}
                        onMouseLeave={handlePinLeave}
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
      
      {hoveredPin && (
        <div 
          className="pin-tooltip" 
          style={{ 
            position: 'absolute',
            top: -30,
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
