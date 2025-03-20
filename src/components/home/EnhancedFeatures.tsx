import React from 'react';
import { FaBook, FaBolt, FaLayerGroup } from 'react-icons/fa';
import '../../styles/EnhancedFeatures.css';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, color }) => {
  return (
    <div className="enhanced-feature-card">
      <div className="feature-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="feature-description">{description}</p>
      <div className="feature-glow" style={{ background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)` }}></div>
    </div>
  );
};

const EnhancedFeatures: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: <FaBook />,
      title: "Better Documentation",
      description: "Detailed tooltips, usage examples, and performance considerations for every node.",
      color: "#3182ce"
    },
    {
      icon: <FaBolt />,
      title: "Performance Optimized",
      description: "Nodes designed with performance in mind, reducing overhead and improving execution speed.",
      color: "#d69e2e"
    },
    {
      icon: <FaLayerGroup />,
      title: "Simplified Workflows",
      description: "Combine multiple operations into single nodes, reducing graph complexity and improving readability.",
      color: "#805ad5"
    }
  ];

  return (
    <div className="enhanced-features-grid">
      {features.map((feature, index) => (
        <Feature
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          color={feature.color}
        />
      ))}
    </div>
  );
};

export default EnhancedFeatures; 