import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
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
import { FaExternalLinkAlt, FaDiscord, FaStore, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import BlueprintNode from '../docs/BlueprintNode';
import { nodes as allNodes } from '../../data/nodes';
import '../../styles/InteractiveNodeDemo.css';

// Get desktop demo nodes (more complex layout)
const getDesktopDemoNodes = (): FlowNode[] => {
  // Select representative nodes from different categories
  const nodeData = [
    { id: 'timer-loop', position: { x: 50, y: -50 } },
    { id: 'timer-n', position: { x: 500, y: -50 } },
    { id: 'fuzzy-search', position: { x: 950, y: 200 } },
    { id: 'hello-world', position: { x: 50, y: 300 } },
    { id: 'is-nearly-equal', position: { x: 500, y: 300 } },
    { id: 'is-nearly-zero', position: { x: 950, y: 300 } },
    { id: 'degrees-to-radians', position: { x: 50, y: 550 } },
    { id: 'radians-to-degrees', position: { x: 500, y: 550 } },
    { id: 'hello-world', position: { x: 950, y: 550 } },
    { id: 'timer-loop', position: { x: 1400, y: 0 } },
    { id: 'timer-n', position: { x: 1400, y: 300 } }
  ];
  
  return nodeData.map((item) => {
    const node = allNodes.find(n => n.id === item.id);
    if (!node) return null;
    
    return {
      id: `${item.id}-${item.position.x}-${item.position.y}`, // Make IDs unique
      type: 'blueprintNode',
      position: item.position,
      data: {
        node: node,
        detailed: true,
        editable: true,
      },
      draggable: true,
    };
  }).filter(Boolean) as FlowNode[];
};

// Get mobile demo nodes (simpler layout)
const getMobileDemoNodes = (): FlowNode[] => {
  // Center nodes for better visibility on mobile
  const nodeData = [
    { id: 'timer-loop', position: { x: 50, y: 50 } },
    { id: 'timer-n', position: { x: 50, y: 180 } },
    { id: 'fuzzy-search', position: { x: 50, y: 310 } }
  ];
  
  return nodeData.map((item) => {
    const node = allNodes.find(n => n.id === item.id);
    if (!node) return null;
    
    return {
      id: `mobile-${item.id}-${item.position.y}`, // Make IDs unique
      type: 'blueprintNode',
      position: item.position,
      data: {
        node: node,
        detailed: true,
        editable: true,
      },
      style: {
        zIndex: 5, // Ensure nodes are visible
        opacity: 1
      },
      draggable: true,
    };
  }).filter(Boolean) as FlowNode[];
};

// Create desktop demo edges to connect nodes
const getDesktopDemoEdges = (): Edge[] => {
  return [
    // First row connections
    {
      id: 'edge-1',
      source: 'timer-loop-50-50',
      target: 'timer-n-500-50',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-2',
      source: 'timer-n-500-50',
      target: 'fuzzy-search-950-50',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-3',
      source: 'fuzzy-search-950-50',
      target: 'timer-loop-1400-50',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    
    // Connect first row to second row
    {
      id: 'edge-4',
      source: 'timer-loop-50-50',
      target: 'hello-world-50-300',
      type: 'default',
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-5',
      source: 'timer-n-500-50',
      target: 'is-nearly-equal-500-300',
      type: 'default',
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-6',
      source: 'fuzzy-search-950-50',
      target: 'is-nearly-zero-950-300',
      type: 'default',
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    
    // Second row connections
    {
      id: 'edge-7',
      source: 'hello-world-50-300',
      target: 'is-nearly-equal-500-300',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-8',
      source: 'is-nearly-equal-500-300',
      target: 'is-nearly-zero-950-300',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-9',
      source: 'is-nearly-zero-950-300',
      target: 'timer-n-1400-300',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    
    // Connect second row to third row
    {
      id: 'edge-10',
      source: 'hello-world-50-300',
      target: 'degrees-to-radians-50-550',
      type: 'default',
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-11',
      source: 'is-nearly-equal-500-300',
      target: 'radians-to-degrees-500-550',
      type: 'default',
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-12',
      source: 'is-nearly-zero-950-300',
      target: 'hello-world-950-550',
      type: 'default',
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    
    // Third row connections
    {
      id: 'edge-13',
      source: 'degrees-to-radians-50-550',
      target: 'radians-to-degrees-500-550',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
    {
      id: 'edge-14',
      source: 'radians-to-degrees-500-550',
      target: 'hello-world-950-550',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 2 },
    },
  ];
};

// Create mobile demo edges (simpler vertical connections)
const getMobileDemoEdges = (): Edge[] => {
  return [
    {
      id: 'mobile-edge-1',
      source: 'mobile-timer-loop-50',
      target: 'mobile-timer-n-180',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 3, opacity: 1, zIndex: 4 },
    },
    {
      id: 'mobile-edge-2',
      source: 'mobile-timer-n-180',
      target: 'mobile-fuzzy-search-310',
      type: 'default',
      animated: true,
      style: { stroke: '#3182CE', strokeWidth: 3, opacity: 1, zIndex: 4 },
    }
  ];
};

const InteractiveNodeDemo: React.FC = () => {
  // Check if the current view is mobile
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [showTouchHint, setShowTouchHint] = useState<boolean>(false);
  const graphRef = useRef<HTMLDivElement>(null);

  // Initialize nodes and edges based on viewport size
  const initialNodes = useMemo(() => isMobile ? getMobileDemoNodes() : getDesktopDemoNodes(), [isMobile]);
  const initialEdges = useMemo(() => isMobile ? getMobileDemoEdges() : getDesktopDemoEdges(), [isMobile]);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Node types definition for ReactFlow - memoized to prevent recreation on each render
  const nodeTypes = useMemo(() => ({
    blueprintNode: BlueprintNode,
  }), []);

  // Handle window resize events to switch between mobile and desktop layouts
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setIsLoading(true); // Force a reload of the graph
        
        // Short delay to ensure loading state is applied
        setTimeout(() => {
          setNodes(mobile ? getMobileDemoNodes() : getDesktopDemoNodes());
          setEdges(mobile ? getMobileDemoEdges() : getDesktopDemoEdges());
          setIsLoading(false);
        }, 100);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, setNodes, setEdges]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Fit view after loading and whenever nodes or layout changes
  useEffect(() => {
    if (!isLoading && reactFlowInstance) {
      // Multiple attempts to ensure it fits correctly
      const fitView = () => {
        reactFlowInstance.fitView({ 
          padding: isMobile ? 0.3 : 0.4, 
          duration: 300,
          includeHiddenNodes: true,
          minZoom: isMobile ? 0.4 : 0.6,
          maxZoom: isMobile ? 1.0 : 1.5
        });
      };
      
      // Try fitting multiple times to ensure it works
      fitView();
      setTimeout(fitView, 300);
      setTimeout(fitView, 800);
      
      // Force resize
      window.dispatchEvent(new Event('resize'));
    }
  }, [isLoading, nodes, reactFlowInstance, isMobile]);

  // Force ReactFlow to recalculate dimensions after layout changes
  useEffect(() => {
    if (reactFlowInstance && !isLoading) {
      const timer = setTimeout(() => {
        if (graphRef.current) {
          // Force recalculation by triggering resize
          const width = graphRef.current.offsetWidth;
          const height = graphRef.current.offsetHeight;
          
          if (width > 0 && height > 0) {
            reactFlowInstance.fitView();
            window.dispatchEvent(new Event('resize'));
          }
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [reactFlowInstance, isMobile, isLoading]);

  // Show touch hint for mobile users after a short delay
  useEffect(() => {
    if (isMobile && !isLoading) {
      const hintTimer = setTimeout(() => {
        setShowTouchHint(true);
        
        // Hide hint after 5 seconds
        const hideTimer = setTimeout(() => {
          setShowTouchHint(false);
        }, 5000);
        
        return () => clearTimeout(hideTimer);
      }, 1500);
      
      return () => clearTimeout(hintTimer);
    }
  }, [isMobile, isLoading]);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
    // Force resize event after initialization to ensure proper rendering
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (instance) {
        instance.fitView();
      }
    }, 200);
  }, []);

  return (
    <>
      <div className="two-column-layout">
        {/* Left column: Information about NodesPlus */}
        <div className="demo-info-column">
          <h3 className="info-title">Enhance Your Blueprint Workflow</h3>
          
          <p className="info-description">
            NodesPlus provides powerful custom Blueprint nodes that simplify complex operations in Unreal Engine, saving you time and improving your project's performance.
          </p>
          
          <div className="info-call-to-action">
            <h4>Ready to level up your Unreal Engine experience?</h4>
            <p>
              Explore our comprehensive documentation to see all available nodes and how they can optimize your workflow.
            </p>
            
            <div className="info-buttons">
              <Link to="/documentation" className="info-button doc-button">
                <span className="button-text">View Documentation</span>
                <FaExternalLinkAlt />
              </Link>
              
              <a 
                href="https://www.fab.com/sellers/Sherif%20Hany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-button store-button"
              >
                <span className="button-text">Get on Fab.com</span>
                <FaStore />
              </a>
              
              <a 
                href="https://discord.gg/2Pu9ywaptN" 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-button discord-button"
              >
                <span className="button-text">Join Discord</span>
                <FaDiscord />
              </a>
            </div>
          </div>
          
          <div className="creator-info">
            <h4>About the Creator</h4>
            <p>
              NodesPlus was created by Sherif Hany, an experienced Unreal Engine developer passionate about optimizing workflows and enhancing Blueprint capabilities.
            </p>
            <a 
              href="https://www.linkedin.com/in/sheriff99/" 
              target="_blank"
              rel="noopener noreferrer"
              className="creator-link"
            >
              <FaLinkedinIn /> Connect with Sherif
            </a>
          </div>
        </div>
        
        {/* Right column: ReactFlow graph */}
        <div className="demo-graph-column" ref={graphRef}>
          {isLoading ? (
            <div className="demo-skeleton">
              <div className="skeleton-flow">
                <div className="skeleton-node"></div>
                <div className="skeleton-node"></div>
                <div className="skeleton-edge"></div>
              </div>
            </div>
          ) : (
            <>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onInit={onInit}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                fitViewOptions={{ 
                  padding: isMobile ? 0.4 : 0.3,
                  includeHiddenNodes: true,
                  minZoom: isMobile ? 0.4 : 0.6,
                  maxZoom: isMobile ? 1.0 : 1.5
                }}
                minZoom={0.3}
                maxZoom={2.0}
                defaultViewport={{ x: 0, y: 0, zoom: isMobile ? 0.6 : 0.5 }}
                panOnScroll={false}
                zoomOnScroll={false}
                panOnDrag={true}
                zoomOnPinch={true}
                zoomOnDoubleClick={true}
                preventScrolling={false}
                attributionPosition="bottom-right"
                style={{ background: 'rgba(22, 28, 36, 0.95)' }}
              >
                <Background />
              </ReactFlow>
              
              {isMobile && (
                <div className={`mobile-touch-hint ${showTouchHint ? 'visible' : ''}`}>
                  Pinch to zoom, tap and drag to move around
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="demo-disclaimer">
        <small>This is a simplified simulation. Actual Blueprint nodes in Unreal Engine may have additional functionality.</small>
      </div>
    </>
  );
};

export default InteractiveNodeDemo; 