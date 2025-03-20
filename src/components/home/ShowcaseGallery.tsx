import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  Node as FlowNode,
  Edge,
  ConnectionLineType,
  ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../../styles/ShowcaseGallery.css';
import BlueprintNode from '../docs/BlueprintNode';
import { nodes as allNodes } from '../../data/nodes';
import { useTheme } from '../../context/ThemeContext';

const ShowcaseGallery: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();
  
  // Get the fuzzy search node from all nodes
  const fuzzySearchNode = useMemo(() => {
    return allNodes.find(node => node.id === 'string-fuzzy-search');
  }, []);
  
  // Define UE standard nodes that would be needed for a fuzzy search function
  const standardFuzzySearchNodes = [
    {
      name: "For Each Loop",
      description: "Iterates through all strings in array",
      icon: "☍"
    },
    {
      name: "String Contains",
      description: "Checks if string contains substring",
      icon: "Aa"
    },
    {
      name: "To Lower Case",
      description: "Convert string to lowercase",
      icon: "Aa"
    },
    {
      name: "Get String Length",
      description: "Calculate string length",
      icon: "№"
    },
    {
      name: "Split String",
      description: "Split string into array",
      icon: "⊟"
    },
    {
      name: "Branch",
      description: "Conditional execution",
      icon: "⑂"
    },
    {
      name: "Get Element",
      description: "Get array element by index",
      icon: "[]"
    },
    {
      name: "Append Array",
      description: "Add element to results array",
      icon: "+"
    },
    {
      name: "String Distance",
      description: "Calculate Levenshtein distance",
      icon: "≈"
    },
    {
      name: "Float to String",
      description: "Convert similarity score to string",
      icon: "↹"
    },
    {
      name: "Sort Array by Property",
      description: "Sort results by similarity score",
      icon: "⇅"
    },
    {
      name: "MakeArray",
      description: "Create new results array",
      icon: "[]"
    }
  ];

  // Initialize simple flow with the fuzzy search node
  const initialSimpleNodes: FlowNode[] = useMemo(() => {
    if (!fuzzySearchNode) return [];
    
    return [
      {
        id: 'fuzzySearch',
        type: 'blueprintNode',
        position: { x: 200, y: 120 },
        data: { 
          node: fuzzySearchNode,
          detailed: true
        },
      }
    ];
  }, [fuzzySearchNode]);

  // Set up state for flows
  const [simpleNodes, setSimpleNodes, onSimpleNodesChange] = useNodesState(initialSimpleNodes);
  const [simpleFlowInstance, setSimpleFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Node types definition for ReactFlow
  const nodeTypes = useMemo(() => ({
    blueprintNode: BlueprintNode,
  }), []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Initialize simple flow
  const onSimpleInit = useCallback((instance: ReactFlowInstance) => {
    setSimpleFlowInstance(instance);
    setTimeout(() => {
      instance.fitView({ padding: 0.2 });
    }, 100);
  }, []);

  // Handle window resize
  useEffect(() => {
    if (!isLoading) {
      const handleResize = () => {
        if (simpleFlowInstance) {
          simpleFlowInstance.fitView({ padding: 0.2 });
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isLoading, simpleFlowInstance]);

  // Get background color based on current theme
  const backgroundNodeColor = theme === 'dark-theme' ? '#4C6ED3' : '#E54C4C';

  return (
    <>
      <p className="showcase-subtitle">
        NodesPlus simplifies complex blueprint operations with single nodes that replace multiple standard nodes.
      </p>
      
      <div className="showcase-comparison">
        <div className="showcase-column">
          <div className="showcase-header">
            <h3>Standard Blueprint</h3>
            <span className="node-count">12+ Nodes</span>
          </div>
          
          <div className="standard-node-tiles-container">
            {isLoading ? (
              <div className="demo-skeleton">
                <div className="skeleton-flow">
                  <div className="skeleton-node" style={{ left: '10%', top: '40%' }}></div>
                  <div className="skeleton-node" style={{ right: '10%', top: '15%' }}></div>
                  <div className="skeleton-node" style={{ right: '10%', top: '65%' }}></div>
                </div>
              </div>
            ) : (
              <div className="blueprint-standard-nodes-grid">
                {standardFuzzySearchNodes.map((node, index) => (
                  <div key={index} className="blueprint-standard-node">
                    <div className="standard-node-icon">{node.icon}</div>
                    <div className="standard-node-content">
                      <div className="standard-node-title">{node.name}</div>
                      <div className="standard-node-description">{node.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="showcase-divider">
          <div className="vs-badge">VS</div>
        </div>
        
        <div className="showcase-column">
          <div className="showcase-header">
            <h3>NodesPlus</h3>
            <span className="node-count highlight">1 Node</span>
          </div>
          
          <div className="node-visualization-container">
            {isLoading ? (
              <div className="demo-skeleton">
                <div className="skeleton-flow">
                  <div className="skeleton-node" style={{ left: '35%', top: '35%', width: '180px', height: '100px' }}></div>
                </div>
              </div>
            ) : (
              <ReactFlow
                nodes={simpleNodes}
                edges={[]}
                onNodesChange={onSimpleNodesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.3 }}
                minZoom={0.5}
                maxZoom={1.5}
                defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                attributionPosition="bottom-right"
                onInit={onSimpleInit}
                connectionLineType={ConnectionLineType.SmoothStep}
                className="node-flow"
                panOnScroll={false}
                zoomOnScroll={false}
                panOnDrag={false}
                preventScrolling={false}
                disableKeyboardA11y={true}
              >
                <Background color={backgroundNodeColor} gap={16} size={1} />
              </ReactFlow>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowcaseGallery; 