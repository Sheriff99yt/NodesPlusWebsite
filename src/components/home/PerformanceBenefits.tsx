import React, { useState, useEffect, useRef } from 'react';
import { FaCode, FaFileMedical, FaMemory, FaRocket } from 'react-icons/fa';
import '../../styles/PerformanceBenefits.css';

interface PerformanceMetric {
  label: string;
  standardValue: number;
  enhancedValue: number;
  unit: string;
  desiredDirection: 'lower' | 'higher';
  description: string;
}

const PerformanceBenefits: React.FC = () => {
  const [animate, setAnimate] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Performance metrics data
  const performanceMetrics: PerformanceMetric[] = [
    {
      label: 'Code Complexity',
      standardValue: 28,
      enhancedValue: 12,
      unit: 'nodes',
      desiredDirection: 'lower',
      description: 'Average number of nodes needed for typical string processing operations.'
    },
    {
      label: 'Memory Usage',
      standardValue: 14.5,
      enhancedValue: 10.2,
      unit: 'MB',
      desiredDirection: 'lower',
      description: 'Average memory footprint for equivalent Blueprint graphs in our tests.'
    },
    {
      label: 'Development Speed',
      standardValue: 35,
      enhancedValue: 18,
      unit: 'min',
      desiredDirection: 'lower',
      description: 'Average time to implement common functionality in our testing scenarios.'
    }
  ];

  // Calculate improvement percentage
  const calculateImprovement = (metric: PerformanceMetric): number => {
    if (metric.desiredDirection === 'lower') {
      return Math.round(((metric.standardValue - metric.enhancedValue) / metric.standardValue) * 100);
    } else {
      return Math.round(((metric.enhancedValue - metric.standardValue) / metric.standardValue) * 100);
    }
  };

  // Set up intersection observer to trigger animations when section is in view
  useEffect(() => {
    if (!observerRef.current && sectionRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setAnimate(true);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        },
        { threshold: 0.2 }
      );
      
      observerRef.current.observe(sectionRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Case study data
  const caseStudies = [
    {
      title: "Game Save System",
      standardTime: "2.5 hours",
      enhancedTime: "1 hour",
      description: "A complete game save system with validation, error handling, and data transformation."
    },
    {
      title: "Inventory Management",
      standardTime: "5 hours",
      enhancedTime: "2 hours",
      description: "Inventory system with item categorization, searching, and persistence."
    }
  ];

  return (
    <>
      <div className="content-wrapper">
        <p className="performance-subtitle">
          Nodes Plus aim to help you achieve these performance improvements while streamlining your workflow
        </p>
        
        <div className="metrics-overview">
          <div className="metrics-grid">
            {performanceMetrics.map((metric, index) => {
              const improvement = calculateImprovement(metric);
              const barWidth = animate ? `${Math.min(100, improvement)}%` : '0%';
              
              return (
                <div className="metric-card" key={index}>
                  <div className="metric-header">
                    <div className="metric-icon">
                      {index === 0 ? <FaCode /> :
                       index === 1 ? <FaMemory /> : <FaRocket />}
                    </div>
                    <div className="metric-title">{metric.label}</div>
                  </div>
                  
                  <div className="metric-values">
                    <div className="metric-value standard">
                      <div className="value-label">Standard Blueprints</div>
                      <div className="value-number">{metric.standardValue} {metric.unit}</div>
                    </div>
                    <div className="metric-value enhanced">
                      <div className="value-label">NodesPlus</div>
                      <div className="value-number">{metric.enhancedValue} {metric.unit}</div>
                    </div>
                  </div>
                  
                  <div className="improvement-container">
                    <div className="improvement-bar">
                      <div 
                        className="improvement-fill" 
                        style={{ width: barWidth, transition: 'width 1.5s ease-out' }}
                      ></div>
                    </div>
                    <div className="improvement-percentage">{improvement}% {metric.desiredDirection === 'lower' ? 'Reduction' : 'Improvement'}</div>
                  </div>
                  
                  <div className="metric-description">{metric.description}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="complexity-comparison">
          <h3>Code Complexity Comparison</h3>
          <div className="comparison-container">
            <div className="comparison-example">
              <h4>Standard Blueprint Approach</h4>
              <div className="node-count">
                <div className="node-icon-row">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="node-icon standard" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="node-dot"></div>
                    </div>
                  ))}
                </div>
                <div className="node-total">+18 more nodes</div>
              </div>
              <div className="comparison-description">
                Traditional Blueprint graphs often require multiple nodes to handle common operations and edge cases.
              </div>
            </div>
            
            <div className="comparison-vs">VS</div>
            
            <div className="comparison-example">
              <h4>NodesPlus Approach</h4>
              <div className="node-count">
                <div className="node-icon-row">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="node-icon enhanced" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="node-dot"></div>
                    </div>
                  ))}
                </div>
                <div className="node-total">Just 5 nodes</div>
              </div>
              <div className="comparison-description">
                Nodes Plus provides specialized nodes that combine common operations into single, configurable nodes.
              </div>
            </div>
          </div>
        </div>        
      </div>
    </>
  );
};

export default PerformanceBenefits; 